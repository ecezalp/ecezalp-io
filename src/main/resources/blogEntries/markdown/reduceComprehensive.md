# js reduce with different kinds of seeds

Today I want to briefly talk about the **reduce** function in JavaScript, and how it can be used in creative ways. 

**reduce** is *fold* in functional programming. It is a [higher order function](link is here) that takes a function and a list, and calls the function on each node of the list while accumulating the return. 

In JavaScript, **reduce** is always called on an array, and it processes each element with a callback. The arguments of the callback are always the same:

1. Accumulator (the accumulation of return values, to be modified at each call of the callback)
2. Current Value (the element of the array that the callback is being called on)
3. Index (the index of current value in the array)
4. Array (the array being processed)

In addition to the callback's arguments, there is a second argument to the **reduce** function itself, which is the seed. The seed is the starting value of the accumulator. 

## Number seed

The simplest example of **reduce** is as follows:

```javascript
[1, 2, 3, 4].reduce((accumulator, element) => accumulator + element)
// 10
```

The same example with a seed would look like this: 

```javascript
[1, 2, 3, 4].reduce((accumulator, element) => accumulator + element, 15)
// 25
```

A number seed can be utilized in other ways as well, as long as we are attempting to sum (or mathematically process) numbers. For example, we can calculate the daily engineer hours in an organization:

```javascript
let allTeams = [
	{team: "dev", noOfEngineers: 7, hoursPerWeek: 35},
	{team: "qa", noOfEngineers: 2, hoursPerWeek: 30},
	{team: "devOps", noOfEngineers: 3, hoursPerWeek: 40},
];

allTeams.reduce((accumulator, team) => 
accumulator + (team.noOfEngineers * team.hoursPerWeek)
, 0)
// 425

```


## Array seed

I have first discovered the usefulness of **reduce** when I wanted to filter and map an array at the same time. Say I have an array of dirty and mixed produce, and I want to have washed fruits. 

```javascript
let produce = [
	{name: "apple", type: "fruit"}, 
	{name: "eggplant", type: "vegetable"}, 
	{name: "pear", type: "fruit"}
];

produce.reduce((acc, product) => {
	if(product.type === "fruit") {
		acc.push(Object.assign({}, product, {shiny: true}));
	}
	return acc;
}, []);
// [{name: "apple", type: "fruit", shiny: true}, {name: "pear", type: "fruit", shiny: true}]
```

an important point here is to not forget returning the accumulator; simply pushing to it does not suffice. If we just push and not return anything, there will be no return value of the inner function, and the accumulator will become undefined. 

There are many other ways to utilize the reduce function with an array seed. A few potential uses can be flattening arrays:

```javascript
[[1], [2, "hello"], [{name: "Ece"}]].reduce((acc, element) => acc.concat(element), []);
// [1, 2, "hello", {name: "Ece"}]
```

Instead of concat, we can use the spread operator as well: 

```javascript
let people = [{name: "Ece", pets: ["Oniks", "Ceviz"]}, {name: "WonJun", pets: ["Yeon", "Tan", "Altin"]}];

people.reduce((acc, person) => [...acc, ...person.pets], []);
// ["Oniks", "Ceviz", "Yeon", "Tan", "Altin"];
```

## function seed





## using the third *(index)* and fourth *(array)* arguments

You might have noticed that almost always, we are using the first two arguments of **reduce**. However, there are cases were the other ones also come in handy. For instance, calculating averages:

```javascript
let people, averageAge;

people = [{name: "Ece", age: 27}, {name: "Irem", age: 22}, {name: "Gunnur", age: 56}];

averageAge = people.reduce((acc, element, index, array) => {
	acc += element.age;
	return index === array.length - 1 ? 
		acc / array.length :
		acc;
}, 0);
// 35
```
