import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courseData } from '../data/courses';

interface LessonNavigationProps {
  currentLessonId: string | null;
}

const LessonNavigation = ({ currentLessonId }: LessonNavigationProps) => {
  if (!currentLessonId) return null;

  let prevLesson = null;
  let nextLesson = null;
  let currentCourseId: string | null = null;

  // This is a simple and inefficient way to find next/prev. A real app would have a better data structure.
  const allLessons = Object.entries(courseData).flatMap(([courseId, course]) => 
    course.lessons.map(lesson => ({ ...lesson, courseId }))
  );

  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);

  if (currentIndex !== -1) {
    currentCourseId = allLessons[currentIndex].courseId;
    if (currentIndex > 0 && allLessons[currentIndex - 1].courseId === currentCourseId) {
      prevLesson = allLessons[currentIndex - 1];
    }
    if (currentIndex < allLessons.length - 1 && allLessons[currentIndex + 1].courseId === currentCourseId) {
      nextLesson = allLessons[currentIndex + 1];
    }
  }

  return (
    <div className="mt-auto pt-6 border-t border-dark-border flex justify-between items-center">
      {prevLesson ? (
        <Link 
          to={`/courses/${currentCourseId}`} 
          state={{ lessonId: prevLesson.id, lessonTitle: prevLesson.title, lessonContent: prevLesson.content }}
          className="flex items-center space-x-2 text-text-muted hover:text-text-light transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Previous Lesson</span>
        </Link>
      ) : <div />}
      
      {nextLesson ? (
        <Link 
          to={`/courses/${currentCourseId}`} 
          state={{ lessonId: nextLesson.id, lessonTitle: nextLesson.title, lessonContent: nextLesson.content }}
          className="flex items-center space-x-2 text-text-muted hover:text-text-light transition-colors"
        >
          <span>Next Lesson</span>
          <ArrowRight size={18} />
        </Link>
      ) : <div />}
    </div>
  );
};

export default LessonNavigation;
