import { getData } from "./db.js";

const nav_ul = document.getElementById("nav-ul");
const lis = ["Home", "Products", "About"];

if (nav_ul) {
  lis.forEach((tag) => {
    nav_ul.innerHTML += `
      <li class="nav-item">
        <a href="${tag === "Home" ? "index.html" : tag + ".html"}">${tag}</a>
        <div class="line"></div>
      </li>`;
  });
}

// 🛍️ GLOBAL VARIABLES
let heroProducts = [];
const session = null;

// 📦 FETCH AND RENDER PRODUCTS
async function getProducts() {
  heroProducts = await getData();

  const cardHolder = document.getElementById("card-holder");

  // ✅ INDEX PAGE (PRODUCT CARDS)
  if (cardHolder) {
    cardHolder.innerHTML = ""; // Clear previous content
    heroProducts.forEach((product) => {
      cardHolder.innerHTML += `
        <a href="Product.html?id=${product.id}">
          <div class="card">
            <div class="card-img">
              <img src="${product.img}" alt="${product.name}" />
              <span>Best Seller</span>
              <div class="hover-effect">
                <div>
                  <h1>${product.name}</h1>
                  <p>Price: ${product.price} Rs</p>
                </div>
              </div>
            </div>
          </div>
        </a>`;
    });
  }

  // ✅ PRODUCT DETAIL PAGE
  if (window.location.pathname.includes("Product.html")) {
    individual_Product();
  }
}

// 🧾 INDIVIDUAL PRODUCT DETAILS
function individual_Product() {
  const param = new URLSearchParams(window.location.search);
  const id = param.get("id");

  const product = heroProducts.find((p) => p.id == id);
  const container = document.getElementById("product-detail");

  if (container) {
    if (product) {
      container.innerHTML = `
        <div class="product-image">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h1>${product.name}</h1>
          <p class="price">${product.price} Rs</p>
          <div class="action-buttons">
            <button class="btn" id="order-btn">Order Now</button>
            <a href="index.html" class="btn btn-outline">Back to Products</a>
          </div>
        </div>`;
    } else {
      container.innerHTML = `<p>Product not found 😢</p>`;
    }
  }

  const orderbtn = document.getElementById("order-btn");
  orderbtn.addEventListener("click", handleClick);

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
        confirmButtonText: "Close",
        confirmButtonColor: "#764ba2",
      });
    }
  }
}

// 🚀 RUN APP
getProducts();
