// src/app/section/[id]/lesson/[lessonId]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { sections } from '@/data/lessonsData';

export default function LessonDetailPage() {
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
      {/* Direct link back to the Section Page */}
      <Link href={`/section/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад к разделу
      </Link>

      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <div className="space-y-6">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Видеоуроки</h2>
          <Link href={`/section/${id}/lesson/${lessonId}/video`} className="text-blue-500 hover:underline">
            К видео
          </Link>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Конспект</h2>
          <Link href={`/section/${id}/lesson/${lessonId}/notes`} className="text-blue-500 hover:underline">
            К конспекту
          </Link>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Задание</h2>
          <Link href={`/section/${id}/lesson/${lessonId}/tasks`} className="text-blue-500 hover:underline">
            К домашнему заданию
          </Link>
        </div>
      </div>
    </div>
  );
}
