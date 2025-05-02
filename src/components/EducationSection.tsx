import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeEducation } from 'types/Resume';
import { joinItems } from 'utils/text';

export default function EducationSection({
  title,
  subtitle,
  data = [],
}: SectionProps<ResumeEducation[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(
      ({ area, studyType, institution, url, courses, score, ...dates }) => {
        return {
          title: area,
          subtitles: [
            joinItems(' / ', studyType, score),
            { text: institution, href: url },
          ],
          textRight: formatDateRange(dates.startDate, dates.endDate),
          icon: faUserGraduate,
          sublist: {
            title: subtitle,
            items: courses,
          },
        };
      },
    ),
  };

  return <PrimarySectionWidget {...props} />;
}
