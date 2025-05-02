import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeReference } from 'types/Resume';

export default function ReferencesSection({
  title,
  data = [],
}: SectionProps<ResumeReference[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(({ name, reference }) => {
      return {
        title: name,
        icon: faQuoteLeft,
        content: reference,
      };
    }),
  };

  return <PrimarySectionWidget {...props} />;
}
