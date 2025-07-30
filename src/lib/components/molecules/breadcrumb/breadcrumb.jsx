'use client'

import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(part => part);

  return (
    <nav className="flex items-center gap-x-2">
      {pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/');
        return (
          <span key={index} className="text-sm text-gray-600">
            <a href={href} className="hover:underline">{part}</a>
            {index < pathParts.length - 1 && <span className="mx-2">/</span>}
          </span>
        );
      })}
    </nav>
  );
}   