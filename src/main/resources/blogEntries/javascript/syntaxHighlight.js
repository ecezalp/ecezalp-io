const syntaxHighlight = Object.assign({});

syntaxHighlight.text = 'When I first started conceptualizing this blog, I had a few things in mind. From here on, I will refer to them as my blog principles: \n' +
  '\n' +
  '1. I will use React.js\n' +
  '2. I will write my entries in MacDown, my preferred markdown editor\n' +
  '3. I will use code blocks in my entries\n' +
  '4. My code blocks will be in different languages.\n' +
  '\n' +
  'However, I quickly noticed that markdown code blocks had absolutely no syntax highlighting. This was slightly frustrating for me, since I find syntax highlighting to be useful. In [My IntelliJ Settings](/myIntelliJSettings) you will see that I highlight my variables in addition to the regular language highlighting that comes with IntelliJ. \n' +
  '\n' +
  'I knew that GitHub blogs have highlight support for markdown, but I knew that I wanted to code and host ecezalp.io by myself. I searched whether "Github flavored Markdown" is open source, but it looked like that wasn\'t the case.\n' +
  '\n' +
  'Given my blog principles, there were a few things I thought that I could do. \n' +
  '\n' +
  '1. Find a markdown parser for React that has built in language-agnostic highlight support.\n' +
  '2. Find a simple markdown parser, and utilize a different library to put on the highlights.\n' +
  '3. Use the HTML of markdown that MacDown gives me, and find a library that highlights the code blocks HTML.\n' +
  '\n' +
  'The very first library I found was [highlight.js](https://highlightjs.org/), and I loved it! It came in so many different colors, and it supported more languages than I could ever use. \n' +
  '\n' +
  'I already had a markdown parser set up that I was using to render a test page, called [react-markdown](https://github.com/rexxars/react-markdown). The test page I mentioned is a javascript file that exports a constant that contains the stringified markdown. \n' +
  '\n' +
  'The first thing I thought about doing was to search whether there is a react version of highlight.js, and I have found [react-highlight](https://github.com/akiran/react-highlight). You might guess what happened next:\n' +
  '\n' +
  '```\n' +
  'import React from \'react\';\n' +
  'import ReactMarkdown from \'react-markdown\';\n' +
  'import Highlight from \'react-highlight\';\n' +
  '\n' +
  'import testBlogEntry from "../resources/blogEntries/testBlogEntry";\n' +
  '\n' +
  'export default function App() {\n' +
  '  return <Highlight>\n' +
  '    <ReactMarkdown>\n' +
  '      {testBlogEntry}\n' +
  '    </ReactMarkdown>\n' +
  '  </Highlight>;\n' +
  '}\n' +
  '```\n' +
  '\n' +
  'Guess what... it worked! in fact, it worked a little too well. The code blocks got beautifully highlighted according to their language, but so did the rest of the text, arbitrarily! It wasn\'t exactly what I wanted. Upon a second look, react-highlight acted in such a way that it accepted a simple string a child, and highlighted everything inside. Now, I could potentially parse my testBlogEntry with a smart RegEx and make sure that it surrounded only the code blocks. However, I thought that this was unnecessary, and decided to abandon both react-highlight.\n' +
  '\n' +
  'I strongly considered abandoning react-markdown as well. At the end of the day, I wasn\'t grabbing this HTML from any shady source. It was the HTML that I wrote, kind of, and I was sure that it was absolutely safe. Therefore, I thougt that I could dangerouslySetinnerHTML onto a div and process it with the original highlight.js library. While it is a slightly less React-y way of doing things, I thought that these decisions were appropriate given that using the original library is better than using a random wrapper by a different developer. However, I then remembered that I have already a beautiful Webpack setup through gulp.js (discussed in detail [here](/my-gulp-config)), and I didn\'t want to bother adding in a HTML loader which I needed if I wanted to dynamically import the HTML files into my React setup. \n' +
  '\n' +
  'Well, it is always possible to grab the **document** in React. I have previously grabbed the **document** to remove an unwanted node of an external component in  **ComponentDidMount** lifecycle, and I thought that I could do something similar. \n' +
  '\n' +
  'I imported the highlight.js library by running **npm install --save highlight.js** and imported that directly into the React side of my code. I wasn\'t sure whether it was going to work but I thought that I would give it a shot. The usage page in the documentation mentioned that there is a **initHighlightingOnLoad** method, and I called it in the **ComponentDidMount** lifecycle. It worked beatifully!\n' +
  '\n' +
  '\n' +
  '```\n' +
  'import React from \"react\";\n' +
  'import ReactMarkdown from \"react-markdown\";\n' +
  'import hljs from \"highlight.js\";\n' +
  '\n' +
  'import testBlogEntry from "../resources/blogEntries/testBlogEntry";\n' +
  '\n' +
  'export default class App extends React.Component {\n' +
  '\n' +
  '  componentDidMount() {\n' +
  '   hljs.initHighlightingOnLoad();\n' +
  '  }\n' +
  '\n' +
  '  render() {\n' +
  '    return <ReactMarkdown>\n' +
  '      {testBlogEntry}\n' +
  '    </ReactMarkdown>;\n' +
  '  }\n' +
  '}\n' +
  '```\n' +
  '\n' +
  'By the way, the color scheme I am currently using is called Gruvbox Dark. I incorporated the theme into my code by including \n' +
  '\n' +
  '```\n' +
  '@import "../../../node_modules/highlight.js/styles/gruvbox-dark.css";\n' +
  '``` \n' +
  '\n' +
  'to my main.scss file, which is the entry point of my styles. I believe that it would be possible to copy that file into my styles directory and edit it if I had wanted to, but for now I am happy with the original colors. In the future, if I consider giving my readers a button to click to switch up the colors of my site, I will probably get multiple files that way and consider manually editing them, especially since they are very small at 108 lines each. ';

syntaxHighlight.title = 'syntax highlighting for Markdown in React';

syntaxHighlight.shortText = 'When I first started conceptualizing this blog, I had a few things in mind. From here on, I will refer to them as my blog principles: \n' +
  '\n' +
  '1. I will use React.js\n' +
  '2. I will write my entries in MacDown, my preferred markdown editor\n' +
  '3. I will use code blocks in my entries\n' +
  '4. My code blocks will be in different languages.\n';

syntaxHighlight.tags = ["React"];

export default syntaxHighlight;