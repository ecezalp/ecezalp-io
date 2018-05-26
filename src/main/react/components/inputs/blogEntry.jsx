import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function BlogEntry({entry}) {

  const rendering = () => {
   return "rendering ".repeat(1000);
  };

  return <ReactMarkdown>
    {entry ? entry : rendering()}
  </ReactMarkdown>;
}