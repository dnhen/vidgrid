import Head from 'next/head';

interface PageHeadMetadataProps {
  title: string;
  description: string;
}

export const PageHeadMetadata = ({ title, description }: PageHeadMetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VidGrid" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content="thumbnail.png" />
      <meta
        name="keywords"
        content="website, design, development, low, cost, budget, friendly, quick, business, small, cafe, restaurant, easy, cheap, efficient, modern, creative, web, online, presence, social, media, seo, optimisation, mobile, friendly"
      />
    </Head>
  );
};
