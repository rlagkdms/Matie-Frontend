const sendBtn = document.getElementById("send");
const codeInput = document.getElementsByClassName("input_div")[1];
const emailInput = document.getElementById("input_email");

emailInput.oninput = () => {
  if (emailInput.value === "") sendBtn.disabled = true;
  else sendBtn.disabled = false;
}; //비활성화

sendBtn.onclick = () => {
  emailInput.disabled = true;
  sendBtn.innerText = "Sent";
  sendBtn.style.color = "#7B4DFF";
  codeInput.style.display = "block";
  resetCount();
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
  resetCount();
  sendEmail();
};
let min;
let sec;
let TIME;

function resetCount() {
  min = 2;
  sec = 60;
  TIME = setInterval((e) => {
    timer.innerText = `${min}:00`;
    setTimer();
  }, 1000);
}

function setTimer() {
  const numMin = Number(min);
  const numSec = Number(sec);
  if (numMin === 0 && numSec === 0) {
    timer.innerText = "resend";
    clearInterval(TIME);
  } else {
    if (numSec === 0) {
      const newMin = numMin - 1;
      const newSec = 59;

      min = newMin.toString();
      sec = newSec.toString();
    } else {
      const newSec = numSec - 1;
      sec = newSec < 10 ? `0${newSec.toString()}` : newSec.toString();
    }
    timer.innerText = `${min}:${sec}`;
  }
}

function sendEmail() {
  var inputEmail = document.getElementById("input_email").value;

  const req = {
    emailAddress: inputEmail,
  };

  axios.post(
    `http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080/email`,
    req
  );
}

function changePassword() {
  var inputEmail = document.getElementById("input_email").value;
  var inputCode = document.getElementById("input_code").value;

  axios
    .get(
      `http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080/email/${inputEmail}/${inputCode}`
    )
    .then((result) => {
      sessionStorage.setItem("email", inputEmail);
      location.href = "../html/findPw2.html";
    })
    .catch((err) => {});
}
