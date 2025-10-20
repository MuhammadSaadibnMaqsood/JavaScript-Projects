const nav_ul = document.getElementById("nav-ul");

const lis = ["Home", "Products", "About"];

lis.map((tag) => {
  nav_ul.innerHTML += `  <li class="nav-item">
      <a href="${tag === "Home" ? "/" : tag + ".html"}">${tag}</a>
      <div class="line"></div>
    </li>`;
});
