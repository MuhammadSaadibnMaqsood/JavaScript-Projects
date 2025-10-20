const nav_ul = document.getElementById("nav-ul");

const lis = ["Home", "Products", "About"];

lis.map((tag) => {
  nav_ul.innerHTML += `<li class = "nav-item">${tag} <div class="line"></div> </li>  `;
});
