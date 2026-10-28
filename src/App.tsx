import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryProvider } from 'contexts/query';
import { ResumeProvider } from 'contexts/ResumeContext';
import LoadingView from 'views/LoadingView';
import ErrorView from 'views/ErrorView';

const CurriculumVitae = lazy(() => import('views/CurriculumVitae'));
const GalleryView = lazy(() => import('views/GalleryView'));
const CVDocumentView = lazy(() => import('views/CVDocumentView'));

export function App() {
  const isGalleryPage = global.location.pathname.endsWith('/gallery');
  const isCVPage =
    new URLSearchParams(global.location.search).get('type') === 'cv';

  return (
    <ErrorBoundary fallback={<ErrorView />}>
      <Suspense fallback={<LoadingView />}>
        <QueryProvider>
          <ResumeProvider>
            {isGalleryPage ? (
              <GalleryView />
            ) : isCVPage ? (
              <CVDocumentView />
            ) : (
              <CurriculumVitae />
            )}
          </ResumeProvider>
        </QueryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
