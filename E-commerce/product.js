const products = [
  {
    id: "1",
    productName: "Bag",
    img: "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?fm=jpg&q=60&w=3000",
    price: 3500,
    description: "Stylish leather bag perfect for everyday use.",
  },
  {
    id: "2",
    productName: "Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000",
    price: 4200,
    description: "Comfortable running shoes with premium quality.",
  },
  {
    id: "3",
    productName: "Watch",
    img: "https://plus.unsplash.com/premium_photo-1681504446264-708b83f4ea12",
    price: 8000,
    description: "Classic wrist watch with modern design.",
  },
  {
    id: "6",
    productName: "Men Shirt",
    img: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff",
    price: 2500,
    description: "Casual men’s shirt made with soft cotton fabric.",
  },
  {
    id: "4",
    productName: "Sofa",
    img: "https://images.unsplash.com/photo-1601568494843-772eb04aca5d",
    price: 6000,
    description: "Trendy fashion wear for all occasions.",
  },
  {
    id: "5",
    productName: "Sofa",
    img: "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1",
    price: 1800,
    description: "Lightweight and comfortable casual clothes.",
  },
];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

const product = products.find((p) => p.id === id);

const container = document.getElementById("product-detail");
console.log(container);

if (product) {
  container.innerHTML = `
    <div class="product-image">
      <img src="${product.img}" alt="${product.productName}">
    </div>
    <div class="product-info">
      <h1>${product.productName}</h1>
      <p class="price">Rs ${product.price}</p>
      <p class="description">${product.description}</p>
      <button onClick = "handleClick()">Order now</button>
      <a href="index.html" class="btn">⬅ Back to Products</a>
    </div>
  `;
}
function handleClick() {
  Swal.fire({
    title: "Order Placed",
    icon: "success",
    draggable: true,
  });
}
