import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { codingProjects } from '@/lib/content';
import ContentDetailPage from '@/components/content-detail-page';

type CodingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => codingProjects.map((item) => ({ id: item.id }));

export const generateMetadata = async ({ params }: CodingDetailPageProps): Promise<Metadata> => {
  const { id } = await params;
  const coding = codingProjects.find((item) => item.id === id);

  if (!coding) {
    return { title: 'Not found' };
  }

  return { title: coding.title, description: coding.description };
};

const CodingDetailPage = async ({ params }: CodingDetailPageProps) => {
  const { id } = await params;
  const coding = codingProjects.find((item) => item.id === id);

  if (!coding) {
    notFound();
  }

  return (
    <ContentDetailPage
      item={coding}
      collection={codingProjects}
      categoryLabel="Coding"
      categoryAnchor="coding-heading"
      basePath="/coding"
    />
  );
};

export default CodingDetailPage;
