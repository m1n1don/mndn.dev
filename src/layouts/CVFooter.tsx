import React from 'react';
import IconLinkWidget from 'widgets/IconLinkWidget';
import type { IconLinkWidgetProps } from 'widgets/IconLinkWidget';
import { appendViewMode } from 'utils/viewMode';

export default function CVFooter() {
  function getLanguagePath(lang: 'en' | 'ja') {
    const isGalleryPage = global.location.pathname.endsWith('/gallery');
    if (!isGalleryPage) return appendViewMode(lang == 'ja' ? '/ja' : '/');

    const search = global.location.search;
    return lang == 'ja' ? `/ja/gallery${search}` : `/gallery${search}`;
  }

  function goToLanguage(lang: 'en' | 'ja') {
    global.location.href = getLanguagePath(lang);
  }

  const links: IconLinkWidgetProps[] = [
    {
      text: 'English',
      target: () => goToLanguage('en'),
      icon: null,
    },
    {
      text: '日本語',
      target: () => goToLanguage('ja'),
      icon: null,
    },
  ];

  return (
    <footer className="flex justify-center gap-4 pt-4 text-xs opacity-60 sm:gap-6 sm:pt-8 print:hidden">
      {links.map((link) => (
        <React.Fragment key={link.text}>
          <IconLinkWidget {...link} />
          <span className="select-none last:hidden">•</span>
        </React.Fragment>
      ))}
    </footer>
  );
}
