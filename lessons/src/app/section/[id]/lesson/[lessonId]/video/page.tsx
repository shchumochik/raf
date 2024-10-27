// src/app/section/[id]/lesson/[lessonId]/video/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { sections } from '@/data/lessonsData';
import Link from 'next/link';

export default function VideoLessonPage() {
  const { id, lessonId } = useParams();
  const section = sections.find((section) => section.id === parseInt(id, 10));

  if (!section) {
    return <div>Section not found</div>;
  }

  // Find the current lesson based on lessonId
  const currentLessonIndex = section.lessons.findIndex(
    (lesson) => lesson.lessonId === parseInt(lessonId, 10)
  );
  const lesson = section.lessons[currentLessonIndex];

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // Determine the previous and next lessons
  const previousLesson = section.lessons[currentLessonIndex - 1];
  const nextLesson = section.lessons[currentLessonIndex + 1];

  return (
    <div className="container mx-auto p-4">
      <Link href={`/section/${id}/lesson/${lessonId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад
      </Link>
      <h1 className="text-2xl font-bold mb-4">{lesson.title} — видео</h1>
      
      <div className="flex items-center justify-center">
        <video
          src={lesson.videoUrl}
          controls
          className="w-full max-w-2xl h-64 md:h-96 rounded-lg shadow-lg"
        />
      </div>

      {/* Navigation controls for previous and next videos */}
      <div className="flex justify-between items-center mt-4">
        {previousLesson ? (
          <Link href={`/section/${id}/lesson/${previousLesson.lessonId}/video`} className="text-blue-500 hover:underline">
            Предыдущий урок
          </Link>
        ) : (
          <span className="text-gray-400">Предыдущий урок</span>
        )}

        {nextLesson ? (
          <Link href={`/section/${id}/lesson/${nextLesson.lessonId}/video`} className="text-blue-500 hover:underline">
            Следующий урок
          </Link>
        ) : (
          <span className="text-gray-400">Следующий урок</span>
        )}
      </div>
    </div>
  );
}
