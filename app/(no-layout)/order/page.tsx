'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export default function Order() {
  const [numberOfKnives, setNumberOfKnives] = useState(4);
  const [numberOfRepairs, setNumberOfRepairs] = useState(0);

  const numberOfKnivesOptions = [4, 5, 7, 10, 14];

  // Prefill WhatsApp message
  const checkoutHref = useMemo(
    () =>
      `/checkout?knives=${encodeURIComponent(
        numberOfKnives,
      )}&repairs=${encodeURIComponent(numberOfRepairs)}}`,
    [numberOfKnives, numberOfRepairs],
  );

  return (
    <main className="bg-primary min-h-screen pb-28">
      <div className="flex justify-center items-center py-6">
        <Image
          src={Logo}
          alt="Knife Sharpening Singapore"
          width={150}
          height={90}
          priority
        />
      </div>

      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Book Knife Sharpening Service
        </h1>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-secondary fill-secondary"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">(116)</span>
        </div>

        {/* Knives */}
        <div>
          <h2 className="text-start mt-8 text-primary-foreground">
            How Many Knives?
          </h2>
          <div className="flex items-center gap-2 mt-2">
            {numberOfKnivesOptions.map((option) => (
              <Button
                key={option}
                onClick={() => setNumberOfKnives(option)}
                variant={option === numberOfKnives ? 'secondary' : 'muted'}
                size="lg"
                className="w-full hidden md:block"
              >
                {option}
              </Button>
            ))}
            {numberOfKnivesOptions.map((option) => (
              <Button
                key={option}
                onClick={() => setNumberOfKnives(option)}
                variant={option === numberOfKnives ? 'secondary' : 'muted'}
                size="sm"
                className="w-full block md:hidden"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Repairs */}
        <div>
          <h2 className="text-start mt-8 text-primary-foreground">
            How Many Repairs?
          </h2>
          <p className="italic text-primary-foreground text-xs">
            Repairing small chips are free. Repairing large chips, de-rusting,
            and straightening blades are all an additional $10.
          </p>
          <div className="gap-1 mt-2 hidden md:flex">
            <Button
              variant="outline"
              size="lg"
              onClick={
                () => setNumberOfRepairs((r) => Math.max(0, r - 1)) // clamp at 0
              }
              aria-label="Decrease repairs"
            >
              -
            </Button>
            <div
              className={`${numberOfRepairs > 0 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'} h-10 rounded-md px-8 shadow w-full flex justify-center items-center`}
            >
              <p>{numberOfRepairs}</p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setNumberOfRepairs((r) => r + 1)}
              aria-label="Increase repairs"
            >
              +
            </Button>
          </div>
          <div className="gap-1 mt-2 flex md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={
                () => setNumberOfRepairs((r) => Math.max(0, r - 1)) // clamp at 0
              }
              aria-label="Decrease repairs"
            >
              -
            </Button>
            <div
              className={`${numberOfRepairs > 0 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'} h-8 text-xs rounded-md px-8 shadow w-full flex justify-center items-center`}
            >
              <p>{numberOfRepairs}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNumberOfRepairs((r) => r + 1)}
              aria-label="Increase repairs"
            >
              +
            </Button>
          </div>
        </div>

        {/* Bottom actions */}
        <Button
          asChild
          size="lg"
          variant="destructive"
          className="w-full mt-12"
        >
          <Link href={checkoutHref}>Make Payment</Link>
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="w-full mt-4">
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
