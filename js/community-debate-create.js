const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

const title = document.querySelector("input");
const contents = document.querySelector("textarea");
const userId = localStorage.getItem("userId");
async function sendPostDebate() {
  try {
    const req = {
      title: title.value,
      description: contents.value,
      type: "Debate",
      creatorUser: {
        id: 1,
      },
    };
    const res = await axios.post(`${SERVER_HOST}/community`, req);
    if (res.status === 201) {
      console.log("토론 게시 성공!");
      location.href = "../html/community.html";
    } else {
      console.log(res.status + " : " + res.data);
    }
  } catch (error) {
    console.error("토론 게시 실패", error);
  }
}
