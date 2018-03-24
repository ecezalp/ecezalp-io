import React from 'react';
import ReactMarkdown from 'react-markdown';
import Highlight from 'react-highlight';

import noArgsConstructor from "../resources/blogEntries/noArgsConstructor";

export default function App({props}) {

  return <Highlight><ReactMarkdown>{noArgsConstructor}</ReactMarkdown></Highlight>;
}