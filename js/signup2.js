const error1 = document.getElementsByClassName("input_error")[0];
const error2 = document.getElementsByClassName("input_error")[1];

var isSuccess = false;

function signup2() {
  const id = document.getElementById("id");
  const name = document.getElementById("name");

  if (!id.value) {
    error(id);
    return;
  }

  if (!name.value) {
    error(name);
    return;
  }

  id.style.borderColor = "#2291F8";
  name.style.borderColor = "#2291F8";

  axios
    .get(
      `http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080/users/duplicate2/${id.value}`
    )
    .then(() => (isSuccess = true))
    .catch(() => (error1.innerHTML = "ID already exists, use another ID"));

  const idRegex = /^[a-zA-Z][0-9a-zA-Z]{6,12}$/;

  error1.innerHTML = !idRegex.test(id.value)
    ? "6~12자 이내로 영문과 숫자만 가능합니다."
    : "";
  if (!idRegex.test(id.value)) {
    error(id);
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
    userId: id.value,
    email: sessionStorage.getItem("email"),
    pw: sessionStorage.getItem("pw"),
  };

  axios
    .post(
      `http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080/users`,
      req
    )
    .then(() => {
      location.href = "../html/login.html";
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("pw");
    })
    .catch((error) => {
      console.log(error);
    });
}
