import { http, HttpResponse } from 'msw';

async function fetchMockResume() {
  const resume = await import('~/data/resume.sample.json');
  return HttpResponse.json(resume);
}

export const handlers = [
  http.get('/resume.json', fetchMockResume),
  http.get('https://some.site/resume.json', fetchMockResume),
];
