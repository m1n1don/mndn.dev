import SideSectionWidget from 'widgets/SideSectionWidget';
import type { SideSectionWidgetProps } from 'widgets/SideSectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeSkill } from 'types/Resume';

export default function SkillsSection({
  title,
  data = [],
}: SectionProps<ResumeSkill[]>) {
  const props: SideSectionWidgetProps = {
    title,
    items: data.map(({ name, level, keywords }) => {
      return {
        title: name,
        subtitle: level,
        keywords: {
          items: keywords,
          search: 'github',
        },
      };
    }),
  };

  return <SideSectionWidget {...props} />;
}
