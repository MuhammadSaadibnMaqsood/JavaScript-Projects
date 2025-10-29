import { getData, getSession, logout } from "./db.js";

// 🛍️ GLOBAL VARIABLES
let heroProducts = [];
let session;

const nav_ul = document.getElementById("nav-ul");
const lis = ["Home", "Products", "About"];

if (nav_ul) {
  // Create nav items
  lis.forEach((tag) => {
    const pageLink =
      tag === "Home" ? "index.html" : `${tag.toLowerCase()}.html`;
    nav_ul.innerHTML += `
      <li class="nav-item">
        <a href="${pageLink}">${tag}</a>
        <div class="line"></div>
      </li>`;
  });
}

const sessionfunc = async () => {
  session = await getSession();

  if (
    !session?.session &&
    (window.location.href.includes("/owner/dashboard.html") ||
      window.location.href.includes("/owner/uploadProduct.html"))
  ) {
    window.location.href = "/";
  }

  const login_btn = document.getElementById("login-btn");

  if (session) {
    login_btn.textContent = "Logout";

    login_btn.addEventListener("click", async () => {
      await logout();
      location.reload();
      Swal.fire({
        title: "Logout successfully!",
        text: "",
        icon: "success",
        confirmButtonText: "close",
        confirmButtonColor: "#764ba2",
      });
    });
  } else {
    login_btn.textContent = "Login";
    login_btn.addEventListener("click", () => {
      window.location.href = "/login_Signup/login.html";
    });
  }

  if (
    session.session &&
    session.session.user &&
    session.session.user.email &&
    session.session.user.email.includes("saad") &&
    !window.location.href.includes("dashboard") &&
    !window.location.href.includes("uploadProduct")
  ) {
    nav_ul.innerHTML += `
      <li class="nav-item">
        <a href="./owner/dasboard.html">Dashboard</a>
        <div class="line"></div>
      </li>`;
  }
};

sessionfunc();

// 📦 FETCH AND RENDER PRODUCTS
async function getProducts() {
    // Fetch all products
    heroProducts = await getData();

    const cardHolder = document.getElementById("card-holder");
    const productDetailContainer = document.getElementById("product-detail"); // Check for product detail container

    // Check if we are on the Product Detail Page (Product.html?id=...)
    if (productDetailContainer) {
        individual_Product(); // Call the product detail function directly
        return; // Stop execution here for the product page
    }

    // ✅ INDEX PAGE & PRODUCTS PAGE (PRODUCT CARDS)
    if (cardHolder) {
        cardHolder.innerHTML = ""; // Clear previous content

        // Check if we are on the dedicated products listing page
        const isProductsPage = window.location.href.includes("/products.html");

        if (isProductsPage) {
            // Render ALL products on products.html
            heroProducts.forEach((product) => {
                cardHolder.innerHTML += `
                <a href="Product.html?id=${product.id}">
                    <div class="card">
                        <div class="card-img">
                            <img src="${product.img}" alt="${product.name}" />
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
        } else {
            // Render only the first 4 products (Hero/Index page)
            heroProducts.slice(0, 4).forEach((product) => {
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
    }
}

function individual_Product() {
    // Get the ID from the URL query parameters
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");

    // Find the product in the global list
    const product = heroProducts.find((p) => p.id == id);
    const container = document.getElementById("product-detail"); // This is the container on Product.html

    if (container) {
        if (product) {
            // Render product details
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
            
            // Attach event listener for the order button *after* it's rendered
            const orderbtn = document.getElementById("order-btn");
            if (orderbtn) {
                orderbtn.addEventListener("click", handleClick);
            }
        } else {
            // Product not found case
            container.innerHTML = `<p>Product not found 😢</p>`;
        }
    }

    // Handle click logic (defined inside to access the session/product scope if needed, 
    // but the session is already global so it's fine here)
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
