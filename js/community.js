document.addEventListener("DOMContentLoaded", () => {
  question();
});

async function question() {
  axios
    .get(`http://localhost:8080/community/type/Q&A`)
    .then((result) => {
      for (var data of result.data) {
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="container-component">
            <div class="component-user">
                <button class="user-image"></button>
                <p>
                    <span class="name">${data.creatorUser.name}</span>
                    <span class="date">${data.createdDate}</span>
                </p>
                <div class="option">
                    <img src="../img/iconamoon_menu-kebab-vertical-bold.svg" alt="">
                </div>
            </div>

            <div class="component-info">
                <span class="title">${data.title}</span>
                <span class="content">${data.description}</span>
            </div>

            <div class="component-bottom">
                <button type="button">
                    <img src="../img/material-symbols_comment.svg" alt="">
                </button>
                <button type="button">
                    <img src="../img/ph_heart-fill.svg" alt="">
                </button>
            </div>
        </div>`;
        document.querySelector(".container-community").append(temp);
      }
    })
    .catch((err) => {});
}

async function debate() {
  document.querySelector(".container-community").replaceChildren();
}
