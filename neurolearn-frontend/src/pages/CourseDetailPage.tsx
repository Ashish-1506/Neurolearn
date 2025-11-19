import { useParams, Link } from 'react-router-dom';
import { courseData } from '../data/courses';
import { PlayCircle, BookOpen } from 'lucide-react';

const CourseDetailPage = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = courseId ? courseData[courseId] : null;

    if (!course) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-accent-red">Course not found!</h1>
                <Link to="/courses" className="text-accent-cyan hover:underline mt-4 inline-block">
                    Back to Course Library
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-dark-panel border border-dark-border rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-text-primary">{course.title}</h1>
                <p className="text-text-secondary mt-2">All lessons are interactive sessions. Click any lesson to begin a monitored learning experience on the dashboard.</p>
            </div>
            <div className="bg-dark-panel border border-dark-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Lessons</h2>
                <ul className="space-y-3">
                    {course.lessons.map((lesson) => (
                        <li key={lesson.id}>
                           <Link 
                                to={`/courses/${courseId}/lessons/${lesson.id}`}
                                state={{ lessonTitle: lesson.title, lessonContent: lesson.content, lessonId: lesson.id }}
                                className="group block bg-dark-bg p-4 rounded-md border border-dark-border hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="bg-accent-violet/20 text-accent-violet p-2 rounded-full mr-4">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-text-primary font-semibold group-hover:text-accent-cyan transition-colors">{lesson.title}</h3>
                                            <p className="text-sm text-text-secondary">{lesson.content}</p>
                                        </div>
                                    </div>
                                    <PlayCircle className="h-8 w-8 text-text-secondary group-hover:text-accent-cyan transition-colors" />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseDetailPage;
