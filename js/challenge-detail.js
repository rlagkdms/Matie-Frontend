const buttons = document.querySelectorAll(".item");
let currentIndex = buttons.length - 1;

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === currentIndex) {
      const span = button.querySelector("span");
      const img = button.querySelector("img");
      img.src = "../img/step-finish.svg";
      span.style.color = "black";
      currentIndex--;
    }
  });
});

const comfirmButton = document.querySelector(".default_btn");
comfirmButton.onclick = () => (location.href = "../html/challenge.html");
