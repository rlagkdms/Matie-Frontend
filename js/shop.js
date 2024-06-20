const SERVER_HOST =
  "http://ec2-3-35-19-10.ap-northeast-2.compute.amazonaws.com:8080";
let category = document.getElementsByName("category");

document.addEventListener("DOMContentLoaded", () => {
  for (var num of category) {
    if (num.checked) {
      if (num.value === "0") {
        all();
      } else if (num.value === "1") {
        categoryProducts(1);
      } else if (num.value === "2") {
        categoryProducts(2);
      } else if (num.value === "3") {
        categoryProducts(3);
      }
    }
  }
});

function getRandomImageNumber() {
  return Math.floor(Math.random() * 11) + 1;
}

function clearContainer() {
  const container = document.querySelector(".container-all");
  container.innerHTML = "";
}

function getProduct(id) {
  axios
    .get(`${SERVER_HOST}/product/${id}`)
    .then((result) => {
      console.log(result.data);
      let list = [];
      localStorage.setItem("selectedItem", list.push(result.data));
      location.href = "../html/product-detail.html";
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}

Array.from(category).forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      if (this.value === "0") {
        all();
      } else if (this.value === "1") {
        categoryProducts(1);
      } else if (this.value === "2") {
        categoryProducts(2);
      } else if (this.value === "3") {
        categoryProducts(3);
      }
    }
  });
});

function all() {
  clearContainer();
  axios
    .get(`${SERVER_HOST}/product`)
    .then((result) => {
      console.log(result.data);
      result.data.forEach((data) => {
        const randomImageNumber = getRandomImageNumber();
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="container-product" onclick="getProduct(${
          data.id
        })">
                  <div class="image"><img src="../img/item${randomImageNumber}.jpg" alt="${
          data.id
        }"></div>
                  <div class="text">
                      <span class="company">RECOVER</span><br>
                      <span class="title">${data.name}</span><br>
                      <span class="point">${data.point * 100}exp </span>
                  </div>
              </div>`;
        document.querySelector(".container-all").append(temp);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function categoryProducts(category_id) {
  clearContainer();
  axios
    .get(`${SERVER_HOST}/product/category/${category_id}`)
    .then((result) => {
      console.log(result.data);
      result.data.forEach((data) => {
        const randomImageNumber = getRandomImageNumber();
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="container-product" onclick="getProduct(${
          data.id
        })">
    <div class="image"><img src="../img/item${randomImageNumber}.jpg" alt="${
          data.id
        }"></div>
    <div class="text">
        <span class="company">RECOVER</span><br>
        <span class="title">${data.name}</span><br>
        <span class="point">${data.point * 100}exp </span>
    </div>
    </div>`;
        document.querySelector(".container-all").append(temp);
      });
    })
    .catch((error) => {
      console.error("Error fetching category products:", error);
    });
}
