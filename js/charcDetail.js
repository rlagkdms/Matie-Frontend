const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";

const headerTitle = document.getElementById("title");
const title = document.getElementsByClassName("title")[0];
const image = document.getElementsByClassName("detail-img")[0];
const description = document.getElementsByClassName("description")[0];

console.log(title, image, description);

const characterId = new URL(window.location.href).searchParams.get(
  "characterid"
);

// Function to select the appropriate image based on the character ID
const selectImage = (characterId) => {
  switch (parseInt(characterId)) {
    case 1:
      return "../img/SingleUse (일회용품).svg";
    case 2:
      return "../img/AirPollution (공기 오염).svg";
    case 3:
      return "../img/Recycle (재활용).svg";
    case 4:
      return "../img/Volunteer (봉사).svg";
    default:
      return "";
  }
};

const getCharacterInfo = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/character/${characterId}`);
    console.log("캐릭터 정보 불러오기 성공", response.status);
    console.log(response.data);

    // Set the image source based on the character ID
    image.src = selectImage(characterId);
    headerTitle.innerText = `${response.data.name}`;
    title.innerText = `${response.data.name}`;
    description.innerText = response.data.description;
  } catch (error) {
    console.error("캐릭터 정보 불러오기 실패", error);
  }
};

getCharacterInfo();
