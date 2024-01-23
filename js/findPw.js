const sendBtn = document.getElementById("send");
const codeInput = document.getElementsByClassName("input_div")[1];
sendBtn.onclick = () => {
  sendBtn.innerText = "Sent";
  sendBtn.style.color = "#7B4DFF";
  codeInput.style.display = "block";
  setTimer();
  sendEmail();
};
let customInputDiv = document.getElementsByClassName("input_custom");
let input = Array.from(document.getElementsByClassName("input"));

input.forEach((element) => {
  element.onfocus = () => (element.parentElement.style.borderColor = "#2291F8");
  element.onblur = () => (element.parentElement.style.borderColor = "#616161");
});

const timer = document.getElementById("timer");
timer.onclick = () => {
  setTimer();
  sendEmail();
};

function setTimer() {
  let time = 180000;
  let min = 3;
  let sec = 60;
  timer.innerText = `${min}:00`;
  PLAYTIME = setInterval(function () {
    time -= 1000; //1초씩 감소
    min = time / (60 * 1000); //초를 분으로 나누기
    if (time > 0) {
      sec -= 1;
      if (sec === 0) {
        sec = 60;
      }
      timer.innerText = `${Math.floor(min)}:${sec}`;
    }
    if (time === 0) {
      // sec=60;
      // timer.innerText = Math.floor(min)+':'+'00'
      timer.innerText = "resend";
    }
  }, 1000);
}

function sendEmail() {
  var inputEmail = document.getElementById("input_email").value;

  const req = {
    emailAddress: inputEmail,
  };

  axios.post(`http://localhost:8080/email`, req);
}

function changePassword() {
  var inputEmail = document.getElementById("input_email").value;
  var inputCode = document.getElementById("input_code").value;

  axios
    .get(`http://localhost:8080/email/${inputEmail}/${inputCode}`)
    .then((result) => {
      location.href = "../html/findPw2.html";
    })
    .catch((err) => {});
}

//3분이 되면 타이머 삭제하기
setTimeout(function () {
  clearInterval(PLAYTIME);
}, 180000);
