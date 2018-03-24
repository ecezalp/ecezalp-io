# Importance of @NoArgsConstructor in relation to @RequestBody


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
	when(mockFruitRepository.create(redApple)).thenReturn(redApple);
	assertEquals(api.update(redApple), redApple);
}
```