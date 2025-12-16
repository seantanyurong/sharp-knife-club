import './article.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ComponentPropsWithoutRef } from "react";

export default function Article({ text }: { text: string }) {
  return (
    <div className='article-container mt-2'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          // [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ]}
        components={{
          a: ({
            children,
            ...props
          }: ComponentPropsWithoutRef<"a">) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
