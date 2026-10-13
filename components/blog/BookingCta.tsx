import Link from 'next/link';
import WhatsAppLink from '@/components/ui/whatsapp';
import NextPickupDate from '@/components/NextPickupDate';
import { Button } from '@/components/ui/button';
import { SHARPEN_PAGES } from '@/constants/browse-pages';

/**
 * Closes every blog post with a way to book. Search visitors who start on a
 * post almost never reached WhatsApp or the order form before this (0.9% vs
 * 11% from the home page), partly because posts ended without one.
 *
 * WhatsApp taps carry origin `blog_post` so blog-driven chats can be counted;
 * the page URL on the event says which post. "Book online" shows up as an
 * /order pageview whose referrer is the post.
 *
 * `service` is an optional front-matter key naming a /sharpen page that
 * matches the post (e.g. `scissors`), linked for readers who want the details.
 */
export default function BookingCta({ service }: { service?: string }) {
  const servicePage = service ? SHARPEN_PAGES[service] : undefined;

  return (
    <aside className="mt-12 mb-8 rounded-md bg-primary p-6 md:p-8 text-primary-foreground">
      <p className="text-xs font-black tracking-[0.2em] text-secondary">
        RATHER LEAVE IT TO US?
      </p>
      <h2 className="mt-2 text-2xl font-black text-balance">
        We&apos;ll sharpen your knives for you
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
        Free pickup and delivery anywhere in Singapore, back at your door within
        24 hours. From $15 per blade. Our next pickup is on <NextPickupDate />.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <WhatsAppLink origin="blog_post" className="block sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="w-full font-black tracking-widest uppercase"
          >
            Book on WhatsApp
          </Button>
        </WhatsAppLink>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto border-white/20 bg-transparent font-black tracking-widest uppercase text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          <Link href="/order">Book online</Link>
        </Button>
      </div>

      {servicePage && service && (
        <p className="mt-5 text-sm">
          <Link
            href={`/sharpen/${service}`}
            className="font-bold text-secondary underline-offset-4 hover:underline"
          >
            More about our {servicePage.tile.label.toLowerCase()} service →
          </Link>
        </p>
      )}
    </aside>
  );
}
