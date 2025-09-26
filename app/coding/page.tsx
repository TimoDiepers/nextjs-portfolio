import ContentCollection from '@/components/content-collection';
import { codingProjects } from '@/lib/content';

const intro =
  'Product-ready tools, experiments, and infrastructure that help teams prototype faster and ship dependable systems. Filter by tech stack or focus area.';

const CodingPage = () => {
  return (
    <ContentCollection
      title="All Coding Projects"
      intro={intro}
      items={codingProjects}
      backHref="/"
    />
  );
};

export default CodingPage;
