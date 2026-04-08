import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface FrontMatter {
  title: string;
  description: string;
  slug: string;
  [key: string]: any;
}

interface PageInfo {
  frontMatter: FrontMatter;
  markdownContent: string;
}

export const getForPage = (slug: string): PageInfo => {
  const filePath = path.join(process.cwd(), 'public', 'for', `${slug}.md`);
  let markdownContent = '';
  let frontMatter: FrontMatter = { title: '', description: '', slug: '' };

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    frontMatter = data as FrontMatter;
    markdownContent = content;
  } catch (error) {
    console.error('Error reading for-page markdown file:', error);
  }

  return { frontMatter, markdownContent };
};

export const getAllForSlugs = (): string[] => {
  const dir = path.join(process.cwd(), 'public', 'for');
  try {
    return fs
      .readdirSync(dir)
      .filter(file => path.extname(file) === '.md')
      .map(file => path.basename(file, '.md'));
  } catch {
    return [];
  }
};
