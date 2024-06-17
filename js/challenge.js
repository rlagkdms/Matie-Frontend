let selectedDiv = document.getElementsByClassName("selected")[0];
let selectedValue = document.getElementsByClassName("selected-value")[0];
document.getElementsByTagName("main")[0];
const challengeDiv = document.getElementsByClassName("chellenge_box")[0];
//챌린지 클릭 시

let challengeList = [
  {
    id: 1,
    title: "만보기 100번 걷기",
    description: "설명입니다.",
    point: 100,
    type: 1,
  },
  {
    id: 2,
    title: "만보기 100번 걷기",
    description: "설명입니다.",
    point: 100,
    type: 1,
  },
  {
    id: 3,
    title: "만보기 100번 걷기",
    description: "설명입니다.",
    point: 100,
    type: 1,
  },
];

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
  const container = document.querySelector(".challenge_box"); // challenge_box를 선택합니다.
  const progress = document.getElementById("progress");
  container.innerHTML = ""; // 초기화

  challengeList.forEach((item, index) => {
    const challengeDiv = document.createElement("div");
    challengeDiv.className = "chellenge_div";
    challengeDiv.setAttribute("onclick", `clickChallenge(${index})`);
    value = (5 / 5) * 100;
    challengeDiv.innerHTML += `
      <div class="challenge_img"></div>
      <div class="title_box">
        <h4>${item.title}</h4>
        <div class="exp_box">
          <span>${index}/${1}</span> <!-- 이 부분은 실제 데이터로 대체 필요 -->
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
};
showChallenges();
function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}
