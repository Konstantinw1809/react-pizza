import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-1" y="281" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="321" rx="10" ry="10" width="280" height="88" />
    <rect x="88" y="461" rx="0" ry="0" width="0" height="1" />
    <rect x="1" y="427" rx="10" ry="10" width="80" height="30" />
    <rect x="130" y="416" rx="30" ry="30" width="150" height="45" />
    <circle cx="140" cy="127" r="125" />
  </ContentLoader>
);

export default Skeleton;
