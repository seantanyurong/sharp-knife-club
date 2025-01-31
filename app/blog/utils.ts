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