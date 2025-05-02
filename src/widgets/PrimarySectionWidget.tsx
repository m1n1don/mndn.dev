import CollapsibleWidget from 'widgets/CollapsibleWidget';
import type { CollapsibleWidgetProps } from 'widgets/CollapsibleWidget';
import ListItemWidget from 'widgets/ListItemWidget';
import type { ListItemWidgetProps } from 'widgets/ListItemWidget';
import SimpleListWidget from 'widgets/SimpleListWidget';
import type { SimpleListWidgetProps } from 'widgets/SimpleListWidget';
import KeywordsWidget from 'widgets/KeywordsWidget';
import type { KeywordsWidgetProps } from 'widgets/KeywordsWidget';

export type PrimarySectionWidgetProps = Omit<
  CollapsibleWidgetProps,
  'children'
> & {
  items: (Omit<ListItemWidgetProps, 'children'> & {
    content?: React.ReactNode | undefined;
    sublist?: SimpleListWidgetProps;
    keywords?: KeywordsWidgetProps;
  })[];
};

export default function PrimarySectionWidget({
  title,
  open,
  items,
}: PrimarySectionWidgetProps) {
  if (items.length == 0) return null;

  function getKey(item: ListItemWidgetProps) {
    return typeof item.title == 'string' ? item.title : item.title.text;
  }

  return (
    <section>
      <CollapsibleWidget title={title} open={open}>
        <ul className="space-y-6 pt-4">
          {items.map(({ content, sublist, keywords, ...item }, idx) => (
            <li key={getKey(item) + idx}>
              <ListItemWidget {...item}>
                {content && <div>{content}</div>}
                <SimpleListWidget {...sublist} />
                <KeywordsWidget {...keywords} gap={4} className="pt-2" />
              </ListItemWidget>
            </li>
          ))}
        </ul>
      </CollapsibleWidget>
    </section>
  );
}
