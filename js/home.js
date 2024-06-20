const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

let menuBtn = Array.from(document.querySelectorAll(".menu_bar input"));
let menuStatics = Array.from(document.querySelectorAll(".static"));
const userId = localStorage.getItem("user_id");
const counter = document.getElementById("counter");
//수정 필요
function showStatics(index) {
  for (static of menuStatics) {
    static.style.display = "none";
  }
  menuStatics[index].style.display = "block";
}
function startCounter(initialValue, incrementValue, intervalInMinutes) {
  let counterTime = initialValue;

  counter.innerText = counterTime;

  const increaseCounter = () => {
    counterTime += incrementValue;
  };
  const interval = intervalInMinutes * 60 * 1000;
  setInterval(increaseCounter, interval);
}

startCounter(29, 50, 30);

const getPoint = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/point/${1}`);
    if (response.status === 200) {
      localStorage.setItem("my_point", JSON.stringify(response.data));
      console.log("내 Point 불러오기 성공", response.status);
    }
  } catch (error) {
    console.error("내 Point 불러오기 실패", error);
  }
};
getPoint();
