import fetchResumeData, { ResumeResponse } from '../fetchResumeData';

describe('fetchResumeData', () => {
  test('should fetch internal resume data', async () => {
    const res = await fetchResumeData();
    expectTypeOf(res).toMatchTypeOf<ResumeResponse>();
    expect(res.basics).toBeDefined();
    expect(res.isExternal).toBe(false);
  });

  test('should fetch external resume data', async () => {
    // Provide resume param
    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        ...global.location,
        search: '?resume=https://some.site/resume.json',
      },
    });

    const res = await fetchResumeData();
    expectTypeOf(res).toMatchTypeOf<ResumeResponse>();
    expect(res.basics).toBeDefined();
    expect(res.isExternal).toBe(true);
  });
});
