import { useSuspenseQuery } from '@tanstack/react-query';
import fetchResumeData from 'api/fetchResumeData';

export default function useResumeData() {
  return useSuspenseQuery({
    queryKey: ['resumeData'],
    queryFn: fetchResumeData,
  });
}
