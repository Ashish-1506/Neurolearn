import { NavLink, useLocation } from "react-router-dom";
import { BrainCircuit, Book, Settings, Github, TrendingUp } from "lucide-react";

const navLinks = [
    { to: "/", text: "Dashboard", icon: BrainCircuit, end: true },
    { to: "/courses", text: "Course Library", icon: Book, end: false },
    { to: "/progress", text: "Progress", icon: TrendingUp, end: true },
    { to: "/settings", text: "Settings", icon: Settings, end: true },
];

const Sidebar = () => {

    return (
        <aside className="w-64 bg-dark-panel border-r border-dark-border flex-shrink-0 flex flex-col">
            <div className="p-6 border-b border-dark-border flex items-center space-x-4">
                <BrainCircuit className="w-10 h-10 text-accent-cyan" />
                <h1 className="text-2xl font-bold text-accent-cyan">
                    NeuroLearn
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navLinks.map(({ to, text, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                isActive
                                    ? "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                    : "text-text-secondary hover:bg-dark-border hover:text-text-primary"
                            }`
                        }
                    >
                        <Icon className="mr-3 h-5 w-5" />
                        <span>{text}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-dark-border">
                <a
                    href="https://github.com/your-repo/neurolearn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg text-text-secondary hover:bg-dark-border/50 hover:text-text-primary transition-colors"
                >
                    <Github className="mr-3 h-5 w-5" />
                    <span>GitHub</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
