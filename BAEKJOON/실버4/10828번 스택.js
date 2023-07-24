let [count, ...commands] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

count = Number(count);

const rslt = [];
const commandRslt = [];

const switchCommand = (command, num) => {
  switch (command) {
    case "push":
      num = Number(num);
      rslt.push(num);
      break;
    case "pop":
      const answer = rslt.pop();
      commandRslt.push(answer ? answer : -1);
      break;
    case "size":
      commandRslt.push(rslt.length);
      break;
    case "empty":
      commandRslt.push(rslt.length === 0 ? 1 : 0);
      break;
    case "top":
      commandRslt.push(rslt.length === 0 ? -1 : rslt[rslt.length - 1]);
      break;
  }
};

for (let i = 0; i < count; i++) {
  const [command, num] = commands[i].split(" ");
  switchCommand(command, num);
}

console.log(commandRslt.join("\n"));
