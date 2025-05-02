import type { SectionProps } from 'types/Props';
import type { ResumeBasics } from 'types/Resume';

export default function SummarySection({ data }: SectionProps<ResumeBasics>) {
  const { summary } = data;

  return (
    <section>
      <p>{summary}</p>
    </section>
  );
}
