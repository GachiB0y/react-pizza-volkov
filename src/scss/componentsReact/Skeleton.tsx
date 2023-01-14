import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="136" cy="129" r="125" />
    <rect x="0" y="267" rx="11" ry="11" width="280" height="21" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="417" rx="10" ry="10" width="95" height="30" />
    <rect x="123" y="411" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);
