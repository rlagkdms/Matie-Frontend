const eyeBtn = document.getElementsByClassName("eye_close")[0];
const customInputDiv = document.getElementsByClassName("input_custom")[0];
const pwInput = document.querySelector(".input_custom>input");
var check = true;

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

function changePassword() {
  let password = document.getElementById("password").value;
  let pwConfirm = document.getElementById("password-confirm").value;

  if (password !== pwConfirm) return;

  let email = sessionStorage.getItem("email");

  let req = { pw: password };

  axios.put(`http://localhost:8080/users/${email}`, req).then(() => {
    sessionStorage.removeItem("email");
    location.href = "../html/login.html";
  });
}
