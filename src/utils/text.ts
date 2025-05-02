export function joinItems(separator: string, ...items: string[]) {
  return items.filter((item) => !!item).join(separator);
}

export function summarize(text: string, wordCount: number) {
  const parts = text.split(' ');
  return parts.length <= wordCount
    ? text
    : parts.slice(0, wordCount).join(' ') + '...';
}
