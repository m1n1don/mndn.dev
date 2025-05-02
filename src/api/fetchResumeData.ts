import type { Resume } from 'types/Resume';

export type ResumeResponse = Resume & {
  isExternal?: boolean;
};

export default async function fetchResumeData(): Promise<ResumeResponse> {
  const params = new URLSearchParams(global.location.search);
  const resumeParam = params.get('resume');

  const resumePath = resumeParam || '/resume.json';
  const isExternal = !!resumeParam;

  const response = await fetch(resumePath);
  if (!response.ok) {
    throw new Error('Failed to fetch resume data');
  }

  const resume = await response.json();
  return {
    ...resume,
    isExternal,
  };
}
