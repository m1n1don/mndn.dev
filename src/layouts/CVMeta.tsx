import { Helmet } from 'react-helmet';
import { joinItems, summarize } from 'utils/text';
import type { ResumeBasics, ResumeProject, ResumeSkill } from 'types/Resume';

export type CVMetaProps = {
  basics: ResumeBasics;
  skills: ResumeSkill[];
  projects: ResumeProject[];
};

export default function CVMeta({
  basics,
  skills = [],
  projects = [],
}: CVMetaProps) {
  const { name, label, summary, url, image } = basics;

  const title = joinItems(' | ', name, label);
  const desc = summarize(summary, 30);
  const keywords = [
    ...skills.flatMap(({ keywords }) => keywords),
    ...projects.flatMap(({ keywords }) => keywords),
  ].join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
