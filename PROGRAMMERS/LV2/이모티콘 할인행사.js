//중복 순열

function solution(users, emoticons) {
  var answer = [];
  const percents = [10, 20, 30, 40];
  const totalCases = [];

  function permutation(permu) {
    if (permu.length === emoticons.length) {
      totalCases.push(permu);
      return;
    }

    percents.map((percent) => {
      permutation([...permu, percent]);
    });
  }

  permutation([]);

  const result = {
    plus: 0,
    totalMoney: 0,
  };

  totalCases.map((totalCase) => {
    const userInfos = Array.from({ length: users.length }, (_, index) => {
      return {
        percent: users[index][0],
        money: users[index][1],
        totalMoney: 0,
      };
    });

    totalCase.map((percent, index) => {
      const price = (emoticons[index] * (100 - percent)) / 100;

      userInfos.map((user) => {
        if (user.percent <= percent) {
          user.totalMoney += price;
        }
      });
    });

    let plus = 0;
    let totalMoney = 0;

    userInfos.map((user) => {
      if (user.money <= user.totalMoney) {
        plus++;
        return;
      }
      totalMoney += user.totalMoney;
    });

    if (result.plus < plus) {
      result.plus = plus;
      result.totalMoney = totalMoney;
    }

    if (result.plus === plus) {
      result.totalMoney =
        result.totalMoney > totalMoney ? result.totalMoney : totalMoney;
    }
  });

  answer = [result.plus, result.totalMoney];
  return answer;
}
