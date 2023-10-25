let [inputs, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const order = [];
const answer = [];
function MakeAFood(action, actionNums) {
  if (action === "order") {
    const [table, time] = actionNums.map(Number);
    order.push({
      table,
      time,
    });
  }
  if (action === "complete") {
    const tableNum = Number(actionNums[0]);
    const index = order.findIndex((item) => item.table === tableNum);

    order.splice(index, 1);
  }
  if (action === "sort") {
    order.sort((a, b) => {
      if (a.time === b.time) return a.table - b.table;
      return a.time - b.time;
    });
  }
}

function printOrder() {
  if (order.length === 0) {
    answer.push("sleep");
    return;
  }
  answer.push(
    order
      .map((item) => {
        return item.table;
      })
      .join(" ")
  );
}

commends.forEach((commend) => {
  const [action, ...actionNums] = commend.split(" ");
  MakeAFood(action, actionNums);
  printOrder();
});

console.log(answer.join("\n"));
