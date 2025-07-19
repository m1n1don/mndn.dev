import { useContext } from 'react';
import CVLayout from 'layouts/CVLayout';
import AwardsSection from 'components/AwardsSection';
import BasicsSection from 'components/BasicsSection';
import CertificatesSection from 'components/CertificatesSection';
import EducationSection from 'components/EducationSection';
import InterestsSection from 'components/InterestsSection';
import LanguagesSection from 'components/LanguagesSection';
import ProfilesSection from 'components/ProfilesSection';
import ProjectsSection from 'components/ProjectsSection';
import PublicationsSection from 'components/PublicationsSection';
import ReferencesSection from 'components/ReferencesSection';
import SkillsSection from 'components/SkillsSection';
import SummarySection from 'components/SummarySection';
import VolunteerSection from 'components/VolunteerSection';
import WorkSection from 'components/WorkSection';
import { ResumeContext } from 'contexts/ResumeContext';

export default function CurriculumVitae() {
  const {
    awards,
    basics,
    certificates,
    education,
    interests,
    languages,
    projects,
    publications,
    references,
    skills,
    volunteer,
    work,
    isExternal,
  } = useContext(ResumeContext);

  return (
    <CVLayout
      meta={{ basics, projects, skills }}
      top={
        <>
          <BasicsSection title="" data={{ basics, isExternal }} />
        </>
      }
      left={
        <>
          <ProfilesSection title="" data={basics} />
          <SkillsSection title="Skills" data={skills} />
          <LanguagesSection title="Languages" data={languages} />
          <InterestsSection title="Interests" data={interests} />
        </>
      }
    >
      <SummarySection title="" data={basics} />
      <WorkSection title="Experience" subtitle="Highlights" data={work} />
      <EducationSection
        title="Education"
        subtitle="Notable Courses"
        data={education}
      />
      <VolunteerSection
        title="Volunteer"
        subtitle="Highlights"
        data={volunteer}
      />
      <AwardsSection title="Awards" data={awards} />
      <CertificatesSection title="Certificates" data={certificates} />
      <PublicationsSection title="Publications" data={publications} />
      <ProjectsSection title="Projects" subtitle="Highlights" data={projects} />
      <ReferencesSection title="References" data={references} />
    </CVLayout>
  );
}
