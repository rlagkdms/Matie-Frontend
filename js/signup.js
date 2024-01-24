const eyeBtn = document.getElementsByClassName("eye_close")[0];
const customInputDiv = document.getElementsByClassName("input_custom")[0];
const pwInput = document.querySelector(".input_custom>input");
var check = true;

const error1 = document.getElementsByClassName("input_error")[0];
const error2 = document.getElementsByClassName("input_error")[1];
const error3 = document.getElementsByClassName("input_error")[2];

var isSuccess = false;

//패스워드 보이게 설정하기
eyeBtn.onclick = () => {
  check = !check;
  eyeBtn.firstElementChild.src = check
    ? "../img/open_eye.svg"
    : "../img/close_eye.svg";
  pwInput.type = check ? "text" : "password";
};

pwInput.onfocus = () => {
  customInputDiv.style.borderColor = "#2291F8";
};
pwInput.onblur = () => {
  customInputDiv.style.borderColor = "#E0E0E0";
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("email").value = sessionStorage.getItem("email");
  document.getElementById("pw").value = sessionStorage.getItem("pw");
});

function signup() {
  const email = document.getElementById("email");
  const pw = document.getElementById("pw");
  const pwCheck = document.getElementById("pw-check");

  if (!email.value) {
    error(email);
    return;
  }
  if (!pw.value) {
    error(pw);
    return;
  }
  if (!pw - check.value) {
    error(pw - check);
    return;
  }

  email.style.borderColor = "#2291F8";
  pw.style.borderColor = "#2291F8";
  pwCheck.style.borderColor = "#2291F8";

  axios
    .get(`http://localhost:8080/users/duplicate1/${email.value}`)
    .then(() => (isSuccess = true))
    .catch(
      () =>
        (error1.innerHTML =
          "Email already exists, use another email address or login")
    );

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  error1.innerHTML = !emailRegex.test(email.value)
    ? "이메일 형식이 아닙니다."
    : "";
  if (!emailRegex.test(email.value)) {
    error(email);
    return;
  }

  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

  error2.innerHTML = !pwRegex.test(pw.value)
    ? "8~20자 이내로 영문과 숫자, 특수기호가 들어가야 합니다."
    : "";
  if (!pwRegex.test(pw.value)) {
    error(pw);
    return;
  }

  error3.innerHTML = pw.value !== pwCheck.value ? "Check your password" : "";
  if (pw.value !== pwCheck.value) {
    error(pwCheck);
    customInputDiv.style.borderColor = "#E9584A";
    return;
  }

  if (!isSuccess) return;

  sessionStorage.setItem("email", email.value);
  sessionStorage.setItem("pw", pw.value);

  location.href = "../html/signup2.html";
}
