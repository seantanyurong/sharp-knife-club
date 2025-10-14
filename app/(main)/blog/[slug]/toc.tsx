'use client';

import React from 'react';
import { unified } from 'unified';
import parse from 'remark-parse';
import { visit } from 'unist-util-visit';
import slugify from 'slug';

type TOCItem = {
  level: number;
  text: string;
  slug: string;
};

function getHeadings(markdown: string): TOCItem[] {
  // Parse the markdown into an AST
  const tree = unified().use(parse).parse(markdown);
  const headings: TOCItem[] = [];

  visit(tree, 'heading', (node: any) => {
    // Extract text from heading node
    const headingText = node.children
      .filter((child: any) => child.type === 'text')
      .map((child: any) => child.value)
      .join('');

    headings.push({
      level: node.depth,
      text: headingText,
      slug: slugify(headingText),
    });
  });

  return headings;
}

interface TableOfContentsProps {
  markdown: string;
}

export default function TableOfContents({ markdown }: TableOfContentsProps) {
  const headings = getHeadings(markdown);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of Contents">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <ul>
        {headings.map(({ level, text, slug }) => (
          <li key={slug} style={{ marginLeft: (level - 1) * 16 }}>
            <a href={`#${slug}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
