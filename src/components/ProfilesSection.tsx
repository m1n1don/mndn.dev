import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import IconLinkWidget from 'widgets/IconLinkWidget';
import { getBrandIcon } from 'utils/icons';
import type { SectionProps } from 'types/Props';
import type { ResumeBasics } from 'types/Resume';

export default function ProfilesSection({ data }: SectionProps<ResumeBasics>) {
  const { profiles = [] } = data;

  return (
    <section>
      <ul>
        {profiles.map(({ network, url, username }) => (
          <li key={url} className="pb-2">
            <IconLinkWidget
              text={username}
              target={url}
              title={network}
              icon={getBrandIcon(network, faUserCircle)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
