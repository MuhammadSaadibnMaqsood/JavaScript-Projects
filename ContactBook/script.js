import { getData, deleteData, addData, editData } from "./db.js";

const addbtn = document.getElementById("addbtn");
const overlay = document.querySelector(".overlay");
const addContactBtn = document.getElementById("add-Contact-btn");
const editContactBtn = document.getElementById("edit-Contact-btn");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");

function initTilt() {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    scale: 1.1,
  });
}

let editId = null;

// Overlay open for Add
addbtn.addEventListener("click", () => {
  overlay.classList.add("show");

  // reset form
  nameInput.value = "";
  numberInput.value = "";

  addContactBtn.disabled = false;
  editContactBtn.disabled = true;
});

// Add contact
addContactBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const contact = numberInput.value.trim();

  if (!name || !contact) {
    alert("Please fill all fields!");
    return;
  }

  await addData(name, contact);
  Swal.fire({
    title: "Contact Added!",
    text: "",
    icon: "success",
  });
  await renderContact();

  overlay.classList.remove("show");
});

// Edit contact
editContactBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const contact = numberInput.value.trim();

  if (!name || !contact) {
    alert("Please fill all fields!");
    return;
  }

  await editData(editId, name, contact);
  Swal.fire({
    title: "Contact Edited!",
    text: "",
    icon: "success",
  });
  await renderContact();

  overlay.classList.remove("show");
  editId = null;
});

// Render contacts
async function renderContact() {
  const data = await getData();
  const cardHolder = document.querySelector(".cardHolder");
  cardHolder.innerHTML = "";

  data.forEach((con) => {
    cardHolder.innerHTML += `
      <div id="${con.id}" class="card">
        <div class="delete-div">
          <button class="delete-btn" data-id="${con.id}">
            <img height="15px" width="15px" src="./delete.png" alt="delete"/>
          </button>
        </div>
        <div>
          <p>Name: ${con.Name}</p>
          <button class="edit-btn edit-btn-function" data-id="${con.id}">
            <img height="15px" width="15px" src="./edit.png" alt="edit"/>
          </button>
        </div>
        <div>
          <p>Contact: ${con.Number}</p>
        </div>
      </div>
    `;
  });

  initTilt();
}

// Delete & Edit handlers
document.addEventListener("click", async (e) => {
  // Delete
  if (e.target.closest(".delete-btn")) {
    const id = e.target.closest(".delete-btn").dataset.id;
    await deleteData(id);
    Swal.fire({
      title: "Contact deleted!",
      text: "",
      icon: "success",
    });
    renderContact();
  }

  // Edit
  if (e.target.closest(".edit-btn-function")) {
    editId = e.target.closest(".edit-btn-function").dataset.id;

    overlay.classList.add("show");
    addContactBtn.disabled = true;
    editContactBtn.disabled = false;

    const card = document.getElementById(editId);
    nameInput.value = card.querySelector("p").innerText.replace("Name: ", "");
    numberInput.value = card
      .querySelectorAll("p")[1]
      .innerText.replace("Contact: ", "");
  }
});

// Initial load
renderContact();
