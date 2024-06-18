const menuItems = document.querySelectorAll(".context");
const images = {
  home: { on: "../img/home_on.svg", off: "../img/home_off.svg" },
  challenge: {
    on: "../img/challenges_on.svg",
    off: "../img/challenges_off.svg",
  },
  community: { on: "../img/community_on.svg", off: "../img/community_off.svg" },
  profile: { on: "../img/profile_on.svg", off: "../img/profile_off.svg" },
};

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((mi) => {
      const img = mi.querySelector("img");
      const itemType = mi.getAttribute("data-type");
      img.src = images[itemType].off;
    });
    const img = this.querySelector("img");
    const itemType = this.getAttribute("data-type");
    img.src = images[itemType].on;
    location.href = this.getAttribute("data-url");
  });
});
