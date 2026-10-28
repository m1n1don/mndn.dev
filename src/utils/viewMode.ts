export function isFormalView() {
  return new URLSearchParams(global.location.search).get('type') === 'formal';
}

export function appendViewMode(path: string) {
  const mode = new URLSearchParams(global.location.search).get('type');
  if (mode !== 'formal' && mode !== 'cv') return path;

  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('type', mode);

  return `${pathname}?${params.toString()}`;
}
