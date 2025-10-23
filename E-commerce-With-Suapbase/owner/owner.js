import { addProduct, getOwnerData, getSession } from "../db.js";
const cloudName = "dnltltfsk";
const add_product_btn = document.getElementById("add-product");
const imgInput = document.getElementById("img");
const imgRender = document.querySelector(".img-render");

// ../index.html

const nav_ul = document.getElementById("nav-ul");
const lis = ["Home", "Products", "About"];

if (nav_ul) {
  lis.forEach((tag) => {
    nav_ul.innerHTML += `
      <li class="nav-item">
        <a href="${
          tag === "Home" ? "../index.html" : "../" + tag + ".html"
        }">${tag}</a>
        <div class="line"></div>
      </li>`;
  });
}
let session;

const sessionfunc = async () => {
  session = await getSession();
  const login_btn = document.getElementById("login-btn");

  if (
    !session ||
    (!session.session &&
      (window.location.href.includes("owner.html") ||
        window.location.href.includes("uploadProduct.html")))
  ) {
    window.location.href = "/";
    return;
  }
  if (session && session.session) {
    login_btn.textContent = "Logout";

    login_btn.addEventListener("click", async () => {
      await logout();
      location.reload();
    });
  } else {
    login_btn.textContent = "Login";
    login_btn.addEventListener("click", () => {
      window.location.href = "/login_Signup/login.html";
    });
  }
};

sessionfunc();
const uploadImage = async (file) => {
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const uploadPreset = "products";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

if (add_product_btn) {
  add_product_btn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const file = imgInput.files[0];

    if (!name || !price || !file) {
      alert("Please enter product name, price, and select an image.");
      return;
    }

    const imageUrl = await uploadImage(file);

    if (imageUrl) {
      await addProduct(name, price, imageUrl);

      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      imgInput.value = "";
      imgRender.src = "";
      imgRender.style.display = "none";
      document.querySelector(".plus-icon").style.display = "block";

      Swal.fire({
        title: "Products added!",
        text: "Product added succesfully.",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "#764ba2",
      });
    } else {
      Swal.fire({
        title: "Products Not Added!",
        text: "Internal server error 500.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#764ba2",
      });
    }
  });
}

if (imgInput) {
  imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgRender.src = e.target.result;
        imgRender.style.display = "block";
        document.querySelector(".plus-icon").style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      imgRender.src = "";
      imgRender.style.display = "none";
      document.querySelector(".plus-icon").style.display = "block";
    }
  });
}

// DASHBOARD

const fetchData = async () => {
  const data = await getOwnerData();
  const table = document.getElementsByTagName("table")[0];
  let totalsell = 10;

  if (table) {
    data.forEach((item) => {
      table.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.price}rs</td>
          <td>${totalsell}</td>
        </tr>
      `;
      totalsell += 10;
    });
  }
};
fetchData();
