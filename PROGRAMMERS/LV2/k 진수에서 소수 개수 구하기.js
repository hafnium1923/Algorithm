function solution(n, k) {
  var answer = 0;
  const numbers = numberSystem(n, k);
  answer = numbers.reduce((acc, crr) => {
    if (isPrime(crr)) return acc + 1;
    return acc;
  }, 0);

  return answer;
}

function isPrime(n) {
  if (n === 2 || n === 3) return true;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
function numberSystem(n, k) {
  let a = "";
  while (n > 0) {
    a += n % k;
    n = Math.floor(n / k);
  }

  return a
    .split("")
    .reverse()
    .join("")
    .split("0")
    .map(Number)
    .filter((item) => item > 1);
}
