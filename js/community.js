document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("select1").checked) question();
  else debate();
});

async function question() {
  document.querySelector(".container-community").replaceChildren();

  axios
    .get(`http://localhost:8080/community/type/Q&A`)
    .then((result) => {
      for (var data of result.data) {
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="container-component" onclick="detailQna(${data.id})">
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

            <div class="component-bottom-question">
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

  axios
    .get(`http://localhost:8080/community/type/Debate`)
    .then((result) => {
      for (var data of result.data) {
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="container-component" onclick="detailDebate(${data.id})">
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

          <div class="component-bottom-debate">
                        <div class="button-like">
                            <button class="like"><img src="../img/bx_like.svg" alt=""><label
                                    style="color: #2291F8;">${data.agree}</label></button>
                        </div>

                        <div class="button-unlike">
                            <button class="unlike"><img src="../img/bx_dislike.svg" alt=""><label
                                    style="color: #88C507;">${data.disagree}</label></button>
                        </div>
                    </div>
      </div>`;
        document.querySelector(".container-community").append(temp);
      }
    })
    .catch((err) => {});
}

function detailQna(value) {
  location.href = `../html/community-qna.html?id=${value}`;
}

function detailDebate(value) {
  location.href = `../html/community-debate.html?id=${value}`;
}

function writePost() {
  if (document.getElementById("select1").checked)
    location.href = "../html/community-qna-create.html";
  else location.href = "../html/community-debate-create.html";
}
