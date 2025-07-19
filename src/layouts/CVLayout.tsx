import { PropsWithChildren } from 'react';
import MenuWidget from 'widgets/MenuWidget';
import CVFooter from 'layouts/CVFooter';
import CVMeta from 'layouts/CVMeta';
import type { CVMetaProps } from 'layouts/CVMeta';
import useMenu from 'hooks/useMenu';

export type CVLayoutProps = PropsWithChildren<{
  meta: CVMetaProps;
  top: React.ReactNode;
  left: React.ReactNode;
}>;

export default function CVLayout({ meta, top, left, children }: CVLayoutProps) {
  const { isOpen, toggleOpen } = useMenu();

  const menuStyle: React.CSSProperties = isOpen
    ? {
        display: 'block',
        paddingTop: '5rem',
      }
    : {};

  return (
    <>
      <CVMeta {...meta} />
      <MenuWidget isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="min-h-screen w-full">
        <main className="container mx-auto px-6 pb-60 sm:px-0">
          <div
            className="border-b-2 border-dashed border-gray-400 py-6 sm:py-8"
            hidden={isOpen}
          >
            {top}
          </div>
          <div className="flex flex-row pt-6">
            <aside
              className="hidden w-full space-y-8 pe-2 font-light sm:block sm:w-60 sm:text-sm"
              style={menuStyle}
            >
              {left}
            </aside>
            <div className="w-full space-y-10" hidden={isOpen}>
              {children}
              <CVFooter />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
