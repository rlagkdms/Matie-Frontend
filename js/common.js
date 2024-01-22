const user = Cookies.get("user_id");

var SERVER_URL = "http://localhost:8080";

function cancel() {
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("pw");
  location.href = "../html/first.html";
}

function error(obj) {
  obj.focus();
  obj.style.borderColor = "#E9584A";
}
