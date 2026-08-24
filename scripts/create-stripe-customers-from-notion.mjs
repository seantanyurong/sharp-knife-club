/**
 * One-off: create Stripe customers for people who ordered before the webhook
 * started creating them, so their address prefills on their *next* checkout
 * rather than the one after.
 *
 * Dry run (writes nothing, prints the plan):
 *   node --env-file=.env scripts/create-stripe-customers-from-notion.mjs
 *
 * Apply:
 *   node --env-file=.env scripts/create-stripe-customers-from-notion.mjs --apply
 *
 * Scope: Status=Customer only. Prospects (386 of them, 4 with an address) never
 * ordered, so creating records for them would just fill the dashboard with
 * empties. Anyone already matched by phone is left alone.
 *
 * Created records are tagged metadata.created_via=notion_backfill, which is how
 * you'd find them again to undo this — Stripe merges metadata keys on update,
 * so a later order adds notion_customer_id without dropping the tag.
 */
import { Client } from '@notionhq/client';
import Stripe from 'stripe';
import {
  parseAddress,
  loadNotionCustomers,
  loadStripeCustomersByPhone,
  isBetterCandidate,
} from './lib/notion-stripe.mjs';

const apply = process.argv.includes('--apply');
const verbose = process.argv.includes('--verbose');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const [notionCustomers, stripeByPhone] = await Promise.all([
  loadNotionCustomers(notion),
  loadStripeCustomersByPhone(stripe),
]);

console.log(
  `Notion rows: ${notionCustomers.length}  |  Stripe customers with a phone: ${stripeByPhone.size}`,
);

const planned = [];
const skipped = {
  notCustomerStatus: 0,
  noPhone: 0,
  noAddress: 0,
  alreadyInStripe: 0,
  unparseable: [],
};

for (const customer of notionCustomers) {
  if (customer.status !== 'Customer') {
    skipped.notCustomerStatus++;
    continue;
  }
  if (!customer.phone) {
    skipped.noPhone++;
    continue;
  }
  if (!customer.address) {
    skipped.noAddress++;
    continue;
  }
  if (stripeByPhone.has(customer.phone)) {
    skipped.alreadyInStripe++;
    continue;
  }

  const address = parseAddress(customer.address);
  if (!address) {
    skipped.unparseable.push(
      `${customer.phone}: ${JSON.stringify(customer.address)}`,
    );
    continue;
  }

  planned.push({
    notionId: customer.notionId,
    lastEdited: customer.lastEdited,
    name: customer.name?.trim() || 'Customer',
    phone: customer.phone,
    address,
  });
}

// Several Notion rows can share a number; one Stripe customer per phone.
const bestByPhone = new Map();
for (const item of planned) {
  const current = bestByPhone.get(item.phone);
  if (!current || isBetterCandidate(item, current)) {
    bestByPhone.set(item.phone, item);
  }
}
const collapsed = planned.length - bestByPhone.size;
const toCreate = [...bestByPhone.values()];

console.log(`\nWould create: ${toCreate.length} Stripe customers`);
for (const item of verbose ? toCreate : toCreate.slice(0, 10)) {
  console.log(
    `  ${item.phone}  ${item.name}  —  ${item.address.line1}${item.address.line2 ? ', ' + item.address.line2 : ''}${item.address.postal_code ? ', ' + item.address.postal_code : ''}`,
  );
}
if (!verbose && toCreate.length > 10) {
  console.log(`  … and ${toCreate.length - 10} more (--verbose to list all)`);
}
if (collapsed > 0) {
  console.log(
    `  (${collapsed} duplicate Notion row${collapsed === 1 ? '' : 's'} collapsed onto one number)`,
  );
}

console.log('\nSkipped:');
console.log(`  not Status=Customer:       ${skipped.notCustomerStatus}`);
console.log(`  no phone in Notion:        ${skipped.noPhone}`);
console.log(`  no address in Notion:      ${skipped.noAddress}`);
console.log(`  already has a Stripe customer: ${skipped.alreadyInStripe}`);
console.log(`  address didn't parse:      ${skipped.unparseable.length}`);
for (const row of skipped.unparseable.slice(0, 10)) console.log(`      ${row}`);

if (!apply) {
  console.log(
    '\nDry run — nothing written. Re-run with --apply to create these in Stripe.',
  );
  process.exit(0);
}

console.log('\nCreating…');
let done = 0;
const failures = [];

for (const item of toCreate) {
  try {
    await stripe.customers.create({
      name: item.name,
      phone: item.phone,
      shipping: {
        name: item.name,
        phone: item.phone,
        address: item.address,
      },
      metadata: {
        created_via: 'notion_backfill',
        notion_customer_id: item.notionId,
      },
    });
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${toCreate.length}`);
  } catch (err) {
    failures.push(`${item.phone}: ${err.message}`);
  }
}

console.log(`\nCreated ${done}/${toCreate.length}`);
if (failures.length) {
  console.log('Failures:');
  for (const failure of failures) console.log(`  ${failure}`);
}
