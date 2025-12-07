import { AssessmentWizard } from '@/components/assessment';

export default function AssessPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Monthly Assessment</h2>
        <p className="text-gray-500">ALSFRS-R Questionnaire</p>
      </div>
      <AssessmentWizard />
    </div>
  );
}
