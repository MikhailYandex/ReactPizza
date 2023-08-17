import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
		className="pizza-block"
    speed={2}
    width={286}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="129" cy="125" r="125" /> 
    <rect x="1" y="264" rx="7" ry="7" width="260" height="25" /> 
    <rect x="-2" y="306" rx="7" ry="7" width="260" height="70" /> 
    <rect x="-2" y="398" rx="6" ry="6" width="95" height="30" /> 
    <rect x="107" y="391" rx="31" ry="31" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
