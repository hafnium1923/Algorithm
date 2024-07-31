let [INFO, ...peoples] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

peoples = peoples
  .map((people, i) => {
    const [age, name] = people.split(" ");

    return {
      index: i,
      age: Number(age),
      name: name,
    };
  })
  .sort((a, b) => {
    if (a.age === b.age) return a.i - b.i;
    return a.age - b.age;
  })
  .map((people) => {
    return people.age + " " + people.name;
  });

console.log(peoples.join("\n"));
