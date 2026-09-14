'use client'

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import WhatsAppLink from '@/components/ui/whatsapp';
import WhatsAppIcon from '@/components/ui/whatsappIcon';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/client-compress';
import { getOrderConstants } from '@/lib/api';
import { formatForDisplay } from '@/lib/utils';
import { Camera, Loader2, Sparkles, X } from 'lucide-react';
import { MIN_BLADES, REPAIR_PRICE, getBladePrice } from '@/constants/pricing';

type AiResult = {
  standard: number;
  serrated: number;
  scissors: number;
  repairs: number;
  ceramic: boolean;
  note: string;
};

/* ------------------------------------------------------------------ */
/* Photo intake                                                        */
/* ------------------------------------------------------------------ */

function PhotoIntake({
  photoUrl,
  onPhoto,
  onClear,
}: {
  photoUrl: string | null;
  onPhoto: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPhoto(file);
          e.target.value = '';
        }}
      />
      {photoUrl ? (
        <div className="relative overflow-hidden rounded-md border border-white/10">
          <Image
            src={photoUrl}
            alt="Your blades — used only to pre-fill the count"
            width={1600}
            height={1200}
            className="max-h-56 w-full object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove photo"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-black"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 left-3 rounded-full bg-black/80 px-4 py-2 text-sm font-bold text-white transition hover:bg-black"
          >
            Change photo
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onPhoto(file);
          }}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/20 bg-white/[0.03] px-6 py-10 text-center transition hover:border-white/40"
        >
          <Camera className="h-7 w-7 text-primary-foreground/40" />
          <p className="font-bold text-primary-foreground">Snap or upload a photo</p>
          <p className="text-xs leading-relaxed text-primary-foreground/50">
            We&apos;ll count your blades and repairs, then take you to booking.
            Tap to browse, or drag &amp; drop.
          </p>
          <span className="mt-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-black text-secondary-foreground shadow-sm">
            Choose photo
          </span>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slide-in drawer                                                     */
/* ------------------------------------------------------------------ */

/**
 * The quote panel itself. Mounted exactly once, by QuoteDrawerProvider —
 * render a <QuoteTrigger /> to open it rather than using this directly.
 */
