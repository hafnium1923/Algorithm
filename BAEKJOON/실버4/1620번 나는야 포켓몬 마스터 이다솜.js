let [number, ...string] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [index, _] = number.split(" ").map(Number);
const pokemon = string.slice(0, index);
const pokemonMap = new Map();

pokemon.map((poke, index) => {
  pokemonMap.set(poke, index);
});

const question = string.slice(index);

const answers = [];

question.map((command) => {
  if (Number(command)) answers.push(pokemon[Number(command) - 1]);
  else answers.push(pokemonMap.get(command) + 1);
});

console.log(answers.join("\n"));
