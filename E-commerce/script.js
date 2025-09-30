const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const heroImg = [
  "https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_640.jpg",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdhdGNofGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3P-zTxWmBJE0Z92rUQXLzLFAJ09n9Z4rYDQ&s",
];

const hero = () => {
  const imgTag = document.querySelector("#hero-Img");
  let index = 0;

  //   console.log(imgTag);

  setInterval(() => {
    imgTag.src = heroImg[index];
    index = (index + 1) % heroImg.length; // last ke baad wapas 0 pe
  }, 3000); // 3 sec baad image change
};

hero();

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

function renderProducts() {
  const div = document.getElementById("allProductDiv");
  console.log(div);

  products.map((product) => {
    div.innerHTML += ` <div
          class="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
        >
       <a href="product.html?id=${product.id}">
          <img
            class="h-full w-full object-cover"
            src=${product.img}
            alt=${product.productName}
          />
        </a>
        </div>`;
  });
}
renderProducts();

const faqsData = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive an email with the tracking link and details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, PayPal, and Cash on Delivery in select locations.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items within 7 days of delivery for a full refund.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, free shipping is available on all orders above Rs 3,000.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Yes, orders can be changed or canceled before they are shipped. Contact our support team quickly.",
  },
];

const faqContainer = document.getElementById("faqContainer");

faqContainer.innerHTML = faqsData
  .map(
    (faq, index) => `
  <div class="faq-item" data-index="${index}">
    <div class="faq-header">
      <h2>${faq.question}</h2>
      <svg class="faq-icon" width="20" height="20" viewBox="0 0 18 18" fill="none">
        <path d="M4.5 7.2L9 11.7L13.5 7.2" stroke="#111827" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
    <p class="faq-answer">${faq.answer}</p>
  </div>
`
  )
  .join("");

document.querySelectorAll(".faq-item").forEach((item) => {
  const header = item.querySelector(".faq-header");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  header.addEventListener("click", () => {
    const isActive = answer.classList.contains("active");

    document
      .querySelectorAll(".faq-answer")
      .forEach((ans) => ans.classList.remove("active"));
    document
      .querySelectorAll(".faq-icon")
      .forEach((ic) => ic.classList.remove("rotate"));

    if (!isActive) {
      answer.classList.add("active");
      icon.classList.add("rotate");
    }
  });
});
