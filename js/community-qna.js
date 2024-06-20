const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

const searchParams = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", () => {
  let name = document.getElementById("name");
  let date = document.getElementById("date");
  let title = document.getElementById("title");
  let content = document.getElementById("content");

  axios
    .get(`${SERVER_HOST}/community/${searchParams.get("id")}`)
    .then((result) => {
      name.innerHTML = result.data.creatorUser.name;
      date.innerHTML = result.data.createdDate;
      title.innerHTML = result.data.title;
      content.innerHTML = result.data.description;

      axios
        .get(`${SERVER_HOST}/comment/${result.data.id}`)
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

function send() {
  let comment = document.getElementById("comment").value;
  let userId = localStorage.getItem("user_id");

  const req = {
    description: comment,
    user: {
      id: userId,
    },
    community: {
      id: searchParams.get("id"),
    },
  };

  axios
    .post(`${SERVER_HOST}/comment`, req)
    .then((result) => {
      const temp = document.createElement("div");
      temp.innerHTML = `<div class="comment">
                  <div class="component-user">
                      <button class="user-image"></button>
                      <p class="user-info">
                          <span class="name">${data.user.name}</span>
                          <br>
                          <span class="date">${data.createdDate}</span>
                      </p>
                  </div>
                  <div class="component-content">${data.description}</div>
              </div>`;
      document.querySelector(".component-comment").append(temp);
    })
    .catch((err) => {});
  location.reload(true);
}
