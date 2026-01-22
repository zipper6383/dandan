import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const defaultDesc = "龙岗区善泽民工互助会 - 守护工友权益，扶助困难群体";
  const siteTitle = "龙岗区善泽民工互助会";

  return (
    <Helmet>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={`${title} | ${siteTitle}`} />
      <meta property="og:description" content={description || defaultDesc} />
    </Helmet>
  );
};