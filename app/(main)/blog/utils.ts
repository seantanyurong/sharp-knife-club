import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

interface FrontMatter {
  title: string;
  publishedAt: string;
  slug: string;
  [key: string]: any;
}

interface ArticleInfo {
  frontMatter: FrontMatter;
  markdownContent: string;
}

export const getArticle = (slug: string): ArticleInfo => {
  const filePath = path.join(process.cwd(), 'public', 'blog', 'pages', `${slug}.md`);
  let markdownContent = '';
  let frontMatter: FrontMatter = { title: '', publishedAt: '', slug: '' };

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContent);
    frontMatter = data as FrontMatter;
    markdownContent = content;

    return { frontMatter, markdownContent }
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return { frontMatter, markdownContent }
  }
}

export const getAllArticles = (): ArticleInfo[] => {
  const articlesDir = path.join(process.cwd(), 'public', 'blog', 'pages');
  const articles: ArticleInfo[] = [];

  try {
    const files = fs.readdirSync(articlesDir);

    files.forEach(file => {
      if (path.extname(file) === '.md') {
        const filePath = path.join(articlesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const frontMatter = data as FrontMatter;
        const markdownContent = content;

        articles.push({ frontMatter, markdownContent });
      }
    });
  } catch (error) {
    console.error('Error reading markdown files:', error);
  }

  return articles;
}

const META_DESCRIPTION_LIMIT = 160;

/**
 * The search snippet for a post: its `description` front matter when set,
 * otherwise the opening paragraph with the markdown stripped, cut at the last
 * full sentence (or word) that fits in 160 characters. Raw markdown used to go
 * straight in, so snippets showed `[link](/blog/…)` syntax and stopped
 * mid-word.
 */
export const getMetaDescription = ({ frontMatter, markdownContent }: ArticleInfo): string => {
  if (typeof frontMatter.description === 'string' && frontMatter.description.trim()) {
    return frontMatter.description.trim();
  }

  const paragraph =
    markdownContent
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      // Skip headings, images, tables and other non-prose blocks.
      .find((block) => block && !/^(#|!\[|\||<|>|-{3,}|\*\s|-\s|\d+\.\s)/.test(block)) ?? '';

  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|\*|_|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= META_DESCRIPTION_LIMIT) return text;

  const cut = text.slice(0, META_DESCRIPTION_LIMIT);
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1);

  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:–—-]$/, '')}…`;
};
