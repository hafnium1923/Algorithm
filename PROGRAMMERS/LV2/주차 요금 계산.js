function solution(fees, records) {
  var answer = [];

  let totalCar = new Set(
    records.map((record) => {
      const [_, carNum, __] = record.split(" ");
      return carNum;
    })
  );
  totalCar = Array.from(totalCar);

  let carInfos = Array.from({ length: totalCar.length }, (_, i) => {
    return {
      carNum: totalCar[i],
      start: 0,
      end: 0,
      time: 0,
      fee: 0,
    };
  });

  carInfos.sort((a, b) => {
    return Number(a.carNum) - Number(b.carNum);
  });

  records.forEach((record) => {
    const [time, carNum, info] = record.split(" ");
    const [H, M] = time.split(":").map(Number);
    const minute = H * 60 + M;

    const carIndex = carInfos.findIndex((info) => info.carNum === carNum);
    if (info === "IN") {
      carInfos[carIndex].start = minute;
    }
    if (info === "OUT") {
      carInfos[carIndex].time += minute - carInfos[carIndex].start;
      carInfos[carIndex].start = 0;
    }
  });

  carInfos.forEach((carInfo) => {
    if (
      (carInfo.start === 0 && carInfo.time === 0) ||
      (carInfo.start !== 0 && carInfo.end === 0)
    ) {
      carInfo.time += 23 * 60 + 59 - carInfo.start;
    }
    if (carInfo.time <= fees[0]) {
      carInfo.fee = fees[1];
      return;
    }

    const inTime = Math.ceil((carInfo.time - fees[0]) / fees[2]);
    carInfo.fee = fees[1] + inTime * fees[3];
  });

  answer = carInfos.map((info) => info.fee);
  return answer;
}
