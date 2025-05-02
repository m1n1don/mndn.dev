import { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useResumeData from 'hooks/useResumeData';
import { withClient } from 'contexts/query';

describe('useResumeData', async () => {
  test('should render the hook correctly', async () => {
    const queryClient = new QueryClient();
    const { result } = renderHook(useResumeData, {
      wrapper: withClient(queryClient),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
