const toast = document.getElementById("toast");
let isToastShown = false;

function login() {
  if (isToastShown) return;

  const id = document.getElementById("id").value;
  const pw = document.getElementById("pw").value;

  const req = {
    userId: id,
    pw: pw,
  };
  console.log(req);
  axios
    .post(
      `http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080/user/login`,
      req
    )
    .then((res) => {
      console.log(res);
      localStorage.setItem("user_id", res.data.id);
      location.href = "../html/home.html";
    })
    .catch((error) => {
      isToastShown = true;
      toast.classList.add("show");
      toast.innerHTML = error.response.data;
      setTimeout(() => {
        toast.classList.remove("show");
        isToastShown = false;
      }, 2700);
    });
}
