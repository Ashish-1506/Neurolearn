// In a real app, this data would likely come from a CMS or database.
// All lessons are now "interactive", linking to the main dashboard for a monitored session.

export const courseData: { [key:string]: { title: string, lessons: { id: string, title: string, link: string, content: string }[] } } = {
    'biology-101': {
        title: 'Biology 101: The Cell',
        lessons: [
            { id: 'intro-to-cells', title: 'Lesson 1: Introduction to The Cell', link: '/', content: "The cell is the basic structural, functional, and biological unit of all known organisms. A cell is the smallest unit of life." },
            { id: 'photosynthesis', title: 'Lesson 2: Photosynthesis', link: '/', content: "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy." },
            { id: 'cellular-respiration', title: 'Lesson 3: Cellular Respiration', link: '/', content: "Cellular respiration is the process through which cells convert sugars into energy, creating ATP." },
            { id: 'mitosis-meiosis', title: 'Lesson 4: Mitosis and Meiosis', link: '/', content: "Mitosis and meiosis are two types of cell division, fundamental for growth, repair, and reproduction." },
        ]
    },
    'physics-motion': {
        title: 'Intro to Physics: Motion',
        lessons: [
            { id: 'kinematics', title: 'Lesson 1: Kinematics in One Dimension', link: '/', content: "Kinematics describes the motion of objects without considering the forces that cause them to move." },
            { id: 'vectors', title: 'Lesson 2: Vectors and 2D Motion', link: '/', content: "Explore how to work with vectors and describe motion in two dimensions, such as projectile motion." },
            { id: 'newtons-laws', title: 'Lesson 3: Newton\'s Laws of Motion', link: '/', content: "Newton's three laws of motion form the foundation of classical mechanics." },
        ]
    },
    'psychology-memory': {
        title: 'Psychology: Memory & The Brain',
        lessons: [
            { id: 'models-of-memory', title: 'Lesson 1: Models of Memory', link: '/', content: "Introduces the multi-store model and the working memory model." },
            { id: 'ltp', title: 'Lesson 2: Long-Term Potentiation', link: '/', content: "LTP is a persistent strengthening of synapses, a key mechanism in learning and memory." },
            { id: 'forgetting', title: 'Lesson 3: Forgetting and Amnesia', link: '/', content: "Discusses theories of forgetting, such as interference and decay, and different forms of amnesia." },
        ]
    },
    'calculus-limits': {
        title: 'Calculus I: Limits',
        lessons: [
            { id: 'concept-of-limit', title: 'Lesson 1: The Concept of a Limit', link: '/', content: "A limit is the value that a function 'approaches' as the input 'approaches' some value." },
            { id: 'limit-laws', title: 'Lesson 2: Calculating Limits Using the Limit Laws', link: '/', content: "Covers the fundamental laws for calculating limits of complex functions." },
            { id: 'one-sided-limits', title: 'Lesson 3: One-Sided Limits and Continuity', link: '/', content: "Explore left-hand and right-hand limits and how they relate to the formal definition of continuity." },
        ]
    },
    'art-history-renaissance': {
        title: 'Art History: The Renaissance',
        lessons: [
            { id: 'early-renaissance', title: 'Lesson 1: The Early Renaissance in Italy', link: '/', content: "Study the works of pioneers like Brunelleschi, Donatello, and Masaccio." },
            { id: 'high-renaissance', title: 'Lesson 2: The High Renaissance', link: '/', content: "Focuses on the masterworks of Leonardo da Vinci, Michelangelo, and Raphael." },
            { id: 'northern-renaissance', title: 'Lesson 3: The Northern Renaissance', link: '/', content: "Examine the detailed realism and symbolism in the works of artists like Jan van Eyck and Albrecht Dürer." },
        ]
    },
    'cs-ai-fundamentals': {
        title: 'Computer Science: AI Fundamentals',
        lessons: [
            { id: 'what-is-ai', title: 'Lesson 1: What is Artificial Intelligence?', link: '/', content: "A broad overview of AI, its history, and its main subfields." },
            { id: 'intro-to-ml', title: 'Lesson 2: Introduction to Machine Learning', link: '/', content: "Explore the three main types of machine learning: supervised, unsupervised, and reinforcement learning." },
            { id: 'neural-nets', title: 'Lesson 3: Neural Networks and Deep Learning', link: '/', content: "Explains the basic structure of a neural network and how they 'learn' from data." },
        ]
    },
};
