import { Link } from 'react-router-dom';
import CourseAnimation from '../components/CourseAnimation';

const courses = [
    { id: 'biology-101', title: 'Biology 101: The Cell', description: 'Explore the fundamental building blocks of life, from organelles to cellular processes.' },
    { id: 'physics-motion', title: 'Intro to Physics: Motion', description: 'Understand the principles of kinematics, dynamics, and Newton\'s laws.' },
    { id: 'psychology-memory', title: 'Psychology: Memory & The Brain', description: 'Delve into the cognitive science of how we form, store, and retrieve memories.' },
    { id: 'calculus-limits', title: 'Calculus I: Limits', description: 'Master the concept of limits, the foundation of calculus.' },
    { id: 'art-history-renaissance', title: 'Art History: The Renaissance', description: 'Journey through the art and culture of the European Renaissance.' },
    { id: 'cs-ai-fundamentals', title: 'Computer Science: AI Fundamentals', description: 'Learn the core concepts behind modern artificial intelligence and machine learning.' },
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <div className="bg-dark-panel border border-dark-border rounded-lg overflow-hidden shadow-lg hover:shadow-accent-violet/20 transition-shadow duration-300 flex flex-col">
        <CourseAnimation courseId={course.id} />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-text-primary mb-2 h-14">{course.title}</h3>
            <p className="text-text-secondary text-sm mb-4 flex-grow">{course.description}</p>
            <Link to={`/courses/${course.id}`} className="block w-full text-center bg-accent-blue text-dark-bg font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 mt-auto">
                Start Learning
            </Link>
        </div>
    </div>
);

const CoursesPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-text-primary">Course Library</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
        </div>
    );
};

export default CoursesPage;
