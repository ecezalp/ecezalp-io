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
  '```';

export default noArgsConstructor;