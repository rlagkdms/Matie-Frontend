window.onload = () => {
  let nick = document.getElementById("name");
  let date = document.getElementById("date");
  let point = document.getElementById("point");

  let userId = Cookies.get("user_id");

  axios
    .get(`http://localhost:8080/users/${userId}`)
    .then((result) => {
      nick.innerHTML = result.data.name;
      date.innerHTML = "Been our mate from " + result.data.createdDate;
    })
    .catch((err) => {});

  axios.get(`http://localhost:8080/point/${userId}`).then((result) => {
    point.innerHTML = result.data.balance;
  });
};
