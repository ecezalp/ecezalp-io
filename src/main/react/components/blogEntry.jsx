import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function BlogEntry({entry}) {

  return <ReactMarkdown>
    {entry}
  </ReactMarkdown>;
}