// src/app/section/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { sections } from '@/data/lessonsData';

export default function SectionPage() {
  const { id } = useParams();
  const section = sections.find((section) => section.id === parseInt(id, 10));

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Link back to a fixed main page or catalog */}
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад к каталогу
      </Link>

      <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
      <div className="space-y-4">
        {section.lessons.map((lesson) => (
          <Link key={lesson.lessonId} href={`/section/${id}/lesson/${lesson.lessonId}`} className="block p-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            {lesson.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
