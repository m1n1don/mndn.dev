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

const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s]+)/g;
const trailingPunctuationPattern = /[),.。!?！？]+$/;

function createTextLink(href: string, label = href, key?: string) {
  return createElement(
    'a',
    {
      href,
      key,
      target: '_blank',
      rel: 'noreferrer',
      className: 'border-b border-dashed border-gray-500 dark:border-gray-400',
    },
    label,
  );
}

export function linkifyText(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(linkPattern)) {
    const [matchedText, label, markdownHref, bareHref] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    if (markdownHref) {
      nodes.push(
        createTextLink(markdownHref, label, `${markdownHref}-${matchIndex}`),
      );
      lastIndex = matchIndex + matchedText.length;
      continue;
    }

    const trailingPunctuation =
      bareHref.match(trailingPunctuationPattern)?.[0] ?? '';
    const href = trailingPunctuation
      ? bareHref.slice(0, -trailingPunctuation.length)
      : bareHref;

    nodes.push(createTextLink(href, href, `${href}-${matchIndex}`));
    if (trailingPunctuation) nodes.push(trailingPunctuation);
    lastIndex = matchIndex + matchedText.length;
  }

  if (nodes.length == 0) return text;
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}
