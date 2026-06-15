import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryProvider } from 'contexts/query';
import { ResumeProvider } from 'contexts/ResumeContext';
import LoadingView from 'views/LoadingView';
import ErrorView from 'views/ErrorView';

const CurriculumVitae = lazy(() => import('views/CurriculumVitae'));
const GalleryView = lazy(() => import('views/GalleryView'));

export function App() {
  const isGalleryPage = global.location.pathname.endsWith('/gallery');

  return (
    <ErrorBoundary fallback={<ErrorView />}>
      <Suspense fallback={<LoadingView />}>
        <QueryProvider>
          <ResumeProvider>
            {isGalleryPage ? <GalleryView /> : <CurriculumVitae />}
          </ResumeProvider>
        </QueryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
