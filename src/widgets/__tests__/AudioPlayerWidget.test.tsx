import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayerWidget, { icons } from '../AudioPlayerWidget';

// Mock the Audio object globally
const mockPlay = vi.fn();
const mockPause = vi.fn();

class MockAudio {
  play = mockPlay;
  pause = mockPause;
  currentTime = 0;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.Audio = MockAudio as any;

describe('<AudioPlayerWidget />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render play icon initially', () => {
    render(<AudioPlayerWidget src={'test.mp3'} />);

    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', icons.play.iconName);
  });

  test('should toggle play/pause state when the button is clicked', async () => {
    render(<AudioPlayerWidget src={'test.mp3'} />);

    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');

    // Initial state
    expect(icon).toHaveAttribute('data-icon', icons.play.iconName);

    // Simulate a click to play
    await userEvent.click(button);
    expect(mockPlay).toHaveBeenCalled();
    expect(icon).toHaveAttribute('data-icon', icons.pause.iconName);

    // Simulate a click to pause
    await userEvent.click(button);
    expect(mockPause).toHaveBeenCalled();
    expect(icon).toHaveAttribute('data-icon', icons.play.iconName);
  });
});
