import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from 'utils/date';
import PrimarySectionWidget from 'widgets/PrimarySectionWidget';
import type { PrimarySectionWidgetProps } from 'widgets/PrimarySectionWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeCertificate } from 'types/Resume';

export default function CertificatesSection({
  title,
  data = [],
}: SectionProps<ResumeCertificate[]>) {
  const props: PrimarySectionWidgetProps = {
    title,
    items: data.map(({ name, url, issuer, date }) => {
      return {
        title: { text: name, href: url },
        subtitles: [issuer],
        textRight: formatDate(date),
        icon: faCertificate,
      };
    }),
  };

  return <PrimarySectionWidget {...props} />;
}
