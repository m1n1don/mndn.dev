import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeWork } from 'types/Resume';

export default function WorkSection({
  title,
  subtitle,
  data = [],
}: SectionProps<ResumeWork[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(
      ({ position, name, url, summary, highlights, ...dates }) => {
        return {
          title: position,
          subtitles: [{ text: name, href: url }],
          textRight: formatDateRange(dates.startDate, dates.endDate),
          icon: faUserTie,
          content: summary,
          sublist: {
            title: subtitle,
            items: highlights,
          },
        };
      },
    ),
  };

  return <PrimarySectionWidget {...props} />;
}
