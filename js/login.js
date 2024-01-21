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

  axios
    .post(`${BASE_URL}/login`, req)
    .then((res) => {
      console.log(res);
      Cookies.set("user_id", res.data.id, { expires: 1 });
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
