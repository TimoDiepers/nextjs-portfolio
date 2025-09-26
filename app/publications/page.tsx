import ContentCollection from '@/components/content-collection';
import { publications } from '@/lib/content';

const intro =
  'Every publication builds towards transparent machine learning systems and collaborative research tooling. Filter by topic to explore the areas you care about most.';

const PublicationsPage = () => {
  return (
    <ContentCollection
      title="All Publications"
      intro={intro}
      items={publications}
      backHref="/"
    />
  );
};

export default PublicationsPage;
