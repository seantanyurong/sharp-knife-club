import './article.css';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Article({ text }: { text: string }) {
  return (
    <div className='article-container mt-2'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
