const reduceComprehensive = Object.assign({});

reduceComprehensive.text = 'Today I want to briefly talk about the **reduce** function in JavaScript, and how it can be used in creative ways. \n' +
  '\n' +
  '**reduce** is *fold* in functional programming. It is a [higher order function](link is here) that takes a function and a list, and calls the function on each node of the list while accumulating the return. \n' +
  '\n' +
  'In JavaScript, **reduce** is always called on an array, and it processes each element with a callback. The arguments of the callback are always the same:\n' +
  '\n' +
  '1. Accumulator (the accumulation of return values, to be modified at each call of the callback)\n' +
  '2. Current Value (the element of the array that the callback is being called on)\n' +
  '3. Index (the index of current value in the array)\n' +
  '4. Array (the array being processed)\n' +
  '\n' +
  'In addition to the callback\'s arguments, there is a second argument to the **reduce** function itself, which is the seed. The seed is the starting value of the accumulator. \n' +
  '\n' +
  '## number seed\n' +
  '\n' +
  'The simplest example of **reduce** is as follows:\n' +
  '\n' +
  '```javascript\n' +
  '[1, 2, 3, 4].reduce((accumulator, element) => accumulator + element)\n' +
  '// 10\n' +
  '```\n' +
  '\n' +
  'The same example with a seed would look like this: \n' +
  '\n' +
  '```javascript\n' +
  '[1, 2, 3, 4].reduce((accumulator, element) => accumulator + element, 15)\n' +
  '// 25\n' +
  '```\n' +
  '\n' +
  'A number seed can be utilized in other ways as well, as long as we are attempting to sum (or mathematically process) numbers. For example, we can calculate the daily engineer hours in an organization:\n' +
  '\n' +
  '```javascript\n' +
  'let allTeams = [\n' +
  '\t{team: "dev", noOfEngineers: 7, hoursPerWeek: 35},\n' +
  '\t{team: "qa", noOfEngineers: 2, hoursPerWeek: 30},\n' +
  '\t{team: "devOps", noOfEngineers: 3, hoursPerWeek: 40},\n' +
  '];\n' +
  '\n' +
  'allTeams.reduce((accumulator, team) => \n' +
  'accumulator + (team.noOfEngineers * team.hoursPerWeek)\n' +
  ', 0)\n' +
  '// 425\n' +
  '\n' +
  '```\n' +
  '\n' +
  '\n' +
  '## array seed\n' +
  '\n' +
  'I have first discovered the usefulness of **reduce** when I wanted to filter and map an array at the same time. Say I have an array of dirty and mixed produce, and I want to have washed fruits. \n' +
  '\n' +
  '```javascript\n' +
  'let produce = [\n' +
  '\t{name: "apple", type: "fruit"}, \n' +
  '\t{name: "eggplant", type: "vegetable"}, \n' +
  '\t{name: "pear", type: "fruit"}\n' +
  '];\n' +
  '\n' +
  'produce.reduce((acc, product) => {\n' +
  '\tif(product.type === "fruit") {\n' +
  '\t\tacc.push(Object.assign({}, product, {shiny: true}));\n' +
  '\t}\n' +
  '\treturn acc;\n' +
  '}, []);\n' +
  '// [{name: "apple", type: "fruit", shiny: true}, {name: "pear", type: "fruit", shiny: true}]\n' +
  '```\n' +
  '\n' +
  'an important point here is to not forget returning the accumulator; simply pushing to it does not suffice. If we just push and not return anything, there will be no return value of the inner function, and the accumulator will become undefined. \n' +
  '\n' +
  'There are many other ways to utilize the reduce function with an array seed. A few potential uses can be flattening arrays:\n' +
  '\n' +
  '```javascript\n' +
  '[[1], [2, "hello"], [{name: "Ece"}]].reduce((acc, element) => \n' +
  '\tacc.concat(element), []);\n' +
  '// [1, 2, "hello", {name: "Ece"}]\n' +
  '```\n' +
  '\n' +
  'Instead of concat, we can use the spread operator as well: \n' +
  '\n' +
  '```javascript\n' +
  'let people = [\n' +
  '\t{name: "Ece", pets: ["Oniks", "Ceviz"]}, \n' +
  '\t{name: "WonJun", pets: ["Yeon", "Tan", "Altin"]}\n' +
  '];\n' +
  '\n' +
  'people.reduce((acc, person) => [...acc, ...person.pets], []);\n' +
  '// ["Oniks", "Ceviz", "Yeon", "Tan", "Altin"];\n' +
  '```\n' +
  '\n' +
  '## object seed\n' +
  '\n' +
  'The object seed is fantastic for accumulating data about an array of nested objects. It is very useful as a building block in algorithm problems. In this example, we can count which name is the most popular within a group of people.\n' +
  '\n' +
  '\n' +
  '```javascript\n' +
  'let people = [\n' +
  '\t{name: \'Ali\', age: 10}, \n' +
  '\t{name: \'Hans\', age: 22}, \n' +
  '\t{name: \'Xeo\', age: 14}, \n' +
  '\t{name: \'Laura\', age: 15}, \n' +
  '\t{name: \'Ali\', age: 12}\n' +
  '];\n' +
  '\n' +
  'let countedNames = people.reduce((acc, person) => { \n' +
  '\tacc[person.name] = person.name in acc ? \n' +
  '    \tacc[person.name] + 1 : \n' +
  '    \t1;\n' +
  '  \treturn acc;\n' +
  '}, {})\n' +
  '// countedNames = {Ali: 2, Hans: 1, Xeo: 1, Laura: 1}\n' +
  '```\n' +
  '\n' +
  '\n' +
  '## function seed\n' +
  '\n' +
  'A function seed is great to create a **pipe**, which is a way to run several functions on data in a particular order. The best example I have found on this was on Mozilla documentation, I am copying it here.\n' +
  '\n' +
  '```javascript\n' +
  '// Building-blocks to use for composition\n' +
  'const double = x => x + x;\n' +
  'const triple = x => 3 * x;\n' +
  'const quadruple = x => 4 * x;\n' +
  '\n' +
  '// Function composition enabling pipe functionality\n' +
  'const pipe = (...functions) => input => [...functions].reduce(\n' +
  '    (acc, fn) => fn(acc),\n' +
  '    input\n' +
  ');\n' +
  '\n' +
  '// Composed functions for multiplication of specific values\n' +
  'const multiply6 = pipe(double, triple);\n' +
  'const multiply9 = pipe(triple, triple);\n' +
  'const multiply16 = pipe(quadruple, quadruple);\n' +
  'const multiply24 = pipe(double, triple, quadruple);\n' +
  '\n' +
  '// Usage\n' +
  'multiply6(6); // 36\n' +
  'multiply9(9); // 81\n' +
  'multiply16(16); // 256\n' +
  'multiply24(10); // 240 \n' +
  '```\n' +
  '\n' +
  'Note the part where it says "Function composition enabling pipe functionality". You will see that there are two => signs one after the other, which might seem a bit confusing. What is happening there is called **currying**. I will be attaching the link here once I cover that topic. \n' +
  '\n' +
  '\n' +
  '## promise seed\n' +
  '\n' +
  'TODO\n' +
  '\n' +
  '```javascript\n' +
  'var readFiles = function(files) {\n' +
  '  return files.reduce(function(p, file) {\n' +
  '             return p.then(function(){ return readFile(file); });\n' +
  '         },Q()); // initial\n' +
  '};\n' +
  '```\n' +
  '\n' +
  '\n' +
  '\n' +
  '## using the third *(index)* and fourth *(array)* arguments\n' +
  '\n' +
  'You might have noticed that almost always, we are using the first two arguments of **reduce**. However, there are cases were the other ones also come in handy. For instance, calculating averages:\n' +
  '\n' +
  '```javascript\n' +
  'let people, averageAge;\n' +
  '\n' +
  'people = [{name: "Ece", age: 27}, {name: "Irem", age: 22}, {name: "Gunnur", age: 56}];\n' +
  '\n' +
  'averageAge = people.reduce((acc, element, index, array) => {\n' +
  '\tacc += element.age;\n' +
  '\treturn index === array.length - 1 ? \n' +
  '\t\tacc / array.length :\n' +
  '\t\tacc;\n' +
  '}, 0);\n' +
  '// 35\n' +
  '```\n';

reduceComprehensive.title = 'a comprehensive guide on .reduce()';

reduceComprehensive.shortText = 'Today I want to briefly talk about the **reduce** function in JavaScript, and how it can be used in creative ways. \n' +
  '\n' +
  '**reduce** is *fold* in functional programming. It is a [higher order function](link is here) that takes a function and a list, and calls the function on each node of the list while accumulating the return. \n' +
  '\n' +
  'In JavaScript, **reduce** is always called on an array, and it processes each element with a callback.';

reduceComprehensive.tags = ["Javascript", "Functional Programming"];

export default reduceComprehensive;