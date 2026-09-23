/**
 * Installs the S3 lifecycle rules that expire uploaded photos.
 *
 * Nothing in the app ever reads these objects back — the URLs only travel out
 * to Notion image blocks, Telegram and WhatsApp — so expiring one breaks a
 * historical embed, never a live feature.
 *
 * Dry run (writes nothing, prints the plan):
 *   node --env-file=.env scripts/s3-retention.mjs
 *
 * Apply:
 *   node --env-file=.env scripts/s3-retention.mjs --apply
 */
import {
  S3Client,
  PutBucketLifecycleConfigurationCommand,
  GetBucketLifecycleConfigurationCommand,
} from '@aws-sdk/client-s3';

const apply = process.argv.includes('--apply');

const Bucket = process.env.S3_BUCKET;
const region = process.env.AWS_REGION;
if (!Bucket || !region) {
  console.error('S3_BUCKET and AWS_REGION must be set — run with --env-file=.env');
  process.exit(1);
}

/**
 * Order photos are shot at pickup, sharpening and delivery, and consumed the
 * moment they are sent. Quote photos are uploaded when the customer books and
 * are not looked at until pickup, which can be three weeks out — the booking
 * calendar currently offers dates 17 days ahead, so 14 days would delete them
 * days before the sharpener sees the blades.
 */
const RETENTION = [
  { id: 'expire-order-photos', prefix: 'orders/', days: 14 },
  { id: 'expire-quote-photos', prefix: 'quotes/', days: 30 },
];

const s3 = new S3Client({ region });

const Rules = [
  ...RETENTION.map(({ id, prefix, days }) => ({
    ID: id,
    Status: 'Enabled',
    Filter: { Prefix: prefix },
    Expiration: { Days: days },
  })),
  {
    ID: 'abort-incomplete-uploads',
    Status: 'Enabled',
    Filter: { Prefix: '' },
    AbortIncompleteMultipartUpload: { DaysAfterInitiation: 7 },
  },
];

let existing = null;
try {
  const current = await s3.send(
    new GetBucketLifecycleConfigurationCommand({ Bucket }),
  );
  existing = current.Rules;
} catch (err) {
  if (err.name !== 'NoSuchLifecycleConfiguration') throw err;
}

console.log(`bucket: ${Bucket} (${region})${apply ? '' : '   [DRY RUN — pass --apply to write]'}`);
console.log(`\nLIFECYCLE RULES (currently: ${existing ? `${existing.length} rule(s)` : 'none'})`);
for (const rule of Rules) {
  const what = rule.Expiration
    ? `delete after ${rule.Expiration.Days} days`
    : `abort unfinished uploads after ${rule.AbortIncompleteMultipartUpload.DaysAfterInitiation} days`;
  console.log(`  ${rule.ID.padEnd(26)} ${(rule.Filter.Prefix || '(whole bucket)').padEnd(16)} ${what}`);
}

if (apply) {
  await s3.send(
    new PutBucketLifecycleConfigurationCommand({
      Bucket,
      LifecycleConfiguration: { Rules },
    }),
  );
  console.log('  → applied');
}
