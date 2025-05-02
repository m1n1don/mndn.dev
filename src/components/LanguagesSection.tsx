import SideSectionWidget from 'widgets/SideSectionWidget';
import type { SideSectionWidgetProps } from 'widgets/SideSectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeLanguage } from 'types/Resume';

export default function LanguagesSection({
  title,
  data = [],
}: SectionProps<ResumeLanguage[]>) {
  const props: SideSectionWidgetProps = {
    title,
    items: data.map(({ language, fluency }) => {
      return {
        title: language,
        subtitle: fluency,
      };
    }),
  };

  return <SideSectionWidget {...props} />;
}
