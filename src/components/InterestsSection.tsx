import SideSectionWidget from 'widgets/SideSectionWidget';
import type { SideSectionWidgetProps } from 'widgets/SideSectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeInterest } from 'types/Resume';

export default function InterestsSection({
  title,
  data = [],
}: SectionProps<ResumeInterest[]>) {
  const props: SideSectionWidgetProps = {
    title,
    items: data.map(({ name, keywords }) => {
      return {
        title: name,
        keywords: {
          items: keywords,
          search: 'google',
        },
      };
    }),
  };

  return <SideSectionWidget {...props} />;
}
