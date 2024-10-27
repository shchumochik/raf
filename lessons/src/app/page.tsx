// src/app/page.tsx
"use client";

import Link from 'next/link';
import { sections } from '@/data/lessonsData';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Курс Android Development</h1>
      <div className="space-y-4">
        {sections.map((section) => (
          <Link key={section.id} href={`/section/${section.id}`} className="block p-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            {section.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
