import { MouseEvent, useEffect, useState } from 'react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from 'utils/date';
import CollapsibleWidget from 'widgets/CollapsibleWidget';
import type { SectionProps } from 'types/Props';
import type { ResumeGalleryItem } from 'types/Resume';

type GallerySectionProps = SectionProps<ResumeGalleryItem[]> & {
  fullPage?: boolean;
};

type GallerySort = 'newest' | 'oldest' | null;

export default function GallerySection({
  title,
  data = [],
  fullPage = false,
}: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<ResumeGalleryItem | null>(
    null,
  );
  const [selectedTag, setSelectedTag] = useState(() => getSelectedTag());
  const [selectedSort, setSelectedSort] = useState<GallerySort>(() =>
    getSelectedSort(),
  );
  const closeLabel = global.location.pathname == '/ja' ? '閉じる' : 'Close';
  const expandedMediaClass = 'max-h-[82vh] w-auto max-w-full object-contain';

  function getSelectedTag() {
    return new URLSearchParams(global.location.search).get('tag');
  }

  function getSelectedSort(): GallerySort {
    const sort = new URLSearchParams(global.location.search).get('sort');
    return sort == 'newest' || sort == 'oldest' ? sort : null;
  }

  function closeImage() {
    setSelectedImage(null);
    if (global.document.activeElement instanceof HTMLElement) {
      global.document.activeElement.blur();
    }
  }

  function handlePlaceholderClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
  }

  function stopClosing(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function isVideo(item: ResumeGalleryItem) {
    if (item.mediaType) return item.mediaType == 'video';

    const mediaPath = item.image.split(/[?#]/)[0].toLowerCase();
    return ['.mp4', '.webm', '.ogg', '.mov'].some((extension) =>
      mediaPath.endsWith(extension),
    );
  }

  function getGalleryPath() {
    return global.location.pathname.startsWith('/ja')
      ? '/ja/gallery'
      : '/gallery';
  }

  function getTagPath(tag: string) {
    return getGalleryUrl(tag, selectedSort);
  }

  function getGalleryUrl(tag: string | null, sort: GallerySort) {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sort) params.set('sort', sort);

    const query = params.toString();
    return query ? `${getGalleryPath()}?${query}` : getGalleryPath();
  }

  function formatTag(tag: string) {
    const labels = data
      .map((item) => item.tagLabels)
      .find((tagLabels) => tagLabels?.[tag]);
    if (global.location.pathname.startsWith('/ja') && labels?.[tag]) {
      return labels[tag];
    }

    return tag
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleTagClick(
    event: MouseEvent<HTMLAnchorElement>,
    tag: string | null,
  ) {
    if (!fullPage) return;

    event.preventDefault();
    const nextPath = getGalleryUrl(tag, selectedSort);
    global.history.pushState(null, '', nextPath);
    setSelectedTag(tag);
  }

  function handleSortClick(
    event: MouseEvent<HTMLAnchorElement>,
    sort: Exclude<GallerySort, null>,
  ) {
    event.preventDefault();
    const nextSort = selectedSort == sort ? null : sort;
    const nextPath = getGalleryUrl(selectedTag, nextSort);
    global.history.pushState(null, '', nextPath);
    setSelectedSort(nextSort);
  }

  function getHomeItems() {
    const selectedItems = data.filter((item) => item.showOnHome);
    const items = selectedItems.length > 0 ? selectedItems : data;
    return items.slice(0, 4);
  }

  function formatGalleryDate(date: string) {
    const japaneseMonth = date.match(/^(\d{4})年(\d{1,2})月/);
    if (japaneseMonth) {
      const [, year, month] = japaneseMonth;
      return formatDate(`${year}-${month.padStart(2, '0')}-01`);
    }

    const slashDate = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashDate) {
      const [, , month, year] = slashDate;
      return formatDate(`${year}-${month.padStart(2, '0')}-01`);
    }

    if (/^\d{4}$/.test(date)) {
      return formatDate(`${date}-01-01`);
    }

    return formatDate(date) || date;
  }

  function getDateValue(item: ResumeGalleryItem) {
    if (!item.date) return 0;

    const japaneseMonth = item.date.match(/^(\d{4})年(\d{1,2})月/);
    if (japaneseMonth) {
      const [, year, month] = japaneseMonth;
      return new Date(`${year}-${month.padStart(2, '0')}-01`).valueOf();
    }

    const slashDate = item.date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashDate) {
      const [, day, month, year] = slashDate;
      return new Date(
        `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      ).valueOf();
    }

    if (/^\d{4}$/.test(item.date)) {
      return new Date(`${item.date}-01-01`).valueOf();
    }

    const dateValue = new Date(item.date).valueOf();
    return Number.isNaN(dateValue) ? 0 : dateValue;
  }

  useEffect(() => {
    if (!selectedImage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeImage();
      }
    }

    global.addEventListener('keydown', handleKeyDown);
    return () => global.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    if (!fullPage) return;

    function handlePopState() {
      setSelectedTag(getSelectedTag());
      setSelectedSort(getSelectedSort());
    }

    global.addEventListener('popstate', handlePopState);
    return () => global.removeEventListener('popstate', handlePopState);
  }, [fullPage]);

  if (data.length == 0) return null;

  const galleryTags = [...new Set(data.flatMap((item) => item.tags))];
  const items = fullPage
    ? data
        .filter((item) => !selectedTag || item.tags.includes(selectedTag))
        .sort((a, b) => {
          if (!selectedSort) return 0;

          const direction = selectedSort == 'newest' ? -1 : 1;
          return (getDateValue(a) - getDateValue(b)) * direction;
        })
    : getHomeItems();
  const showGalleryLink = !fullPage && data.length >= 5;
  const isJapanese = global.location.pathname.startsWith('/ja');
  const galleryLinkText = isJapanese ? 'すべて見る' : 'View all';
  const allTagsText = isJapanese ? 'すべて' : 'All';
  const newestText = isJapanese ? '新しい順' : 'Newest';
  const oldestText = isJapanese ? '古い順' : 'Oldest';

  return (
    <section>
      <CollapsibleWidget title={title}>
        {fullPage && galleryTags.length > 0 && (
          <div className="flex flex-col gap-3 pt-4 text-xs sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <a
                href={getGalleryUrl(null, selectedSort)}
                onClick={(event) => handleTagClick(event, null)}
                className={selectedTag ? 'opacity-80' : 'font-medium'}
              >
                #{allTagsText}
              </a>
              {galleryTags.map((tag) => (
                <a
                  key={tag}
                  href={getTagPath(tag)}
                  onClick={(event) => handleTagClick(event, tag)}
                  className={selectedTag == tag ? 'font-medium' : 'opacity-80'}
                >
                  #{formatTag(tag)}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <a
                href={getGalleryUrl(selectedTag, 'newest')}
                onClick={(event) => handleSortClick(event, 'newest')}
                className={
                  selectedSort == 'newest' ? 'font-medium' : 'opacity-80'
                }
              >
                {newestText}
              </a>
              <a
                href={getGalleryUrl(selectedTag, 'oldest')}
                onClick={(event) => handleSortClick(event, 'oldest')}
                className={
                  selectedSort == 'oldest' ? 'font-medium' : 'opacity-80'
                }
              >
                {oldestText}
              </a>
            </div>
          </div>
        )}
        <ul className="grid gap-4 pt-4 lg:grid-cols-2">
          {items.map((item, idx) => {
            const { title, description, date, image, url, tags } = item;
            const isPlaceholder = url == '#';
            const video = isVideo(item);
            const media = (
              <div className="aspect-[16/10] bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
                {image && video ? (
                  <video
                    src={image}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover object-center"
                    aria-label={title}
                  />
                ) : image ? (
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl opacity-60">
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                )}
              </div>
            );

            return (
              <li
                key={title + idx}
                className="break-inside-avoid-page overflow-hidden border border-dashed border-gray-300 dark:border-gray-700"
              >
                {image ? (
                  <button
                    type="button"
                    className="group block w-full cursor-zoom-in text-left"
                    onClick={() => setSelectedImage(item)}
                    aria-label={`${title} ${video ? 'video' : 'image'}`}
                  >
                    {media}
                  </button>
                ) : (
                  <div className="group">{media}</div>
                )}
                <div className="space-y-2 p-4">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p>
                        {url ? (
                          <a
                            href={url}
                            onClick={
                              isPlaceholder ? handlePlaceholderClick : undefined
                            }
                          >
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </p>
                      {date && (
                        <p className="text-xs font-light opacity-85">
                          {formatGalleryDate(date)}
                        </p>
                      )}
                    </div>
                    <p className="pt-1 text-sm font-light">{description}</p>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 text-xs">
                      {tags.map((tag) => (
                        <a
                          key={tag}
                          href={getTagPath(tag)}
                          onClick={(event) => handleTagClick(event, tag)}
                          className="opacity-80"
                        >
                          #{formatTag(tag)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {showGalleryLink && (
          <p className="pt-4 text-sm font-light">
            <a href={getGalleryPath()}>{galleryLinkText}</a>
          </p>
        )}
      </CollapsibleWidget>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={closeImage}
        >
          <button
            type="button"
            className="absolute right-4 top-4 px-3 py-2 font-mono text-sm text-gray-100 opacity-80 hover:opacity-100"
            onClick={closeImage}
            aria-label="Close image"
          >
            {closeLabel}
          </button>
          <div className="pointer-events-none max-h-full max-w-6xl">
            {isVideo(selectedImage) ? (
              <video
                src={selectedImage.image}
                autoPlay
                controls
                playsInline
                preload="metadata"
                className={`${expandedMediaClass} pointer-events-auto`}
                onClick={stopClosing}
              />
            ) : (
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className={`${expandedMediaClass} pointer-events-auto`}
                onClick={stopClosing}
              />
            )}
            <div
              className="pointer-events-auto pt-3 text-gray-100"
              onClick={stopClosing}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p>{selectedImage.title}</p>
                {selectedImage.date && (
                  <p className="text-xs font-light opacity-80">
                    {formatGalleryDate(selectedImage.date)}
                  </p>
                )}
              </div>
              <p className="pt-1 text-sm font-light opacity-80">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
