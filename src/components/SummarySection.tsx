import type { SectionProps } from 'types/Props';
import type { ResumeBasics } from 'types/Resume';
import { linkifyText } from 'utils/text';

export default function SummarySection({ data }: SectionProps<ResumeBasics>) {
  const { summary } = data;

  return (
    <section>
      <p>{linkifyText(summary)}</p>
    </section>
  );
}
