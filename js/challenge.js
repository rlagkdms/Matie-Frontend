// import SERVER_HOST from "../js/config";
const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

let selectedDiv = document.getElementsByClassName("selected")[0];
let selectedValue = document.getElementsByClassName("selected-value")[0];
let challengeBox = document.getElementsByClassName("challenge_box")[0];
document.getElementsByTagName("main")[0];

const userId = localStorage.getItem("user_id");
let selectedChallenge = localStorage.getItem("selectedChallenge");

const clickChallenge = (challenge) => {
  console.log("Selected Challenge:", challenge);
  selectedChallenge = localStorage.setItem(
    "selectedChallenge",
    JSON.stringify(challenge)
  );
  window.location.href = "../html/challenge-details.html";
};

// 슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll(".chellenge_box");
const totalSlides = Array.from(document.querySelectorAll(".slide")).length;

function showSlide(index) {
  if (index < 0) {
    currentIndex = 0;
  } else if (index >= totalSlides) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const translationValue = -currentIndex * 100 + "%";
  document.querySelector(".slider-wrapper").style.transform =
    "translateX(" + translationValue + ")";

  slides.forEach((slide, idx) => {
    if (idx === currentIndex) {
      slide.style.display = "flex";
    } else {
      slide.style.display = "none";
    }
  });

  showChallenges(currentIndex);
}

const showChallenges = (currentIndex) => {
  challengeBox.innerHTML = "";
  getChallenges(currentIndex, challengeBox);
};

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// api 연동
async function getChallenges(currentIndex, challengeBox) {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/challenge/page/type/${currentIndex + 1}`,
      {
        params: {
          page: 0,
          size: 3,
        },
      }
    );

    if (response.status === 200) {
      console.log("챌린지 목록 불러오기 성공");
      const challenges = response.data.content;
      showChallengeList(challenges, challengeBox);
    }
  } catch (error) {
    console.error("서버 연결 실패", error);
  }
}

function showChallengeList(challenges, challengeBox) {
  console.log(challenges);
  challenges.forEach(async (item, index) => {
    console.log(item);
    try {
      const response = await axios.get(
        `${SERVER_HOST}/challenge-confirm/user/${1}/challenge/${item.id}`
      );
      if (response.status === 200) {
        console.log("챌린지 각각 정보 가져오기 성공", response.data);

        getChallenge(item, response.data, challengeBox);
      }
    } catch (error) {
      console.error("error", error);
    }
  });
}

function getChallenge(item, challenge, challengeBox) {
  let challengeDiv = document.createElement("div");
  challengeDiv.className = "challenge_div";
  challengeDiv.setAttribute(
    "onclick",
    `clickChallenge(${JSON.stringify(challenge)})`
  );
  let totalCount = 5;
  let value = (Number(challenge.count) / totalCount) * 100;
  console.log(value, typeof item.count);

  challengeDiv.innerHTML = `
    <div class="challenge_img"></div>
    <div class="title_box">
      <h4>${item.title}</h4>
      <div class="exp_box">
        <span>${challenge.count}/${totalCount}</span>
        <span>${item.point}exp</span>
      </div>
      <progress id="progress" value="${value}" min="0" max="100"></progress>
    </div>
  `;

  challengeBox.appendChild(challengeDiv);
}

showChallenges(0); // 초기 호출 시 index를 0으로 설정하여 첫 페이지를 로드
