const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

window.onload = () => {
  let nick = document.getElementById("name");
  let date = document.getElementById("date");
  let point = document.getElementById("point");

  let userId = localStorage.getItem("user_id");
  let myPoint = JSON.parse(localStorage.getItem("my_point")).balance;

  function formatCreatedDate(createdDate) {
    // 날짜 문자열을 분해
    const [day, month, year] = createdDate.split("/").map(Number);

    // 월 이름 배열
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // 날짜 서수 접미사 함수
    function getOrdinalSuffix(n) {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    // 월 이름과 서수 접미사 적용
    const monthName = monthNames[month - 1];
    const dayWithSuffix = getOrdinalSuffix(day);

    return `Been our mate from ${monthName} ${dayWithSuffix} ${year}`;
  }

  axios
    .get(`${SERVER_HOST}/user/${1}`)
    .then((result) => {
      console.log(result.data);
      nick.innerHTML = result.data.name;
      date.innerHTML = formatCreatedDate(result.data.createdDate);
    })
    .catch((err) => {});

  axios.get(`${SERVER_HOST}/point/${1}`).then((result) => {
    point.innerHTML = result.data.balance;
  });
};

function logout() {
  localStorage.removeItem("user_id");
  location.href = "./login.html";
}
