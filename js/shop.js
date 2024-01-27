document.addEventListener("DOMContentLoaded", () => {
  let category = document.getElementsByName("category");

  for (var num of category) {
    if (num.checked) {
      if (num.value === "0") {
        all();
      } else {
      }
    }
  }
});

function all() {
  let count = 1;
  axios.get(`http://localhost:8080/product`).then((result) => {
    for (var data of result.data) {
      const temp = document.createElement("div");
      temp.innerHTML = `<div class="container-product" onclick="location.href='../html/product-detail.html'">
            <div class="image"><img src="http://localhost:8080/products/${count++}.svg" alt=""></div>
            <div class="text">
                <span class="company">RECOVER</span><br>
                <span class="title">${data.name}</span><br>
                <span class="point">${data.point}pt</span>
            </div>
        </div>`;
      document.querySelector(".container-all").append(temp);
    }
  });
}
