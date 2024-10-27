// src/app/section/[id]/lesson/[lessonId]/notes/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { sections } from '@/data/lessonsData';
import Link from 'next/link';

export default function NotesPage() {
  const { id, lessonId } = useParams();
  const section = sections.find((section) => section.id === parseInt(id, 10));

  if (!section) {
    return <div>Section not found</div>;
  }

  const lesson = section.lessons.find((lesson) => lesson.lessonId === parseInt(lessonId, 10));

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Link back to Lesson Detail Page */}
      <Link href={`/section/${id}/lesson/${lessonId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад к уроку
      </Link>
      <h1 className="text-2xl font-bold mb-4">{lesson.title} — Конспект</h1>

      {/* Placeholder for Конспект content */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <p>Здесь будет содержимое конспекта для урока {lesson.title}.</p>
      </div>
    </div>
  );
}
