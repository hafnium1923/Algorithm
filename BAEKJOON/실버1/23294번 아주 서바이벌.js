let [inputs, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [_, peopleNum] = inputs.split(" ").map(Number);

const playerInfos = Array.from({ length: peopleNum }, (_, index) => {
  return {
    name: [index],
    nowLocate: 1,
    iteams: [],
  };
});

const cheatingLogs = [];
const cheatingPlayers = [];

function GameAction(logNum, playerIndex, action, actionResult) {
  if (action === "M") {
    playerInfos[playerIndex - 1].nowLocate = Number(actionResult[0]);
    return;
  }

  if (action === "F") {
    const iteamNumber = Number(actionResult[0]);
    if (playerInfos[playerIndex - 1].nowLocate !== iteamNumber) {
      cheatingLogs.push(logNum);
    }
    playerInfos[playerIndex - 1].iteams.push(iteamNumber);
    return;
  }

  if (action === "A") {
    const attectedPlayerIndex = Number(actionResult[0]);
    if (
      playerInfos[playerIndex - 1].nowLocate !==
      playerInfos[attectedPlayerIndex - 1].nowLocate
    ) {
      cheatingLogs.push(logNum);
      if (!cheatingPlayers.includes(playerIndex))
        cheatingPlayers.push(playerIndex);
    }
    return;
  }

  if (action === "C") {
    const [item1, item2] = actionResult.map(Number);

    const iteam1Index = playerInfos[playerIndex - 1].iteams.findIndex(
      (item) => item === item1
    );

    if (iteam1Index !== -1) {
      playerInfos[playerIndex - 1].iteams.splice(iteam1Index, 1);
    }

    const iteam2Index = playerInfos[playerIndex - 1].iteams.findIndex(
      (item) => item === item2
    );

    if (iteam2Index !== -1) {
      playerInfos[playerIndex - 1].iteams.splice(iteam2Index, 1);
    }

    if (iteam1Index === -1 || iteam2Index === -1) {
      cheatingLogs.push(logNum);
    }
    return;
  }
}

commends.forEach((commend) => {
  let [logNum, player, action, ...actionResult] = commend.split(" ");
  logNum = Number(logNum);
  player = Number(player);

  GameAction(logNum, player, action, actionResult);
});

const answer = [];
answer.push(cheatingLogs.length);
if (cheatingLogs.length !== 0) answer.push(cheatingLogs.join(" "));
answer.push(cheatingPlayers.length);
cheatingPlayers.sort((a, b) => a - b);
if (cheatingPlayers.length !== 0) answer.push(cheatingPlayers.join(" "));

console.log(answer.join("\n"));