export default function QuoteDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [ceramicRemoved, setCeramicRemoved] = useState(false);
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const photoFileRef = useRef<File | null>(null);
  const photoUrlRef = useRef<string | null>(null);
  const pickupDateRequested = useRef(false);

  // Portal the overlay to <body> after mount: the sticky CTA's wrapper has a
  // transform (translate-y for show/hide), which would otherwise become the
  // containing block for our `fixed` panel/backdrop and break the slide-in.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Release the last preview URL if the drawer unmounts while a photo is set.
  useEffect(
    () => () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    },
    [],
  );

  // Next collection date — same source as the homepage hero. The panel is
  // mounted sitewide, so this waits for the first open rather than firing on
  // every page load, and runs once per session thereafter.
  useEffect(() => {
    if (!open || pickupDateRequested.current) return;
    pickupDateRequested.current = true;
    getOrderConstants()
      .then((constants) => {
        const iso = constants?.bookingOrderGroupArray?.[0]?.pickupDateIso;
        if (iso) setPickupDate(formatForDisplay(iso));
      })
      .catch(() => {
        /* date is a nice-to-have — leave the fallback text */
      });
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // `close` only touches refs and state setters, so a captured copy behaves
    // identically — re-subscribing on every render would be pure churn.
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const resetPhoto = () => {
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    photoUrlRef.current = null;
    photoFileRef.current = null;
    setPhotoUrl(null);
    setAiResult(null);
    setAiError(null);
    setCeramicRemoved(false);
  };

  const close = () => {
    resetPhoto();
    onClose();
  };

  const handlePhoto = (file: File) => {
    setAiError(null);
    setAiResult(null);
    setCeramicRemoved(false);
    photoFileRef.current = file;

    const preview = URL.createObjectURL(file);
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    photoUrlRef.current = preview;
    setPhotoUrl(preview);
  };

  const runAnalysis = async () => {
    const file = photoFileRef.current;
    if (!file || analyzing) return;

    setAiError(null);
    setAiResult(null);
    setCeramicRemoved(false);
    setAnalyzing(true);
    try {
      let compressed: File;
      try {
        compressed = await compressImage(file);
      } catch {
        compressed = file; // worst case, send the original
      }

      const form = new FormData();
      form.append('image', compressed);
      const res = await fetch('/api/quote/analyze', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? 'Analysis failed.');
      }
      const result = data as AiResult;
      setAiResult(result);
      posthog.capture('quote_calculator_ai_analysis', {
        blades: result.standard + result.serrated + result.scissors,
        repairs: result.repairs,
        ceramic: result.ceramic,
      });
    } catch (err) {
      console.error(err);
      setAiError(
        err instanceof Error && err.message
          ? err.message
          : 'Could not analyse the photo — please try again.',
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const countedBlades = aiResult
    ? aiResult.standard + aiResult.serrated + aiResult.scissors
    : 0;
  const ceramicDetected = aiResult?.ceramic === true;
  // Customer can remove a confirmed-ceramic blade from the count.
  const blades = countedBlades - (ceramicDetected && ceramicRemoved ? 1 : 0);
  const belowMinimum = aiResult !== null && blades < MIN_BLADES;
  const repairs = aiResult ? aiResult.repairs : 0;
  const bladePrice = blades > 0 ? getBladePrice(blades) : 0;
  const total = blades * bladePrice + repairs * REPAIR_PRICE;

  const goToBooking = () => {
    if (!aiResult || belowMinimum) return;

    posthog.capture('quote_calculator_book', {
      blades,
      repairs,
      ceramic: ceramicDetected,
    });
    router.push(
      `/order?knives=${blades}&repairs=${repairs}${ceramicDetected ? '&ceramic=1' : ''}`,
    );
  };

  const goToBookingEmpty = () => {
    posthog.capture('quote_calculator_book_manual', {});
    router.push('/order');
  };

  if (!mounted) return null;

  // Portaled to <body> so `fixed` resolves against the viewport.
  return createPortal(
    <>
      {/* Backdrop — above the sitewide sticky CTA (z-99) */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[105] bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel — slides in from the right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Knife sharpening quote calculator"
        // The panel stays mounted so it can animate; `inert` keeps its
        // controls out of the tab order and the a11y tree while closed.
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[110] flex w-full max-w-md flex-col overflow-y-auto bg-primary shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between px-6 pb-2 pt-7">
          <div className="text-left">
            <p className="text-xs font-black tracking-[0.2em] text-secondary">
              INSTANT QUOTE
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-primary-foreground">
              Count your blades
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-primary-foreground/60 transition hover:bg-white/10 hover:text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 px-6 pb-8 pt-3">
          <p className="text-sm leading-relaxed text-primary-foreground/60">
            Snap a photo of your blades and we&apos;ll count them for you.
          </p>

          {/* Stated up front so a customer isn't turned away after uploading. */}
          <p className="text-xs leading-relaxed text-primary-foreground/50">
            Minimum order is {MIN_BLADES} blades — scissors count towards it.
          </p>

          <p className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-bold text-primary-foreground/80">
            <span aria-hidden>📦</span>
            Next collection:{' '}
            <span className="text-secondary">
              {pickupDate ?? 'Loading…'}
            </span>
          </p>

          <PhotoIntake
            photoUrl={photoUrl}
            onPhoto={handlePhoto}
            onClear={resetPhoto}
          />

          {photoUrl && !analyzing && !aiResult && (
            <Button
              size="xl"
              variant="secondary"
              onClick={runAnalysis}
              className="w-full text-base font-black tracking-widest uppercase"
            >
              <Sparkles className="h-5 w-5" />
              Count my blades
            </Button>
          )}

          {analyzing && (
            <div className="flex items-center justify-center gap-2 rounded-md border border-white/10 px-5 py-4 text-sm font-bold text-primary-foreground/80">
              <Loader2 className="h-4 w-4 animate-spin text-secondary" />
              Counting your blades…
            </div>
          )}

          {/* Result */}
          {aiResult && (
            <>
              <div className="rounded-md border border-secondary/40 bg-secondary/10 p-5">
                <p className="text-xs font-black tracking-[0.2em] text-secondary">
                  WE COUNTED
                </p>
                <div className="mt-3 space-y-2 text-sm text-primary-foreground/80">
                  <div className="flex justify-between">
                    <span>
                      {blades} blade{blades === 1 ? '' : 's'} × ${bladePrice}
                    </span>
                    <span>${blades * bladePrice}</span>
                  </div>
                  {repairs > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {repairs} repair{repairs === 1 ? '' : 's'} × ${REPAIR_PRICE}
                      </span>
                      <span>${repairs * REPAIR_PRICE}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-black text-primary-foreground">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              {/* Notes / conditions */}
              <div className="space-y-3">
                {ceramicDetected && (
                  <div className="rounded-md border border-secondary/40 bg-secondary/10 p-4">
                    <p className="text-sm font-black text-primary-foreground">
                      One blade doesn&apos;t look like steel
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-primary-foreground/70">
                      It may be ceramic — ceramic blades can&apos;t be
                      sharpened. Check with a fridge magnet — if it sticks,
                      it&apos;s metal and we can sharpen it. If it
                      doesn&apos;t stick, remove it from your count.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCeramicRemoved((r) => !r);
                        posthog.capture('quote_calculator_ceramic_toggle', {
                          removed: !ceramicRemoved,
                        });
                      }}
                      className="mt-3 w-full rounded-md border border-secondary/50 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-secondary transition hover:bg-secondary/20"
                    >
                      {ceramicRemoved
                        ? 'It sticks — keep it in my count'
                        : "It didn't stick — remove it from my count"}
                    </button>
                  </div>
                )}

                {aiResult.serrated > 0 && (
                  <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-primary-foreground/70">
                    <span className="font-black text-primary-foreground">
                      Serrated blades:
                    </span>{' '}
                    only larger serrations can be sharpened — fine or small
                    serrations can&apos;t.
                  </p>
                )}

                {aiResult.scissors > 0 && (
                  <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-primary-foreground/70">
                    <span className="font-black text-primary-foreground">
                      Scissors:
                    </span>{' '}
                    counted as blades — same price.
                  </p>
                )}
              </div>

              {/* Below minimum → request resubmission, no CTA */}
              {belowMinimum ? (
                <div className="rounded-md border border-amber-400/40 bg-amber-500/10 p-5">
                  <p className="text-sm font-black text-amber-300">
                    Minimum order is {MIN_BLADES} blades
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-100/80">
                    We only take orders of {MIN_BLADES} or more blades — your
                    photo shows {blades}. Please resubmit a photo with at least{' '}
                    {MIN_BLADES} blades.
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={resetPhoto}
                    className="mt-4 w-full text-sm font-black tracking-widest uppercase"
                  >
                    Upload a new photo
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    size="xl"
                    variant="secondary"
                    onClick={goToBooking}
                    className="w-full text-base font-black tracking-widest uppercase"
                  >
                    Book Sharpening — ${total}
                  </Button>
                  <p className="text-center text-xs text-primary-foreground/50">
                    Free pickup &amp; delivery islandwide. You&apos;ll confirm
                    the quantities on the booking form.
                  </p>
                </>
              )}
            </>
          )}

          {/* Error → still funnel to booking (quantities entered there) */}
          {aiError && (
            <div className="rounded-md border border-red-400/30 bg-red-500/10 p-5">
              <p className="text-sm font-bold text-red-300">Photo counting unavailable</p>
              <p className="mt-1 text-sm leading-relaxed text-red-200/80">{aiError}</p>
              <Button
                size="lg"
                variant="secondary"
                onClick={goToBookingEmpty}
                className="mt-4 w-full text-sm font-black tracking-widest uppercase"
              >
                Continue to booking
              </Button>
            </div>
          )}

          {/* Talk to a real person */}
          <WhatsAppLink
            origin="quote-drawer-chat"
            className="block pt-1"
          >
            <span className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#47C856] px-8 text-sm font-black tracking-widest uppercase text-white shadow-sm transition-colors hover:bg-[#31B740]">
              <WhatsAppIcon className="h-4 w-4" />
              Talk to a real person
            </span>
          </WhatsAppLink>
        </div>
      </aside>
    </>,
    document.body,
  );
}
