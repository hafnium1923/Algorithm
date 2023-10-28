function solution(id_list, report, k) {
  var answer = Array.from({ length: id_list.length }, () => 0);

  const reportResult = Array.from({ length: id_list.length }, (_, index) => {
    return {
      user: id_list[index],
      reportNum: 0,
      reportUser: [],
    };
  });

  report.map((report) => {
    const [user1, user2] = report.split(" ");
    const reportIndex = reportResult.findIndex(
      (result) => result.user === user2
    );
    const isReported = reportResult[reportIndex].reportUser.find(
      (user) => user === user1
    );

    if (!isReported) {
      reportResult[reportIndex].reportNum += 1;
      reportResult[reportIndex].reportUser.push(user1);
    }
  });

  reportResult.map((reportResult) => {
    if (reportResult.reportNum < k) return;

    reportResult.reportUser.map((user) => {
      const index = id_list.findIndex((id) => id === user);
      index !== -1 && answer[index]++;
    });
  });

  return answer;
}
