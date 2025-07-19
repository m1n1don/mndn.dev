import { faAward } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeAward } from 'types/Resume';

export default function AwardsSection({
  title,
  data = [],
}: SectionProps<ResumeAward[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(({ title, awarder, date, summary }) => {
      return {
        title,
        subtitles: [awarder],
        textRight: formatDate(date),
        icon: faAward,
        content: summary,
      };
    }),
  };

  return <PrimarySectionWidget {...props} />;
}
