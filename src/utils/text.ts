import { createElement, type ReactNode } from 'react';

export function joinItems(separator: string, ...items: string[]) {
  return items.filter((item) => !!item).join(separator);
}

export function summarize(text: string, wordCount: number) {
  const parts = text.split(' ');
  return parts.length <= wordCount
    ? text
    : parts.slice(0, wordCount).join(' ') + '...';
}

const urlPattern = /(https?:\/\/[^\s]+)/g;
const trailingPunctuationPattern = /[),.。!?！？]+$/;

export function linkifyText(text: string): ReactNode {
  const parts = text.split(urlPattern);

  if (parts.length == 1) return text;

  return parts.map((part, index) => {
    if (!part.startsWith('http://') && !part.startsWith('https://')) {
      return part;
    }

    const trailingPunctuation =
      part.match(trailingPunctuationPattern)?.[0] ?? '';
    const href = trailingPunctuation
      ? part.slice(0, -trailingPunctuation.length)
      : part;

    return createElement(
      'span',
      { key: `${href}-${index}` },
      createElement('a', { href, target: '_blank', rel: 'noreferrer' }, href),
      trailingPunctuation,
    );
  });
}
