'use client';

import { toast } from 'sonner';
import { useMemo, useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { CountryCode } from 'libphonenumber-js';
import { getOrderConstants } from '@/lib/api';
import type { OrderGroupDetails } from '@/app/actions/notion';
import { formatForDisplay } from '@/lib/utils';
import { PhoneInput } from '@/components/ui/phoneInput';
import { toE164 } from '@/lib/phone';
import { CHECKOUT_PHONE_KEY } from '@/constants/checkout';

const REPAIR_PRICE = 10;

const StepCard = ({
  step,
  title,
  note,
  children,
}: {
  step: number;
  title: string;
  note: string;
  children: ReactNode;
}) => (
  <div className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-5">
    <p className="text-xs font-black tracking-[0.2em] text-secondary">
      STEP {step}
    </p>
    <h2 className="mt-1 text-lg font-black text-primary-foreground">{title}</h2>
    <p className="mt-1 text-xs leading-relaxed text-primary-foreground/60">
      {note}
    </p>
    <div className="mt-4">{children}</div>
  </div>
);

const Stepper = ({
  value,
  onDecrease,
  onIncrease,
  label,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  label: string;
}) => (
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="lg"
      onClick={onDecrease}
      aria-label={`Decrease ${label}`}
      className="w-14 shrink-0 text-lg font-black"
    >
      −
    </Button>
    <div className="flex h-10 w-full items-center justify-center rounded-md bg-secondary text-lg font-black text-secondary-foreground shadow">
      {value}
    </div>
    <Button
      variant="outline"
      size="lg"
      onClick={onIncrease}
      aria-label={`Increase ${label}`}
      className="w-14 shrink-0 text-lg font-black"
    >
      +
    </Button>
  </div>
);

export default function Order() {
  const router = useRouter();
  const [numberOfKnives, setNumberOfKnives] = useState(3);
  const [country, setCountry] = useState<CountryCode>('SG');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [numberOfRepairs, setNumberOfRepairs] = useState(0);
  const [bookingDates, setBookingDates] = useState<OrderGroupDetails[]>([]);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getOrderConstants()
      .then((constants) => {
        setBookingDates(constants.bookingOrderGroupArray);
        if (constants.bookingOrderGroupArray.length > 0) {
          setSelectedOrderGroup(
            constants.bookingOrderGroupArray[0].orderGroupNumber,
          );
        }
      })
      .catch(console.error);
  }, []);

  const getKnifePriceFromKnivesQuantity = (knivesQuantity: number) => {
    switch (knivesQuantity) {
      case 3:
        return 20;
      case 4:
        return 18;
      default:
        return 15;
    }
  };

  const getTotalKnifePriceFromKnivesQuantity = (knivesQuantity: number) => {
    return getKnifePriceFromKnivesQuantity(knivesQuantity) * knivesQuantity;
  };

  const knivesTotal = getTotalKnifePriceFromKnivesQuantity(numberOfKnives);
  const repairsTotal = numberOfRepairs * REPAIR_PRICE;
  const orderTotal = knivesTotal + repairsTotal;

  const checkoutHref = useMemo(
    () =>
      `/checkout?knives=${numberOfKnives}&repairs=${numberOfRepairs}&orderGroup=${selectedOrderGroup ?? ''}`,
    [numberOfKnives, numberOfRepairs, selectedOrderGroup],
  );

  const goToCheckout = () => {
    const normalized = toE164(phone, country);
    if (!normalized) {
      setPhoneError(
        'Enter a valid mobile number for the country you selected.',
      );
      toast('Add your mobile number to continue.');
      return;
    }

    // Kept out of the URL so the number never lands in analytics or referrers.
    sessionStorage.setItem(CHECKOUT_PHONE_KEY, normalized);
    router.push(checkoutHref);
  };

  return (
    <main className="bg-primary min-h-screen pb-16">
      <div className="flex justify-center items-center py-6">
        <Link href="/">
          <Image
            src={Logo}
            alt="Knife Sharpening Singapore"
            width={150}
            height={90}
            priority
          />
        </Link>
      </div>

      <div className="px-4 max-w-xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <a
            href="https://g.co/kgs/aXcTBcs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10"
          >
            <span className="text-xs font-bold text-white">5.0</span>
            <span className="flex shrink-0">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-3.5 w-3.5 text-secondary fill-secondary"
                />
              ))}
            </span>
            <span className="text-xs text-white/80">163 reviews</span>
          </a>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-balance text-primary-foreground">
            BOOK KNIFE SHARPENING
          </h1>
          <p className="mt-2 text-sm text-balance text-primary-foreground/60">
            Free pickup and delivery islandwide. Back at your door within 24
            hours.
          </p>
        </div>

        <StepCard
          step={1}
          title="How many knives / scissors?"
          note="As low as $15 per blade."
        >
          <Stepper
            label="knives"
            value={numberOfKnives}
            onDecrease={() => {
              if (numberOfKnives === 3) {
                toast('Minimum order count of 3 knives!');
              }
              setNumberOfKnives((r) => Math.max(3, r - 1)); // clamp at 3
            }}
            onIncrease={() => setNumberOfKnives((r) => r + 1)}
          />
        </StepCard>

        <StepCard
          step={2}
          title="How many repairs?"
          note={`Repairing small chips is free. Large chips, de-rusting, and straightening blades are $${REPAIR_PRICE} per repair.`}
        >
          <Stepper
            label="repairs"
            value={numberOfRepairs}
            onDecrease={() => setNumberOfRepairs((r) => Math.max(0, r - 1))} // clamp at 0
            onIncrease={() => setNumberOfRepairs((r) => r + 1)}
          />
        </StepCard>

        <StepCard
          step={3}
          title="Select pickup date"
          note="Your blades will be sharpened and returned to you the next day."
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            {bookingDates.length === 0 ? (
              <Button size="lg" variant="muted" disabled className="w-full">
                Loading...
              </Button>
            ) : (
              bookingDates.map((date) => (
                <Button
                  key={date.orderGroupNumber}
                  size="lg"
                  variant={
                    selectedOrderGroup === date.orderGroupNumber
                      ? 'secondary'
                      : 'outline'
                  }
                  className="w-full font-bold"
                  onClick={() => setSelectedOrderGroup(date.orderGroupNumber)}
                >
                  {formatForDisplay(date.pickupDateIso)}
                </Button>
              ))
            )}
          </div>
        </StepCard>

        <StepCard
          step={4}
          title="What's your mobile number?"
          note="We use it to send you reminders for your pickup and delivery — and to pull up your details if you've ordered before."
        >
          <PhoneInput
            country={country}
            onCountryChange={(event) => {
              setCountry(event.target.value as CountryCode);
              setPhoneError('');
            }}
            value={phone}
            onNumberChange={(event) => {
              setPhone(event.target.value);
              setPhoneError('');
            }}
            invalid={Boolean(phoneError)}
            placeholder="9123 4567"
            aria-label="Mobile number"
          />
          {phoneError ? (
            <p className="mt-2 text-sm font-medium text-red-400">
              {phoneError}
            </p>
          ) : null}
        </StepCard>

        <div className="mt-8 rounded-md border border-white/10 bg-white/[0.03] p-5">
          <div className="flex justify-between text-sm text-primary-foreground/60">
            <span>
              {numberOfKnives} blades × $
              {getKnifePriceFromKnivesQuantity(numberOfKnives)}
            </span>
            <span>${knivesTotal}</span>
          </div>
          {numberOfRepairs > 0 && (
            <div className="mt-2 flex justify-between text-sm text-primary-foreground/60">
              <span>
                {numberOfRepairs} repairs × ${REPAIR_PRICE}
              </span>
              <span>${repairsTotal}</span>
            </div>
          )}
          <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg font-black text-primary-foreground">
            <span>Total</span>
            <span>${orderTotal}</span>
          </div>
        </div>

        <Button
          size="xl"
          variant="secondary"
          onClick={goToCheckout}
          className="w-full mt-6 text-base font-black tracking-widest uppercase"
        >
          Make Payment — ${orderTotal}
        </Button>

        <p className="mt-3 text-center text-xs text-primary-foreground/50">
          Not sharper than new? We’ll re-sharpen at no extra cost — or refund
          you in full.
        </p>

        <Button asChild variant="whatsapp" size="lg" className="w-full mt-6">
          <a
            href={`https://wa.me/6580684206`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Questions? Ask us on WhatsApp
          </a>
        </Button>
      </div>
    </main>
  );
}
