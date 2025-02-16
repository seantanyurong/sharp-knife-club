'use client';

import TableOfContents from './toc';

interface SidebarProps {
  markdown: string;
}

export default function TableOfContentsSidebar({ markdown }: SidebarProps) {
  return (
    <div
      className="
        group
        fixed left-0 top-1/2 -translate-y-1/2
        bg-white
        border-r border-gray-200
        shadow-md
        overflow-hidden
        w-10        /* Collapsed width */
        hover:w-64  /* Expand on hover */
        transition-all duration-300
        z-50        /* Ensure it's above your main content */
      "
      style={{ maxHeight: '80vh' }}  // So it doesn't overflow the viewport
    >
      {/* Inner container for the TOC */}
      <div className="px-2 py-4">
        <TableOfContents markdown={markdown} />
      </div>
    </div>
  );
}
