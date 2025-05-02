import { faTools } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeProject } from 'types/Resume';

export default function ProjectsSection({
  title,
  subtitle,
  data = [],
}: SectionProps<ResumeProject[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(
      ({
        name,
        description,
        url,
        roles,
        keywords,
        highlights,
        entity,
        ...rest
      }) => {
        return {
          title: { text: name, href: url },
          subtitles: [roles.join(', '), entity],
          textRight: formatDateRange(rest.startDate, rest.endDate),
          icon: faTools,
          content: description,
          sublist: {
            title: subtitle,
            items: highlights,
          },
          keywords: {
            items: keywords,
            search: 'github',
          },
        };
      },
    ),
  };

  return <PrimarySectionWidget {...props} />;
}
