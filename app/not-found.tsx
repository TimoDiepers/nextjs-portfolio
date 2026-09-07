'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="entrance mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-4 px-6 py-10 text-sm">
      <div className="space-y-1">
        <h1 className="sr-only">Page not found</h1>
        <p>
          <span className="opacity-70">&gt;</span> open {pathname}
        </p>
        <p className="opacity-80">no such entry: {pathname}</p>
      </div>
      <p>
        <Link href="/" className="!underline opacity-90 transition-opacity duration-150 hover:opacity-100">
          ← back to overview
        </Link>
      </p>
    </main>
  );
}
