const btn = document.querySelector(".btn"); // Selects the first button with class 'btn'
const main = document.querySelector(".main"); // Selects the first element with class 'main'

// Event listener for creating a new note
btn.addEventListener("click", (e) => {
    const div = document.createElement("div"); // Create div
    const textArea = document.createElement("textarea"); // Create textarea
    const imgsave = document.createElement("img"); // Save button
    const imgsdlt = document.createElement("img"); // Delete button
    
    textArea.classList.add("txt");
    imgsave.classList.add("save");
    imgsdlt.classList.add("dlt");
    imgsave.src = "images/save.png";
    imgsdlt.src = "images/delete.png";

    div.appendChild(textArea); // Append textarea inside div
    div.appendChild(imgsave); // Append save icon inside div
    div.appendChild(imgsdlt); // Append delete icon inside div
    div.classList.add("createNotes"); // Correctly add class
    
    main.appendChild(div); // Append the new div inside 'main'
});

// Event delegation for dynamically added save buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("save")) {
        let textArea = e.target.parentElement.querySelector(".txt");
        if (textArea.value.trim() !== "") {
            saveData(textArea.value);
        } else {
            alert("There is no content to save");
        }
    }
});document.addEventListener("click", (e) => {
    if (e.target.classList.contains("dlt")) {
        let noteDiv = e.target.parentElement;
        let textValue = noteDiv.querySelector(".txt").value; // Get note text

        noteDiv.remove(); // Remove from UI
        deleteFromLocalStorage(textValue); // Remove from storage
    }
});

// Function to save all notes in localStorage
function saveData() {
    let notes = [];
    document.querySelectorAll(".txt").forEach(textarea => {
        notes.push(textarea.value);
    });
    localStorage.setItem("data", JSON.stringify(notes)); // Store as an array
}

// Function to delete a specific note from localStorage
function deleteFromLocalStorage(textValue) {
    let notes = JSON.parse(localStorage.getItem("data")) || []; // Get all notes
    let updatedNotes = notes.filter(note => note !== textValue); // Remove deleted note
    localStorage.setItem("data", JSON.stringify(updatedNotes)); // Update storage
}

// Function to get and display saved notes on page load
function getData() {
    let savedNotes = JSON.parse(localStorage.getItem("data")) || []; // Get all notes
    savedNotes.forEach(noteText => {
        const div = document.createElement("div");
        const textArea = document.createElement("textarea");
        textArea.classList.add("txt");
        textArea.value = noteText;

        const imgsave = document.createElement("img");
        const imgsdlt = document.createElement("img");
        imgsave.classList.add("save");
        imgsdlt.classList.add("dlt");
        imgsave.src = "images/save.png";
        imgsdlt.src = "images/delete.png";

        div.appendChild(textArea);
        div.appendChild(imgsave);
        div.appendChild(imgsdlt);
        div.classList.add("createNotes");

        main.appendChild(div);
    });
}

// Load saved notes on page load
getData();
