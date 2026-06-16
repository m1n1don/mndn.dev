import type { Resume } from 'types/Resume';

export type ResumeResponse = Resume & {
  isExternal?: boolean;
};

function resolveMediaUrl(path: string) {
  const mediaUrl = process.env.MEDIA_URL;
  if (!mediaUrl || /^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  return [mediaUrl.replace(/\/$/, ''), path.replace(/^\//, '')].join('/');
}

function resolveResumeMedia(resume: Resume): Resume {
  return {
    ...resume,
    gallery: resume.gallery?.map((item) => ({
      ...item,
      image: resolveMediaUrl(item.image),
    })),
  };
}

export default async function fetchResumeData(): Promise<ResumeResponse> {
  const params = new URLSearchParams(global.location.search);
  const resumeParam = params.get('resume');

  const pathname = global.location.pathname;
  const lang = pathname === '/ja' || pathname.startsWith('/ja/') ? 'ja' : 'en';

  const resumePath = resumeParam || `/resume-${lang}.json`;
  const isExternal = !!resumeParam;

  const response = await fetch(resumePath);
  if (!response.ok) {
    throw new Error('Failed to fetch resume data');
  }

  const resume = await response.json();
  return {
    ...resolveResumeMedia(resume),
    isExternal,
  };
}
