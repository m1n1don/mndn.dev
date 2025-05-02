import { createContext, PropsWithChildren } from 'react';
import { ResumeResponse } from 'api/fetchResumeData';
import useResumeData from 'hooks/useResumeData';

export const ResumeContext = createContext<ResumeResponse | undefined>(
  undefined,
);

export const ResumeProvider = ({ children }: PropsWithChildren) => {
  const { data: resumeData } = useResumeData();
  return (
    <ResumeContext.Provider value={resumeData}>
      {children}
    </ResumeContext.Provider>
  );
};
