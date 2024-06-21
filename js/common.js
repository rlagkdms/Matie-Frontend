const user = localStorage.getItem("user_id");

var SERVER_URL =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

function cancel() {
  localStorage.removeItem("id");
  localStorage.removeItem("pw");
  location.href = "../html/index.html";
}

function error(obj) {
  obj.focus();
  obj.style.borderColor = "#E9584A";
}
