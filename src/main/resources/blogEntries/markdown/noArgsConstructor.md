# @NoArgsConstructor for @RequestBody


Recently I ran into an interesting problem. I wanted two classes with the same fields. Therefore, I created an abstract class, and extended that into my objects. It looked vaguely like this:

```java
@AllArgsConstructor
abstract class Fruit {
	private Integer id;
	private String color;
}
```

```java
@Data
public class Apple extends Fruit {

	@Builder
	public Apple (Integer id, String color){
		super(id, color);
	}
}
```
```java
@Data
public class Pear extends Fruit {

	@Builder
	public Pear (Integer id, String color){
		super(id, color);
	}
}
```

Nothing too crazy. I also had a controller which had a method that accepted POST requests and converted the payload into an object. It looked vaguely like this:

```
@RequestMapping(value = "/apples/{id}", method = POST)
public Apple update(@RequestBody Apple apple) {
	return fruitRepository.update(apple);
}

```

This worked beautifully according to my green API test, which called the API method with an Apple argument and checked that the mock repository has been called: 

```
@Test
public void update_callsRepository {
	Apple redApple = Apple.builder().id(1).color("red").build();
	when(mockFruitRepository.update(redApple)).thenReturn(redApple);
	assertEquals(api.update(redApple), redApple);
}
```

You might have noticed that in this test, I am directly calling the API method with the expected arguments. So far, this has not caused a problem for me, because I never really thought that my HttpConverter would fail at constructing objects. In retrospect, I should have called the API like this:

```
helper.post("/fruits/" + redApple.getId(), redApple, new MockHttpServletRequest())
```
..it would have saved a bit of trouble for me, because everything compiled and the app started as usual. Only when I got to trying to update an apple, that I received an ambiguous **400 Bad Request**. 

To me, **400**s are a bit unusual. Apparently, according to Wikipedia, this is a **400**: "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing). The error message in the payload was **HttpClientErrorException**, which is essentially the Spring way of saying the same thing. 

I decided to put debuggers around, since I was confident of my freshly refactored Apple and Pear objects. I quickly noticed that the failure happened before I could even hit the API method, which was also pretty strange. Logging the JavaScript object to the console right before the POST request, it looked as normal as possible, like **{color: "red", id: 1}**. I changed up my approach a little and used the type Object instead of Apple in the controller, receiving a properly filled out LinkedHashMap. 

At this point, I knew that there was something wrong with the Apple object, even though the Apple builder in the test worked perfectly. After thinking about it for a bit, I finally understood. 

How does Spring initialize objects under the hood, when a post request is made? I had never really thought about that before. Assuming that it might be receiving a LinkedHashMap from the request, it would make sense if it initialized an empty object of the appropriate type, looped over the fields to match them up, and returned the populated typed object. Therefore, a NoArgsConstructor for Spring is necessary!

That's how my response became a 200, as the Apple object became the following.

```java
@Data
@NoArgsConstructor
public class Apple extends Fruit {

	@Builder
	public Apple (Integer id, String color){
		super(id, color);
	}
}
```

Long story short, always use @NoArgsConstructor if you would like to use the @RequestBody annotation!


