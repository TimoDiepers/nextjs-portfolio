import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ContentDetailPage from '@/components/content-detail-page';
import { publications } from '@/lib/content';

type PublicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => publications.map((item) => ({ id: item.id }));

export const generateMetadata = async ({ params }: PublicationDetailPageProps): Promise<Metadata> => {
  const { id } = await params;
  const publication = publications.find((item) => item.id === id);

  if (!publication) {
    return { title: 'Not found' };
  }

  return { title: publication.title, description: publication.description };
};

const PublicationDetailPage = async ({ params }: PublicationDetailPageProps) => {
  const { id } = await params;
  const publication = publications.find((item) => item.id === id);

  if (!publication) {
    notFound();
  }

  return (
    <ContentDetailPage
      item={publication}
      collection={publications}
      categoryLabel="Publications"
      categoryAnchor="publications-heading"
      basePath="/publications"
    />
  );
};

export default PublicationDetailPage;
