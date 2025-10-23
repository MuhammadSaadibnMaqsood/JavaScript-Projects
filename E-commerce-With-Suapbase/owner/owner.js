import { addProduct } from "../db.js";
const cloudName = "dnltltfsk";
const add_product_btn = document.getElementById("add-product");
const imgInput = document.getElementById("img");
const imgRender = document.querySelector(".img-render");

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
    console.log("Image URL (from Cloudinary direct upload):", imageUrl);


    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    imgInput.value = ""; 
    imgRender.src = "";
    imgRender.style.display = "none";
    document.querySelector(".plus-icon").style.display = "block";
  } else {
    alert("Failed to upload image. Please try again.");
  }
});

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
