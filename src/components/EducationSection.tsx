import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeEducation } from 'types/Resume';

export default function EducationSection({
  title,
  subtitle,
  data = [],
}: SectionProps<ResumeEducation[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(({ area, institution, url, courses, ...dates }) => {
      return {
        title: { text: institution, href: url },
        subtitles: [area],
        textRight: formatDateRange(dates.startDate, dates.endDate),
        icon: faUserGraduate,
        sublist: {
          title: subtitle,
          items: courses,
        },
      };
    }),
  };

  return <PrimarySectionWidget {...props} />;
}
