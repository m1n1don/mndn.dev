import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
import IconLinkWidget from '../IconLinkWidget';
import type { IconLinkWidgetProps } from '../IconLinkWidget';

function renderWidget(props: IconLinkWidgetProps) {
  const user = userEvent.setup();
  const result = render(<IconLinkWidget {...props} />);

  const iconLink = screen.getByTestId('icon-link');
  const icon = iconLink.querySelector('svg');
  const link = iconLink.querySelector('a');

  return {
    user,
    result,
    iconLink,
    icon,
    link,
  };
}

describe('<IconLinkWidget />', () => {
  test('should render with an icon, text, href target and, title', async () => {
    const text = 'Dummy Link';
    const target = 'https://hello.world';
    const title = 'Test Title';

    const { icon, link } = renderWidget({ text, target, title, icon: faEarth });

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', faEarth.iconName);
    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveAttribute('title', title);
  });

  test('should use text as a fallback title', async () => {
    const text = 'Dummy Link';
    const target = 'https://hello.world';

    const { link } = renderWidget({ text, target, icon: faEarth });

    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveAttribute('title', text);
  });

  test('should render with a function target and handle click', async () => {
    const text = 'Dummy Link';
    const target = vi.fn();

    const { user, link } = renderWidget({
      text,
      target,
      icon: faEarth,
    });

    await user.click(link);

    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('href', '#');
    expect(target).toHaveBeenCalledOnce();
  });
});
