import { Lightbulb } from 'lucide-react';

interface KeyConceptProps {
  title: string;
  children: React.ReactNode;
}

const KeyConcept = ({ title, children }: KeyConceptProps) => {
  return (
    <div className="bg-dark-bg/50 border-l-4 border-accent-blue p-4 rounded-r-lg my-4">
      <div className="flex items-start">
        <Lightbulb className="h-5 w-5 text-accent-blue mr-3 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-text-light">{title}</h4>
          <div className="text-text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default KeyConcept;
