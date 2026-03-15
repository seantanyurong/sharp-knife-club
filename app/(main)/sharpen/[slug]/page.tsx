import { SHARPEN_PAGES, getAllSharpenSlugs } from '@/constants/browse-pages';
import BrowsePageTemplate from '@/components/browsePageTemplate';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSharpenSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = SHARPEN_PAGES[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function SharpenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = SHARPEN_PAGES[slug];
  if (!page) notFound();

  return <BrowsePageTemplate page={page} slug={slug} />;
}
