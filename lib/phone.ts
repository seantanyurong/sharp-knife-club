// The /mobile metadata rejects landlines, which the plain bundle accepts --
// we ask for a mobile because that's what pickup coordination goes out on.
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import type { CountryCode } from 'libphonenumber-js';
import { PHONE_COUNTRIES, type PhoneCountry } from '@/constants/phone_countries';

/**
 * Phone numbers are normalised to E.164 (+6591234567) everywhere.
 *
 * Stripe stores collected phone numbers in E.164, so the value we look a
 * customer up by has to be in the same shape — otherwise the search misses and
 * we create a duplicate customer.
 */

/** Shown first in the country picker; the rest follow alphabetically. */
const PRIORITY_COUNTRIES: CountryCode[] = ['SG', 'MY', 'ID', 'AU', 'GB', 'US'];

/** 🇸🇬 from "SG" — regional indicator symbols are the letters offset into U+1F1E6. */
function flagFor(country: string): string {
  return String.fromCodePoint(
    ...[...country].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}

export type PhoneCountryOption = PhoneCountry & { flag: string };

export function getPhoneCountries(): PhoneCountryOption[] {
  const withFlags = PHONE_COUNTRIES.map((country) => ({
    ...country,
    flag: flagFor(country.code),
  }));

  const priority = PRIORITY_COUNTRIES.map((code) =>
    withFlags.find((country) => country.code === code),
  ).filter((country): country is PhoneCountryOption => Boolean(country));

  const rest = withFlags.filter(
    (country) => !PRIORITY_COUNTRIES.includes(country.code),
  );

  return [...priority, ...rest];
}

/**
 * Turns what someone typed into E.164, or null when it isn't a valid mobile
 * number for that country. Accepts national ("9123 4567") and international
 * ("+65 9123 4567") input alike.
 */
export function toE164(input: string, country: CountryCode): string | null {
  const parsed = parsePhoneNumberFromString(input, country);
  return parsed?.isValid() ? parsed.number : null;
}

/** Guards the server action against anything that didn't come from our own UI. */
export function isValidE164(value: string): boolean {
  if (!value.startsWith('+')) return false;
  return parsePhoneNumberFromString(value)?.isValid() ?? false;
}
