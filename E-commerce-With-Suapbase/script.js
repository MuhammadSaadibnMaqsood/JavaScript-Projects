const nav_ul = document.getElementById("nav-ul");

const lis = ["Home", "Products", "About"];

lis.map((tag) => {
  nav_ul.innerHTML += `  <li class="nav-item">
      <a href="${tag === "Home" ? "/" : tag + ".html"}">${tag}</a>
      <div class="line"></div>
    </li>`;
});

// HERO PRODUCTS

const heroProducts = [
  {
    id: 1,
    name: "Face Wash",
    price: "500Rs",
    img: "./assests/facewash.jpg",
  },
  {
    id: 2,
    name: "Glasses",
    price: "600Rs",
    img: "./assests/glasses.jpg",
  },
  {
    id: 3,
    name: "Head Phones",
    price: "1500Rs",
    img: "./assests/headphone.jpg",
  },
  {
    id: 4,
    name: "Watch",
    price: "700Rs",
    img: "./assests/watch.jpg",
  },
];

const cardHolder = document.getElementById("card-holder");

heroProducts.map((product) => {
  cardHolder.innerHTML += `
       <a href="Product.html?id=${product.id}">
          <div class="card">
            <div class="card-img">
              <img src="${product.img}" alt="" />
              <span>Best Seller</span>
              <div class="hover-effect">
                <div>
                  <h1>${product.name}</h1>
                  <p>Price: ${product.price}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
  `;
});
