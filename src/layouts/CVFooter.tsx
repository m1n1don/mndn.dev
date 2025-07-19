import React from 'react';
import IconLinkWidget from 'widgets/IconLinkWidget';
import type { IconLinkWidgetProps } from 'widgets/IconLinkWidget';

export default function CVFooter() {
  const links: IconLinkWidgetProps[] = [
    {
      text: 'English',
      target: '/',
      icon: null,
    },
    {
      text: '日本語',
      target: '/ja',
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
