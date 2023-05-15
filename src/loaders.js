import React from 'react';
import ContentLoader from 'react-content-loader';


const AvatarLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={60}
      height={48}
      viewBox="0 0 60 48"
      backgroundColor="#333"
      foregroundColor="#444"
      {...props}
    >
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
      <circle cx="86" cy="60" r="25" /> 
      <circle cx="108" cy="96" r="50" /> 
      <circle cx="98" cy="37" r="20" /> 
      <circle cx="157" cy="49" r="13" /> 
      <circle cx="24" cy="24" r="24" />
    </ContentLoader>
  )

  export {AvatarLoader};