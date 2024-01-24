const searchParams = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", () => {
  let name = document.getElementById("name");
  let date = document.getElementById("date");
  let title = document.getElementById("title");
  let content = document.getElementById("content");

  axios
    .get(`http://localhost:8080/community/${searchParams.get("id")}`)
    .then((result) => {
      name.innerHTML = result.data.creatorUser.name;
      date.innerHTML = result.data.createdDate;
      title.innerHTML = result.data.title;
      content.innerHTML = result.data.description;

      axios
        .get(`http://localhost:8080/comment/${result.data.id}`)
        .then((result) => {
          for (var data of result.data) {
            const temp = document.createElement("div");
            temp.innerHTML = `<div class="comment">
                <div class="component-user">
                    <button class="user-image"></button>
                    <p class="user-info">
                        <span class="name">${data.user.name}</span>
                        <br>
                        <span class="date">${data.user.createdDate}</span>
                    </p>
                    <button class="heart">
                        <img src="../img/ph_heart-fill-no.svg">
                    </button>
                </div>
                <div class="component-content">${data.description}</div>
            </div>`;
            document.querySelector(".component-comment").append(temp);
          }
        })
        .catch((err) => {});
    })
    .catch((err) => {});
});
