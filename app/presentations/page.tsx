import ContentCollection from '@/components/content-collection';
import { presentations } from '@/lib/content';

const intro =
  'Talks, panels, and workshops where I share lessons on building human-centered AI experiences and resilient research platforms. Use the filters to browse by topic.';

const PresentationsPage = () => {
  return (
    <ContentCollection
      title="All Presentations"
      intro={intro}
      items={presentations}
      backHref="/"
    />
  );
};

export default PresentationsPage;
