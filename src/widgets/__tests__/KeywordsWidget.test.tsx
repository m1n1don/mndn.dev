import { render, screen } from '@testing-library/react';
import KeywordsWidget from '../KeywordsWidget';

describe('<KeywordsWidget />', () => {
  test('should return empty element when called with no items', () => {
    const { container } = render(<KeywordsWidget items={[]} search="github" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render items correctly', () => {
    const items = ['foo', 'bar', 'baz'];
    render(<KeywordsWidget items={items} search="github" />);

    const kw = screen.getByTestId('keywords');
    const kws = kw.querySelectorAll('* > a');

    expect(kws.length).toBe(items.length);
    expect(kws.item(0).textContent).toMatch(/foo/);
    expect(kws.item(0).getAttribute('href')).toMatch(/github.com/);
  });
});
