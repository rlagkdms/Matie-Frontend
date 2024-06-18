import SERVER_HOST from "../js/config";

let selectedDiv = document.getElementsByClassName("selected")[0];
let selectedValue = document.getElementsByClassName("selected-value")[0];
document.getElementsByTagName("main")[0];
const challengeDiv = document.getElementsByClassName("chellenge_box")[0];
//챌린지 클릭 시
console.log(SERVER_HOST);
//클릭했을 떄 다른 화면으로 넘기기
const clickChallenge = (index) => {
  challengeDiv.map((item, i) => {
    if (challengeDiv[index] === challengeDiv[i])
      localStorage.setItem("chellenge", challengeList[i]);
    window.location.href = "../html/challengeItem.html";
  });
};

//슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

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

  // 모든 challenge_box를 숨기고 현재 인덱스의 challenge_box만 보이도록 설정
  showEachChallenge.forEach((challenge, idx) => {
    if (idx === currentIndex) {
      challenge.style.display = "flex";
    } else {
      challenge.style.display = "none";
    }
  });
}

const showChallenges = () => {
  const container = document.querySelector(".challenge_box");
  const progress = document.getElementById("progress");
  container.innerHTML = ""; // 초기화
  let challenges = [];

  axios
    .get(`${SERVER_HOST}/challenge/type/${1}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("챌린지 목록 불러오기 성공");
        console.log(response.data);
        challenges = response.data;

        challenges.forEach((item, index) => {
          const challengeDiv = document.createElement("div");
          challengeDiv.className = "chellenge_div";
          challengeDiv.setAttribute("onclick", `clickChallenge(${index})`);

          let totalCount = 5;
          let value = (5 / totalCount) * 100;

          challengeDiv.innerHTML += `
            <div class="challenge_img"></div>
            <div class="title_box">
              <h4>${item.title}</h4>
              <div class="exp_box">
                <span>${index}/${totalCount}</span> <!-- 이 부분은 실제 데이터로 대체 필요 -->
                <span>${item.point}exp</span>
              </div>
              <progress id="progress" value="${value}" min="0" max="100"></progress>
            </div>
          `;

          if (value === 100) {
            progress.className = "clearChallenge";
          }

          container.appendChild(challengeDiv);
        });
      } else {
        console.log("챌린지 목록 불러오기 실패", response.status);
      }
    })
    .catch((error) => {
      console.error("서버 연결 실패", error);
    });
};
showChallenges();
function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}
