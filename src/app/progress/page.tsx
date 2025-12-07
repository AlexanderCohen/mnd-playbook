import { ScoreDashboard } from '@/components/progress';

export default function ProgressPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
        <p className="text-gray-500">Track your ALSFRS-R scores over time</p>
      </div>
      <ScoreDashboard />
    </div>
  );
}
