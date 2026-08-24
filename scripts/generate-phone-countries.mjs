/**
 * Regenerates constants/phone_countries.ts.
 *
 * The table is committed rather than derived at runtime because Node's ICU and
 * the browser's ICU return different country names for a handful of entries,
 * which React reports as a hydration mismatch.
 *
 * Run after bumping libphonenumber-js:  node scripts/generate-phone-countries.mjs
 */
import { writeFileSync } from 'node:fs';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });

const rows = getCountries()
  .map((code) => ({
    code,
    name: displayNames.of(code) ?? code,
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const body = rows
  .map(
    (row) =>
      `  { code: '${row.code}', name: ${JSON.stringify(row.name)}, dialCode: '${row.dialCode}' },`,
  )
  .join('\n');

const file = `import type { CountryCode } from 'libphonenumber-js';

/**
 * Generated from libphonenumber-js + Intl.DisplayNames('en'), then committed.
 *
 * Deriving these at runtime hydrates inconsistently: Node's ICU and the
 * browser's ICU disagree on some names ("Falkland Islands (Islas Malvinas)"
 * vs "Falkland Islands"), which React reports as a hydration mismatch.
 *
 * Regenerate after a libphonenumber-js bump with:
 * \`node scripts/generate-phone-countries.mjs\`
 */
export type PhoneCountry = {
  code: CountryCode;
  name: string;
  dialCode: string;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
${body}
];
`;

writeFileSync(new URL('../constants/phone_countries.ts', import.meta.url), file);
console.log(`wrote ${rows.length} countries to constants/phone_countries.ts`);
