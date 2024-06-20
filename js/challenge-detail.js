const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

const challengeData = JSON.parse(localStorage.getItem("selectedChallenge"));
const myPointData = JSON.parse(localStorage.getItem("my_point"));

const buttons = document.querySelectorAll(".item");
const title = document.querySelector(".title");
const discription = document.querySelector(".discription");
const exp = document.querySelector(".exp");

title.innerText = challengeData.challenge.title;
discription.innerText = challengeData.challenge.description;
exp.innerText = challengeData.challenge.point + " exp";
let prevCount = challengeData.count;

// buttons의 가장 마지막 버튼부터 count 수 만큼 눌린 표시하기
let currentIndex = buttons.length - 1;
let count = prevCount;
if (challengeData.count > 0) {
  let lastIndex = buttons.length - 1;

  while (count > 0) {
    const button = buttons[lastIndex];
    console.log(buttons[lastIndex]);
    const span = button.querySelector("span");
    const img = button.querySelector("img");
    if (img) {
      img.src = "../img/step-finish.svg"; // 이미지 경로가 맞는지 확인하세요
    }
    span.style.color = "black";
    lastIndex--;
    count--;
  }

  // currentIndex를 업데이트하여 이미 누른 버튼을 다시 클릭하지 않도록 설정
  currentIndex = lastIndex;
} else {
  // 버튼 초기화 상태
  currentIndex = buttons.length - 1;
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === currentIndex) {
      const span = button.querySelector("span");
      const img = button.querySelector("img");
      img.src = "../img/step-finish.svg";
      span.style.color = "black";
      currentIndex--;
      count++;
    }
  });
});

const comfirmButton = document.querySelector(".default_btn");
comfirmButton.onclick = async () => {
  //버튼 누르면 count 업데이트 및 상황에 따라 point 적립하기
  try {
    const response = await axios.put(
      `${SERVER_HOST}/challenge-confirm/user/${1}/challenge/${
        challengeData.id
      }`,
      {
        count: count,
      }
    );

    if (response.status === 200) {
      console.log("count 업데이트 성공", response.status);
      localStorage.setItem(
        "selectedChallenge",
        JSON.stringify({
          ...challengeData,
          count: prevCount + count,
        })
      );
      if (count === 5) {
        updatePoint();
        location.href = "../html/challenge-finish.html";
      } else {
        location.href = "../html/challenge.html";
      }
    }
  } catch (error) {
    console.error("count 업데이트 실패", error);
  }
};

// point, count localstorage 불러와 사용? or get()?
const updatePoint = async () => {
  try {
    const variation = challengeData.challenge.point;
    const balance =
      challengeData.challenge.balance + challengeData.challenge.point;
    const point = {
      user: {
        id: userId,
      },
      variation: variation,
      balance: balance,
    };
    const response = await axios.put(`${SERVER_HOST}/point`, point);
    if (response.status === 201) {
      console.log("포인트 업데이트 성공", response.status);
    }
  } catch (error) {
    console.error("포인트 업데이트 실패", error);
  }
};

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
