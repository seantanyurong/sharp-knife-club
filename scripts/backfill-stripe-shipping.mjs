/**
 * One-off: copy customer addresses from Notion onto their Stripe customer's
 * `shipping`, so returning buyers get their address prefilled in Checkout.
 *
 * Customers created before customer_update: { shipping: 'auto' } shipped with
 * no address on the Stripe side, so Checkout has nothing to prefill from. New
 * orders populate it themselves; this catches everyone who ordered before that.
 *
 * Dry run (writes nothing, prints the plan):
 *   node --env-file=.env scripts/backfill-stripe-shipping.mjs
 *
 * Apply:
 *   node --env-file=.env scripts/backfill-stripe-shipping.mjs --apply
 *
 * Only fills empty `shipping`; never overwrites an address Stripe already has.
 * Pass --overwrite to refresh those from Notion too.
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
const overwrite = process.argv.includes('--overwrite');
const verbose = process.argv.includes('--verbose');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const [notionCustomers, stripeByPhone] = await Promise.all([
  loadNotionCustomers(notion),
  loadStripeCustomersByPhone(stripe),
]);

console.log(
  `Notion customers: ${notionCustomers.length}  |  Stripe customers with a phone: ${stripeByPhone.size}`,
);

const planned = [];
const skipped = { noPhone: 0, noAddress: 0, unparseable: [], noStripeMatch: [], hasShipping: 0 };
const noPostal = [];

for (const customer of notionCustomers) {
  if (!customer.phone) {
    skipped.noPhone++;
    continue;
  }
  if (!customer.address) {
    skipped.noAddress++;
    continue;
  }

  const stripeCustomer = stripeByPhone.get(customer.phone);
  if (!stripeCustomer) {
    skipped.noStripeMatch.push(`${customer.phone} (${customer.name ?? 'no name'})`);
    continue;
  }
  if (stripeCustomer.shipping?.address?.line1 && !overwrite) {
    skipped.hasShipping++;
    continue;
  }

  const address = parseAddress(customer.address);
  if (!address) {
    skipped.unparseable.push(`${customer.phone}: ${JSON.stringify(customer.address)}`);
    continue;
  }

  if (!address.postal_code) {
    noPostal.push(`${customer.phone}: ${JSON.stringify(customer.address)}`);
  }

  planned.push({
    stripeId: stripeCustomer.id,
    name: customer.name ?? stripeCustomer.name ?? 'Customer',
    phone: customer.phone,
    lastEdited: customer.lastEdited,
    address,
  });
}

// Notion holds duplicate rows for some numbers, which would otherwise mean
// several writes to one Stripe customer with an arbitrary winner. Prefer an
// address that has a postal code, then the most recently edited row.
const bestByStripeId = new Map();
for (const item of planned) {
  const current = bestByStripeId.get(item.stripeId);
  if (!current) {
    bestByStripeId.set(item.stripeId, item);
    continue;
  }

  if (isBetterCandidate(item, current)) bestByStripeId.set(item.stripeId, item);
}

const collapsed = planned.length - bestByStripeId.size;
planned.length = 0;
planned.push(...bestByStripeId.values());

console.log(`\nPlanned updates: ${planned.length}`);
for (const item of verbose ? planned : planned.slice(0, 10)) {
  console.log(
    `  ${item.stripeId}  ${item.phone}  ${item.address.line1}${item.address.line2 ? ', ' + item.address.line2 : ''}, ${item.address.postal_code}`,
  );
}
if (!verbose && planned.length > 10)
  console.log(`  … and ${planned.length - 10} more (--verbose to list all)`);

if (collapsed > 0) {
  console.log(
    `  (${collapsed} duplicate Notion row${collapsed === 1 ? '' : 's'} collapsed onto an existing Stripe customer)`,
  );
}

console.log('\nSkipped:');
console.log(`  no phone in Notion:        ${skipped.noPhone}`);
console.log(`  no address in Notion:      ${skipped.noAddress}`);
console.log(`  already has shipping:      ${skipped.hasShipping}`);
console.log(`  no Stripe customer:        ${skipped.noStripeMatch.length}`);
for (const row of skipped.noStripeMatch.slice(0, 5)) console.log(`      ${row}`);
if (skipped.noStripeMatch.length > 5) console.log(`      … and ${skipped.noStripeMatch.length - 5} more`);
console.log(`  address didn't parse:      ${skipped.unparseable.length}`);
for (const row of skipped.unparseable.slice(0, 10)) console.log(`      ${row}`);
if (skipped.unparseable.length > 10) console.log(`      … and ${skipped.unparseable.length - 10} more`);

if (noPostal.length) {
  console.log(`\nIncluded but missing a postal code: ${noPostal.length}`);
  for (const row of noPostal) console.log(`      ${row}`);
}

if (!apply) {
  console.log('\nDry run — nothing written. Re-run with --apply to write these to Stripe.');
  process.exit(0);
}

console.log('\nApplying…');
let done = 0;
const failures = [];

for (const item of planned) {
  try {
    await stripe.customers.update(item.stripeId, {
      shipping: { name: item.name, phone: item.phone, address: item.address },
    });
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${planned.length}`);
  } catch (err) {
    failures.push(`${item.stripeId}: ${err.message}`);
  }
}

console.log(`\nUpdated ${done}/${planned.length}`);
if (failures.length) {
  console.log('Failures:');
  for (const failure of failures) console.log(`  ${failure}`);
}
