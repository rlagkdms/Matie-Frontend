const error1 = document.getElementsByClassName("input_error")[0];
const error2 = document.getElementsByClassName("input_error")[1];

var isSuccess = false;

function signup2() {
  const email = document.getElementById("email");
  const name = document.getElementById("name");

  if (!email.value) {
    error(email);
    return;
  }

  if (!name.value) {
    error(name);
    return;
  }

  email.style.borderColor = "#2291F8";
  name.style.borderColor = "#2291F8";

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

  const nameRegex = /^[a-zA-Z]{3,8}$/;

  error2.innerHTML = !nameRegex.test(name.value)
    ? "이름은 3 ~ 8글자 가능합니다."
    : "";
  if (!nameRegex.test(name.value)) {
    error(name);
    return;
  }

  if (!isSuccess) return;

  const req = {
    name: name.value,
    userId: sessionStorage.getItem("id"),
    email: email.value,
    pw: sessionStorage.getItem("pw"),
  };

  axios
    .post(`http://localhost:8080/users`, req)
    .then(() => {
      location.href = "../html/login.html";
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("pw");
    })
    .catch((error) => {
      console.log(error);
    });
}
