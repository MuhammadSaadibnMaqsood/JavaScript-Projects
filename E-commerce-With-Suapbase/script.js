const session = null;

const nav_ul = document.getElementById("nav-ul");
const lis = ["Home", "Products", "About"];

if (nav_ul) {
  lis.map((tag) => {
    nav_ul.innerHTML += `
      <li class="nav-item">
        <a href="${tag === "Home" ? "index.html" : tag + ".html"}">${tag}</a>
        <div class="line"></div>
      </li>`;
  });
}

const heroProducts = [
  { id: 1, name: "Face Wash", price: "500Rs", img: "./assests/facewash.jpg" },
  { id: 2, name: "Glasses", price: "600Rs", img: "./assests/glasses.jpg" },
  {
    id: 3,
    name: "Head Phones",
    price: "1500Rs",
    img: "./assests/headphone.jpg",
  },
  { id: 4, name: "Watch", price: "700Rs", img: "./assests/watch.jpg" },
];

const cardHolder = document.getElementById("card-holder");

if (cardHolder) {
  heroProducts.map((product) => {
    cardHolder.innerHTML += `
      <a href="Product.html?id=${product.id}">
        <div class="card">
          <div class="card-img">
            <img src="${product.img}" alt="${product.name}" />
            <span>Best Seller</span>
            <div class="hover-effect">
              <div>
                <h1>${product.name}</h1>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </a>`;
  });
}

function individual_Product() {
  const param = new URLSearchParams(window.location.search);
  const id = param.get("id");
  const product = heroProducts.find((p) => p.id == id);
  const container = document.getElementById("product-detail");

  if (container && product) {
    container.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">${product.price}</p>
        <div class="action-buttons">
          <button class="btn" onClick="handleClick()">Order Now</button>
          <a href="index.html" class="btn btn-outline">Back to Products</a>
        </div>
      </div>`;
  }
}

if (window.location.pathname.includes("Product.html")) {
  individual_Product();
}

function handleClick() {
  if (session) {
    Swal.fire({
      title: "Order Placed Successfully!",
      text: "Your product will be delivered soon.",
      icon: "success",
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#764ba2",
    });
  } else {
    Swal.fire({
      title: "Not Logged in!",
      text: "For ordering please login first.",
      icon: "error",
      confirmButtonText: "close",
      confirmButtonColor: "#764ba2",
    });
  }
}
