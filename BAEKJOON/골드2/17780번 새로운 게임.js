let [NK, ...info] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = NK.split(" ").map(Number);

const graph = [];

const game = Array.from({ length: N }, () => {
  return Array.from({ length: N }, () => []);
});
let players = [];

info.map((list, i) => {
  if (i < N) {
    graph.push(list.split(" ").map(Number));
  } else {
    const [row, col, direction] = list.split(" ").map(Number);
    game[row - 1][col - 1].push(i - N + 1);
    players.push({
      num: i - N + 1,
      row: row - 1,
      col: col - 1,
      direction: direction,
      floor: 1,
    }); //n번말, 행, 열, 방향, 층
  }
});

const DIRECTION = {
  1: [0, 1],
  2: [0, -1],
  3: [-1, 0],
  4: [1, 0],
};

playGame();

function movePlayer(index) {
  let { row, col, direction } = players[index];
  let isContinue = true;

  //다음이동이 그래프밖이거나, 파란색이면 방향바꾸기
  if (
    row + DIRECTION[direction][0] < 0 ||
    N <= row + DIRECTION[direction][0] ||
    col + DIRECTION[direction][1] < 0 ||
    N <= col + DIRECTION[direction][1] ||
    graph[row + DIRECTION[direction][0]][col + DIRECTION[direction][1]] === 2
  ) {
    direction = reverseDirection(direction);
    players[index].direction = direction;
  }

  const nextRow = row + DIRECTION[direction][0];
  const nextCol = col + DIRECTION[direction][1];

  //다음이동이 그래프밖이거나, 파란색이면 이동하지 않고 return
  if (
    nextRow < 0 ||
    nextRow >= N ||
    nextCol < 0 ||
    nextCol >= N ||
    graph[nextRow][nextCol] === 3
  ) {
    return true;
  }

  //다음이동이 하얀색일 때
  if (graph[nextRow][nextCol] === 0) {
    const movingPlayers = game[row][col]; // 이동하는 플레이어들
    game[nextRow][nextCol].push(...movingPlayers); // 플레이어 이동
    game[row][col] = []; // 원래칸 비우기
    game[nextRow][nextCol].forEach((playerNum, index) => {
      players[playerNum - 1].row = nextRow;
      players[playerNum - 1].col = nextCol;
      players[playerNum - 1].floor = index + 1;
    }); // 플레이어 정보 다시 할당

    if (game[nextRow][nextCol].length >= 4) isContinue = false;
  }

  //다음이동이 빨간색일 때
  if (graph[nextRow][nextCol] === 1) {
    const movingPlayers = game[row][col].reverse(); // 이동하는 플레이어들
    game[nextRow][nextCol].push(...movingPlayers); // 플레이어 이동
    game[row][col] = []; // 원래칸 비우기
    game[nextRow][nextCol].forEach((playerNum, index) => {
      players[playerNum - 1].row = nextRow;
      players[playerNum - 1].col = nextCol;
      players[playerNum - 1].floor = index + 1;
    }); // 플레이어 정보 다시 할당

    if (game[nextRow][nextCol].length >= 4) isContinue = false;
  }
  return isContinue;
}

function playGame() {
  let count = 0;
  let isContinue = true;
  while (isContinue) {
    if (count > 1000) {
      isContinue = false;
      break;
    }

    count++;
    players.forEach((player, index) => {
      if (player.floor === 1) {
        let flag = movePlayer(index);

        if (flag === false) {
          isContinue = false;
        }
      }
    });

    // console.log(players);
  }

  if (count <= 1000) {
    console.log(count);
  } else {
    console.log(-1);
  }
}

function reverseDirection(direction) {
  switch (direction) {
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 4;
    case 4:
      return 3;
  }
}
