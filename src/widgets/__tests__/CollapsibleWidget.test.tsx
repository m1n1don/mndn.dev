import { render, screen } from '@testing-library/react';
import CollapsibleWidget from '../CollapsibleWidget';

describe('<CollapsibleWidget />', () => {
  test('should render open by default with a title, an icon and, content', () => {
    const title = 'Test Title';
    const child = <div>Sample content.</div>;
    render(<CollapsibleWidget title={title}>{child}</CollapsibleWidget>);

    const details = screen.getByTestId('collapsible');
    const summary = details.querySelector('summary');
    const content = details.querySelector('div');

    expect(details).toHaveAttribute('open');
    expect(summary.querySelector('svg')).toBeInTheDocument();
    expect(summary).toHaveTextContent(title);
    expect(content).not.toBeEmptyDOMElement();
  });
});
