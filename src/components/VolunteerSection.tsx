import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeVolunteer } from 'types/Resume';

export default function VolunteerSection({
  title,
  subtitle,
  data = [],
}: SectionProps<ResumeVolunteer[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(
      ({ position, organization, url, summary, highlights, ...dates }) => {
        return {
          title: position,
          subtitles: [{ text: organization, href: url }],
          textRight: formatDateRange(dates.startDate, dates.endDate),
          icon: faUserGroup,
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
