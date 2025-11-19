import { Clock, AlertCircle, HelpCircle } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <div className="bg-dark-bg p-4 rounded-lg border border-dark-border flex flex-col items-center justify-center text-center">
    <div className={`p-3 rounded-full mb-2 ${color}`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-text-light">{value}</p>
    <p className="text-sm text-text-muted mt-1">{label}</p>
  </div>
);

interface SessionStatsProps {
  sessionTime: string;
  distractions: number;
  tipsReceived: number;
}

const SessionStats = ({ sessionTime, distractions, tipsReceived }: SessionStatsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-light mb-4">Session Stats</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard 
          icon={<Clock className="h-6 w-6 text-white" />} 
          label="Session Time" 
          value={sessionTime}
          color="bg-accent-blue"
        />
        <StatCard 
          icon={<AlertCircle className="h-6 w-6 text-white" />} 
          label="Distractions" 
          value={distractions}
          color="bg-accent-yellow"
        />
        <StatCard 
          icon={<HelpCircle className="h-6 w-6 text-white" />} 
          label="Tips Received" 
          value={tipsReceived}
          color="bg-accent-green"
        />
      </div>
    </div>
  );
};

export default SessionStats;
