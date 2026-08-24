'use client';

import {
  useMemo,
  useState,
  type ChangeEventHandler,
  type ComponentProps,
} from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { getPhoneCountries } from '@/lib/phone';
import { Input } from './input';
import { cn } from '@/lib/utils';

/**
 * Country picker + national number, the way Stripe's own phone field works.
 * Reports the raw national number and the selected country; converting to
 * E.164 is the caller's job so it can decide when to validate.
 */
type PhoneInputProps = {
  country: CountryCode;
  onCountryChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  onNumberChange: ChangeEventHandler<HTMLInputElement>;
  invalid?: boolean;
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>;

export function PhoneInput({
  country,
  onCountryChange,
  value,
  onNumberChange,
  invalid,
  className,
  ...props
}: PhoneInputProps) {
  const countries = useMemo(() => getPhoneCountries(), []);
  const [open, setOpen] = useState(false);

  const selected = countries.find((entry) => entry.code === country);

  return (
    <div
      className={cn(
        'flex items-stretch rounded-md border border-input bg-white shadow-sm focus-within:ring-1 focus-within:ring-ring',
        invalid && 'border-red-500',
        className,
      )}
    >
      <div className="relative flex items-center">
        {/* The native select carries the accessibility and mobile UX; the row
            underneath is just how it looks. */}
        <select
          value={country}
          onChange={onCountryChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          aria-label="Country calling code"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {countries.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.flag} {entry.name} ({entry.dialCode})
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className={cn(
            'flex h-full items-center gap-1 rounded-l-md pl-3 pr-2 text-base',
            open && 'ring-1 ring-ring',
          )}
        >
          <span className="text-lg leading-none">{selected?.flag}</span>
          <span className="text-muted-foreground">{selected?.dialCode}</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3 text-muted-foreground"
          >
            <path d="M5.5 7.5 10 12l4.5-4.5H5.5Z" />
          </svg>
        </span>
      </div>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value}
        onChange={onNumberChange}
        aria-invalid={invalid}
        className="h-12 flex-1 border-0 bg-transparent pl-1 shadow-none focus-visible:ring-0"
        {...props}
      />
    </div>
  );
}
