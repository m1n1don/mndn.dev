import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuWidget, { icons } from '../MenuWidget';
import useMenu from 'hooks/useMenu';

describe('<MenuWidget />', () => {
  test('should handle open/close state', async () => {
    const { result } = renderHook(useMenu);
    const { rerender } = render(<MenuWidget {...result.current} />);

    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');

    // Initial state
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', icons.open.iconName);

    // Click to open
    await act(async () => {
      await userEvent.click(button);
    });
    rerender(<MenuWidget {...result.current} />);
    expect(icon).toHaveAttribute('data-icon', icons.close.iconName);

    // Click to close
    await act(async () => {
      await userEvent.click(button);
    });
    rerender(<MenuWidget {...result.current} />);
    expect(icon).toHaveAttribute('data-icon', icons.open.iconName);
  });
});
