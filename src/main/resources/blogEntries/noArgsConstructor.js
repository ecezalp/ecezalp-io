const noArgsConstructor = '# Importance of @NoArgsConstructor in relation to @RequestBody\n' +
  '\n' +
  '\n' +
  'Recently I ran into an interesting problem. I wanted two classes with the same fields. Therefore, I created an abstract class, and extended that into my objects. It looked vaguely like this:\n' +
  '\n' +
  '```java\n' +
  '@AllArgsConstructor\n' +
  'abstract class Fruit {\n' +
  '\tprivate Integer id;\n' +
  '\tprivate String color;\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '```java\n' +
  '@Data\n' +
  'public class Apple extends Fruit {\n' +
  '\n' +
  '\t@Builder\n' +
  '\tpublic Apple (Integer id, String color){\n' +
  '\t\tsuper(id, color);\n' +
  '\t}\n' +
  '}\n' +
  '```\n' +
  '```java\n' +
  '@Data\n' +
  'public class Pear extends Fruit {\n' +
  '\n' +
  '\t@Builder\n' +
  '\tpublic Pear (Integer id, String color){\n' +
  '\t\tsuper(id, color);\n' +
  '\t}\n' +
  '}\n' +
  '```\n' +
  '\n' +
  'Nothing too crazy. I also had a controller which had a method that accepted POST requests and converted the payload into an object. It looked vaguely like this:\n' +
  '\n' +
  '```\n' +
  '@RequestMapping(value = "/apples/{id}", method = POST)\n' +
  'public Apple update(@RequestBody Apple apple) {\n' +
  '\treturn fruitRepository.update(apple);\n' +
  '}\n' +
  '\n' +
  '```\n' +
  '\n' +
  'This worked beautifully according to my green API test, which called the API method with an Apple argument and checked that the mock repository has been called: \n' +
  '\n' +
  '```\n' +
  '@Test\n' +
  'public void update_callsRepository {\n' +
  '\tApple redApple = Apple.builder().id(1).color("red").build();\n' +
  '\twhen(mockFruitRepository.create(redApple)).thenReturn(redApple);\n' +
  '\tassertEquals(api.update(redApple), redApple);\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '\n' +
  '# how I hooked up higlight.js to react\n' +
  'When I first started conceptualizing this blog, I had a few things in mind. From here on, I will refer to them as my blog principles: \n' +
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
  'I already had a markdown parser set up that I was using to render a test page, called [react-markdown](https://github.com/rexxars/react-markdown). The first thing I thought about doing was to search whether there is a react version of highlight.js, and I have found [react-highlight](https://github.com/akiran/react-highlight). You might guess what happened next:\n' +
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
  '}';

export default noArgsConstructor;