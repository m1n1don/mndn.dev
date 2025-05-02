import { act, renderHook } from '@testing-library/react';
import useMenu from '../useMenu';

describe('useMenu', () => {
  test('should handle open/closed state correctly', async () => {
    const { result } = renderHook(useMenu);

    // Initial state
    expect(result.current.isOpen).toBe(false);

    // Click to open
    act(result.current.toggleOpen);
    expect(result.current.isOpen).toBe(true);

    // Click to close
    act(result.current.toggleOpen);
    expect(result.current.isOpen).toBe(false);
  });
});
