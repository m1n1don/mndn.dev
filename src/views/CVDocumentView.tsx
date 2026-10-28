import { useContext, type PropsWithChildren, type ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { ResumeContext } from 'contexts/ResumeContext';
import { linkifyText } from 'utils/text';
import type { ResumeProject, ResumeWork } from 'types/Resume';
import './cv-document.css';

function Section({
  caption,
  title,
  children,
}: PropsWithChildren<{ caption: string; title: string }>) {
  return (
    <section className="cv-section" aria-label={title}>
      <h2 className="cv-section-heading">
        <span className="cv-caption">{caption}</span>
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}

function TextLink({ href, children }: PropsWithChildren<{ href?: string }>) {
  return href && href !== '#' ? <a href={href}>{children}</a> : <>{children}</>;
}

function Highlights({ items = [] }: { items?: string[] }) {
  return items.length ? (
    <ul className="cv-highlights">
      {items.map((item) => (
        <li key={item}>{linkifyText(item)}</li>
      ))}
    </ul>
  ) : null;
}

function Entry({
  title,
  role,
  dates,
  children,
}: PropsWithChildren<{
  title: ReactNode;
  role?: string;
  dates?: string;
}>) {
  return (
    <article className="cv-entry">
      <div className="cv-entry-heading">
        <h3>{title}</h3>
        {dates && <p className="cv-dates">{dates}</p>}
      </div>
      {role && <p className="cv-role">{role}</p>}
      {children}
    </article>
  );
}

export default function CVDocumentView() {
  const data = useContext(ResumeContext);
  const ja = /^\/ja(?:\/|$)/.test(global.location.pathname);
  const locale = ja ? 'ja-JP' : 'en-US';
  const text = (japanese: string, english: string) => (ja ? japanese : english);

  function date(value?: string) {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.valueOf())) return '';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    }).format(parsed);
  }

  function range(start?: string, end?: string) {
    if (!start && !end) return '';
    return [date(start), end ? date(end) : text('現在', 'Present')]
      .filter(Boolean)
      .join(' – ');
  }

  function languagePath(language: 'ja' | 'en') {
    const params = new URLSearchParams(global.location.search);
    params.set('type', 'cv');
    return `${language === 'ja' ? '/ja' : '/'}?${params.toString()}`;
  }

  if (!data) return null;
  const {
    basics,
    education = [],
    skills = [],
    languages = [],
    projects = [],
    work = [],
    volunteer = [],
    awards = [],
    certificates = [],
    publications = [],
    references = [],
    interests = [],
    meta,
  } = data;
  const name = basics.formalName || basics.name;

  function project(item: ResumeProject) {
    return (
      <Entry
        key={item.name}
        title={<TextLink href={item.url}>{item.name}</TextLink>}
        role={item.roles?.join(' / ')}
        dates={range(item.startDate, item.endDate)}
      >
        {item.description && (
          <p className="cv-description">{linkifyText(item.description)}</p>
        )}
        <Highlights items={item.highlights} />
      </Entry>
    );
  }

  function experience(item: ResumeWork) {
    return (
      <Entry
        key={`${item.name}-${item.startDate}`}
        title={<TextLink href={item.url}>{item.name}</TextLink>}
        role={item.position}
        dates={range(item.startDate, item.endDate)}
      >
        {item.summary && (
          <p className="cv-description">{linkifyText(item.summary)}</p>
        )}
        <Highlights items={item.highlights} />
      </Entry>
    );
  }

  return (
    <div className="cv-document" lang={ja ? 'ja' : 'en'}>
      <Helmet>
        <title>{name} | Curriculum Vitae</title>
        <meta name="description" content={basics.summary} />
        <meta name="author" content={name} />
        <link rel="icon" href={basics.image} />
      </Helmet>
      <header className="cv-header">
        <div className="cv-identity">
          <h1>{name}</h1>
          {basics.label && <p>{basics.label}</p>}
        </div>
        <nav
          className="cv-actions"
          aria-label={text('言語と印刷', 'Language and print')}
        >
          <div className="cv-languages">
            <a
              href={languagePath('ja')}
              lang="ja"
              hrefLang="ja"
              aria-current={ja ? 'page' : undefined}
            >
              日本語
            </a>
            <a
              href={languagePath('en')}
              lang="en"
              hrefLang="en"
              aria-current={!ja ? 'page' : undefined}
            >
              EN
            </a>
          </div>
          <button type="button" onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} />
            {text('印刷・PDF保存', 'Print / Save PDF')}
          </button>
        </nav>
      </header>
      <div className="cv-columns">
        <aside className="cv-sidebar">
          <Section caption="CONTACT" title={text('連絡先', 'Contact')}>
            <dl className="cv-contact">
              {basics.email && (
                <>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${basics.email}`}>{basics.email}</a>
                  </dd>
                </>
              )}
              {basics.phone && (
                <>
                  <dt>{text('電話', 'Phone')}</dt>
                  <dd>
                    <a href={`tel:${basics.phone}`}>{basics.phone}</a>
                  </dd>
                </>
              )}
              {[basics.location?.city, basics.location?.countryCode].filter(
                Boolean,
              ).length > 0 && (
                <>
                  <dt>{text('所在地', 'Location')}</dt>
                  <dd>
                    {[basics.location?.city, basics.location?.countryCode]
                      .filter(Boolean)
                      .join(', ')}
                  </dd>
                </>
              )}
              {basics.profiles?.map((profile) => (
                <div className="cv-contact-row" key={profile.network}>
                  <dt>{profile.network}</dt>
                  <dd>
                    <TextLink href={profile.url}>
                      {profile.username || profile.url}
                    </TextLink>
                  </dd>
                </div>
              ))}
              {basics.url && (
                <>
                  <dt>Web</dt>
                  <dd>
                    <a href={basics.url}>
                      {basics.url
                        .replace(/^https?:\/\//, '')
                        .replace(/\/$/, '')}
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </Section>
          {skills.length > 0 && (
            <Section caption="SKILLS" title={text('スキル', 'Skills')}>
              <dl className="cv-skill-list">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <dt>{skill.name}</dt>
                    <dd>{skill.keywords?.join(' / ')}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}
          {languages.length > 0 && (
            <Section caption="LANGUAGES" title={text('言語', 'Languages')}>
              <dl className="cv-language-list">
                {languages.map((language) => (
                  <div key={language.language}>
                    <dt>{language.language}</dt>
                    <dd>{language.fluency}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}
          {education.length > 0 && (
            <Section caption="EDUCATION" title={text('学歴', 'Education')}>
              {education.map((item) => (
                <Entry
                  key={`${item.institution}-${item.startDate}`}
                  title={
                    <TextLink href={item.url}>
                      {item.formalInstitution || item.institution}
                    </TextLink>
                  }
                  dates={range(item.startDate, item.endDate)}
                >
                  {item.area && <p>{item.area}</p>}
                  <Highlights items={item.courses} />
                </Entry>
              ))}
            </Section>
          )}
          {interests.length > 0 && (
            <Section caption="INTERESTS" title={text('関心分野', 'Interests')}>
              <ul className="cv-interests">
                {interests.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </Section>
          )}
        </aside>
        <main className="cv-main">
          {basics.summary && (
            <Section caption="ABOUT" title={text('自己紹介', 'About')}>
              {meta?.lastModified && date(meta.lastModified) && (
                <p className="cv-updated">
                  {text('最終更新', 'Updated')} {date(meta.lastModified)}
                </p>
              )}
              <p className="cv-summary">{linkifyText(basics.summary)}</p>
            </Section>
          )}
          {projects.length > 0 && (
            <Section
              caption="PROJECTS"
              title={text('プロジェクト', 'Projects')}
            >
              {project(projects[0])}
            </Section>
          )}
          {work.length > 0 && (
            <Section
              caption="RESEARCH & EXPERIENCE"
              title={text('研究・職歴', 'Research & Experience')}
            >
              {work.map(experience)}
            </Section>
          )}
          {projects.length > 1 && (
            <Section
              caption="OTHER PROJECTS"
              title={text('その他のプロジェクト', 'Other Projects')}
            >
              {projects.slice(1).map(project)}
            </Section>
          )}
          {volunteer.length > 0 && (
            <Section
              caption="VOLUNTEER"
              title={text('課外活動・ボランティア', 'Volunteer')}
            >
              {volunteer.map((item) => (
                <Entry
                  key={item.organization}
                  title={
                    <TextLink href={item.url}>{item.organization}</TextLink>
                  }
                  role={item.position}
                  dates={range(item.startDate, item.endDate)}
                >
                  {item.summary && (
                    <p className="cv-description">
                      {linkifyText(item.summary)}
                    </p>
                  )}
                  <Highlights items={item.highlights} />
                </Entry>
              ))}
            </Section>
          )}
          {awards.length > 0 && (
            <Section caption="AWARDS" title={text('受賞', 'Awards')}>
              {awards.map((item) => (
                <Entry
                  key={`${item.title}-${item.date}`}
                  title={item.title}
                  role={item.awarder}
                  dates={date(item.date)}
                >
                  {item.summary && (
                    <p className="cv-description">
                      {linkifyText(item.summary)}
                    </p>
                  )}
                </Entry>
              ))}
            </Section>
          )}
          {certificates.length > 0 && (
            <Section
              caption="CERTIFICATIONS"
              title={text('資格', 'Certifications')}
            >
              {certificates.map((item) => (
                <Entry
                  key={item.name}
                  title={<TextLink href={item.url}>{item.name}</TextLink>}
                  role={item.issuer}
                  dates={date(item.date)}
                />
              ))}
            </Section>
          )}
          {publications.length > 0 && (
            <Section
              caption="PUBLICATIONS"
              title={text('出版・発表', 'Publications')}
            >
              {publications.map((item) => (
                <Entry
                  key={item.name}
                  title={<TextLink href={item.url}>{item.name}</TextLink>}
                  role={item.publisher}
                  dates={date(item.releaseDate)}
                >
                  {item.summary && (
                    <p className="cv-description">
                      {linkifyText(item.summary)}
                    </p>
                  )}
                </Entry>
              ))}
            </Section>
          )}
          {references.length > 0 && (
            <Section caption="REFERENCES" title={text('推薦', 'References')}>
              {references.map((item) => (
                <Entry key={item.name} title={item.name}>
                  <p className="cv-description">
                    {linkifyText(item.reference)}
                  </p>
                </Entry>
              ))}
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}
