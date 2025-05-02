import { act, renderHook } from '@testing-library/react';
import useAudioPlayer from '../useAudioPlayer';

beforeAll(() => {
  global.HTMLMediaElement.prototype.play = vi.fn();
  global.HTMLMediaElement.prototype.pause = vi.fn();
});

describe('useAudioPlayer', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should play and pause audio correctly', () => {
    const audioMock = new Audio();
    vi.spyOn(audioMock, 'play');
    vi.spyOn(audioMock, 'pause');

    const { result } = renderHook(() => useAudioPlayer(audioMock));

    // Play
    act(() => {
      result.current.togglePlay();
    });
    expect(audioMock.play).toHaveBeenCalled();
    expect(result.current.playing).toBe(true);

    // Pause
    act(() => {
      result.current.togglePlay();
    });
    expect(audioMock.pause).toHaveBeenCalled();
    expect(result.current.playing).toBe(false);
  });
});
