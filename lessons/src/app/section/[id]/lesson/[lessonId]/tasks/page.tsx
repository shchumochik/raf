// src/app/section/[id]/lesson/[lessonId]/tasks/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { sections } from '@/data/lessonsData';
import Link from 'next/link';

export default function TasksPage() {
  const { id, lessonId } = useParams();
  const section = sections.find((section) => section.id === parseInt(id, 10));

  if (!section) {
    return <div>Section not found</div>;
  }

  const lesson = section.lessons.find((lesson) => lesson.lessonId === parseInt(lessonId, 10));

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // Placeholder function for future AI integration
  const handleGenerateTask = () => {
    alert('Генерация задания с помощью ИИ... (функция в разработке)');
    // Integrate AI functionality here
  };

  return (
    <div className="container mx-auto p-4">
      {/* Link back to Lesson Detail Page */}
      <Link href={`/section/${id}/lesson/${lessonId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад к уроку
      </Link>
      <h1 className="text-2xl font-bold mb-4">{lesson.title} — Задание</h1>

      <button
        onClick={handleGenerateTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
      >
        Сгенерировать домашнее задание с ИИ
      </button>

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <p>{lesson.task}</p>
      </div>
    </div>
  );
}
