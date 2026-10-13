import Link from 'next/link';
import WhatsAppLink from '@/components/ui/whatsapp';
import NextPickupDate from '@/components/NextPickupDate';
import { Button } from '@/components/ui/button';
import { ADDON_PAGES, SHARPEN_PAGES } from '@/constants/browse-pages';

/**
 * Closes every blog post with a way to book. Search visitors who start on a
 * post almost never reached WhatsApp or the order form before this (0.9% vs
 * 11% from the home page), partly because posts ended without one.
 *
 * Booking goes through WhatsApp only, never straight to /order: we price and
 * confirm each job from a photo of the knives first. The button uses the same
 * greeting as every other WhatsApp button on the site. Taps carry origin
 * `blog_post` so blog-driven chats can be counted; the page URL on the event
 * says which post.
 *
 * `service` is an optional front-matter key naming a /sharpen or /add-on page
 * that matches the post (e.g. `scissors`, `chip-repairs`), linked for readers
 * who want the details.
 */
function findServicePage(service?: string) {
  if (!service) return undefined;
  if (SHARPEN_PAGES[service]) {
    return { href: `/sharpen/${service}`, page: SHARPEN_PAGES[service] };
  }
  if (ADDON_PAGES[service]) {
    return { href: `/add-on/${service}`, page: ADDON_PAGES[service] };
  }
  return undefined;
}

export default function BookingCta({ service }: { service?: string }) {
  const servicePage = findServicePage(service);

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
        24 hours. From $15 per blade. Send us a photo of your knives on WhatsApp
        and we&apos;ll confirm the price. Our next pickup is on <NextPickupDate />.
      </p>

      <div className="mt-6">
        <WhatsAppLink origin="blog_post" className="block sm:inline-block">
          <Button
            variant="secondary"
            size="lg"
            className="w-full font-black tracking-widest uppercase"
          >
            Book on WhatsApp
          </Button>
        </WhatsAppLink>
      </div>

      {servicePage && (
        <p className="mt-5 text-sm">
          <Link
            href={servicePage.href}
            className="font-bold text-secondary underline-offset-4 hover:underline"
          >
            More about our {servicePage.page.tile.label.toLowerCase()} service →
          </Link>
        </p>
      )}
    </aside>
  );
}
