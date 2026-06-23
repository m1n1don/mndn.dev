export function isFormalView() {
  return new URLSearchParams(global.location.search).get('type') === 'formal';
}

export function appendViewMode(path: string) {
  if (!isFormalView()) return path;

  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('type', 'formal');

  return `${pathname}?${params.toString()}`;
}
