interface LessonProgressBarProps {
  progress: number;
}

const LessonProgressBar = ({ progress }: LessonProgressBarProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-text-muted">Lesson Progress</span>
        <span className="text-sm font-medium text-text-muted">{progress}%</span>
      </div>
      <div className="w-full bg-dark-bg rounded-full h-2.5 border border-dark-border">
        <div 
          className="bg-accent-blue h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LessonProgressBar;
