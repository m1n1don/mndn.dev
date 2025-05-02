import { joinItems, summarize } from '../text';

describe('joinItems', () => {
  test('should join items correctly', () => {
    const items = ['one', 'two', 'three'];
    const res = joinItems(', ', ...items);
    expect(res).toBe('one, two, three');
  });

  test('should ignore nullable items', () => {
    const items = ['one', '', ''];
    const res = joinItems(', ', ...items);
    expect(res).toBe('one');
  });
});

describe('summarize', () => {
  test('should summarize text that has more words than word count', () => {
    const input = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
    const res = summarize(input, 3);
    expect(res).toBe('Lorem ipsum dolor...');
  });

  test('should return text as it is if word count is greater than the words input has', () => {
    const input = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
    const res = summarize(input, 30);
    expect(res).toBe(input);
  });
});
