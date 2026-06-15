import { useContext } from 'react';
import BasicsSection from 'components/BasicsSection';
import GallerySection from 'components/GallerySection';
import InterestsSection from 'components/InterestsSection';
import LanguagesSection from 'components/LanguagesSection';
import ProfilesSection from 'components/ProfilesSection';
import SkillsSection from 'components/SkillsSection';
import CVLayout from 'layouts/CVLayout';
import { ResumeContext } from 'contexts/ResumeContext';

export default function GalleryView() {
  const {
    basics,
    gallery,
    interests,
    languages,
    projects,
    skills,
    isExternal,
  } = useContext(ResumeContext);
  const isJapanese = global.location.pathname.startsWith('/ja');
  const homePath = isJapanese ? '/ja' : '/';
  const backText = isJapanese ? 'ホームへ戻る' : 'Back home';
  const backLink = (
    <p className="text-sm font-light">
      <a href={homePath}>{backText}</a>
    </p>
  );

  return (
    <CVLayout
      meta={{ basics, projects, skills }}
      top={<BasicsSection title="" data={{ basics, isExternal }} />}
      left={
        <>
          <ProfilesSection title="" data={basics} />
          <SkillsSection title="Skills" data={skills} />
          <LanguagesSection title="Languages" data={languages} />
          <InterestsSection title="Interests" data={interests} />
        </>
      }
    >
      {backLink}
      <GallerySection title="Gallery" data={gallery} fullPage />
      {backLink}
    </CVLayout>
  );
}
