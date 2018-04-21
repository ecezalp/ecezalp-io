const noArgsConstructor = Object.assign({});

noArgsConstructor.text = "Recently I ran into an interesting problem. I wanted two classes with the same fields. Therefore, I created an abstract class, and extended that into my objects. It looked vaguely like this:\n" +
  "\n" +
  "```java\n" +
  "@AllArgsConstructor\n" +
  "abstract class Fruit {\n" +
  "\tprivate Integer id;\n" +
  "\tprivate String color;\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "```java\n" +
  "@Data\n" +
  "public class Apple extends Fruit {\n" +
  "\n" +
  "\t@Builder\n" +
  "\tpublic Apple (Integer id, String color){\n" +
  "\t\tsuper(id, color);\n" +
  "\t}\n" +
  "}\n" +
  "```\n" +
  "```java\n" +
  "@Data\n" +
  "public class Pear extends Fruit {\n" +
  "\n" +
  "\t@Builder\n" +
  "\tpublic Pear (Integer id, String color){\n" +
  "\t\tsuper(id, color);\n" +
  "\t}\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "Nothing too crazy. I also had a controller which had a method that accepted POST requests and converted the payload into an object. It looked vaguely like this:\n" +
  "\n" +
  "```\n" +
  "@RequestMapping(value = \"/apples/{id}\", method = POST)\n" +
  "public Apple update(@RequestBody Apple apple) {\n" +
  "\treturn fruitRepository.update(apple);\n" +
  "}\n" +
  "\n" +
  "```\n" +
  "\n" +
  "This worked beautifully according to my green API test, which called the API method with an Apple argument and checked that the mock repository has been called: \n" +
  "\n" +
  "```\n" +
  "@Test\n" +
  "public void update_callsRepository {\n" +
  "\tApple redApple = Apple.builder().id(1).color(\"red\").build();\n" +
  "\twhen(mockFruitRepository.update(redApple)).thenReturn(redApple);\n" +
  "\tassertEquals(api.update(redApple), redApple);\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "You might have noticed that in this test, I am directly calling the API method with the expected arguments. So far, this has not caused a problem for me, because I never really thought that my HttpConverter would fail at constructing objects. In retrospect, I should have called the API like this:\n" +
  "\n" +
  "```\n" +
  "helper.post(\"/fruits/\" + redApple.getId(), redApple, new MockHttpServletRequest())\n" +
  "```\n" +
  "..it would have saved a bit of trouble for me, because everything compiled and the app started as usual. Only when I got to trying to update an apple, that I received an ambiguous **400 Bad Request**. \n" +
  "\n" +
  "To me, **400**s are a bit unusual. Apparently, according to Wikipedia, this is a **400**: \"The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing). The error message in the payload was **HttpClientErrorException**, which is essentially the Spring way of saying the same thing. \n" +
  "\n" +
  "I decided to put debuggers around, since I was confident of my freshly refactored Apple and Pear objects. I quickly noticed that the failure happened before I could even hit the API method, which was also pretty strange. Logging the JavaScript object to the console right before the POST request, it looked as normal as possible, like **{color: \"red\", id: 1}**. I changed up my approach a little and used the type Object instead of Apple in the controller, receiving a properly filled out LinkedHashMap. \n" +
  "\n" +
  "At this point, I knew that there was something wrong with the Apple object, even though the Apple builder in the test worked perfectly. After thinking about it for a bit, I finally understood. \n" +
  "\n" +
  "How does Spring initialize objects under the hood, when a post request is made? I had never really thought about that before. Assuming that it might be receiving a LinkedHashMap from the request, it would make sense if it initialized an empty object of the appropriate type, looped over the fields to match them up, and returned the populated typed object. Therefore, a NoArgsConstructor for Spring is necessary!\n" +
  "\n" +
  "That's how my response became a 200, as the Apple object became the following.\n" +
  "\n" +
  "```java\n" +
  "@Data\n" +
  "@NoArgsConstructor\n" +
  "public class Apple extends Fruit {\n" +
  "\n" +
  "\t@Builder\n" +
  "\tpublic Apple (Integer id, String color){\n" +
  "\t\tsuper(id, color);\n" +
  "\t}\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "Long story short, always use @NoArgsConstructor if you would like to use the @RequestBody annotation!\n" +
  "\n" +
  "\n";

noArgsConstructor.title =  "@NoArgsConstructor for @RequestBody";

noArgsConstructor.shortText =   "Recently I ran into an interesting problem. I wanted two classes with the same fields. Therefore, I created an abstract class, and extended that into my objects. It looked vaguely like this:\n"

noArgsConstructor.tags = ["Java", "Object Oriented Programming", "API"];

export default noArgsConstructor;