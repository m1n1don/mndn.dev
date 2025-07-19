import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumePublication } from 'types/Resume';

export default function PublicationsSection({
  title,
  data = [],
}: SectionProps<ResumePublication[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(({ name, publisher, url, summary, releaseDate }) => {
      return {
        title: { text: name, href: url },
        subtitles: [publisher],
        textRight: formatDate(releaseDate),
        icon: faFileLines,
        content: summary,
      };
    }),
  };

  return <PrimarySectionWidget {...props} />;
}
