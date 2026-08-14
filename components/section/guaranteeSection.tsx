import { ShieldCheck } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <div className="bg-primary pt-16 pb-10 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ShieldCheck
          className="mx-auto h-12 w-12 text-secondary"
          strokeWidth={1.5}
          aria-hidden
        />
        <h2 className="mt-6 text-3xl md:text-4xl font-black text-balance text-primary-foreground">
          SHARPER THAN NEW, GUARANTEED
        </h2>
        <p className="mt-4 text-base md:text-lg text-balance text-primary-foreground/70">
          If you’re not satisfied with the sharpening, we’ll re-sharpen at no
          extra cost — or refund you in full. Every knife is tested on paper
          before it comes back to you.
        </p>
      </div>
    </div>
  );
}
