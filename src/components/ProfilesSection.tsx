import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import IconLinkWidget from 'widgets/IconLinkWidget';
import { getBrandIcon } from 'utils/icons';
import type { SectionProps } from 'types/Props';
import type { ResumeBasics } from 'types/Resume';
import { isFormalView } from 'utils/viewMode';

export default function ProfilesSection({ data }: SectionProps<ResumeBasics>) {
  const { profiles = [] } = data;
  const visibleProfiles = isFormalView()
    ? profiles.filter(
        ({ network }) =>
          !['twitter', 'discord'].includes(network.toLowerCase()),
      )
    : profiles;

  return (
    <section>
      <ul>
        {visibleProfiles.map(({ network, url, username }) => (
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
