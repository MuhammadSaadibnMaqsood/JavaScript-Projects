let promt = document.querySelector(".prompt");
const chatContainer = document.querySelector(".chatHandler");
const imgbtn = document.querySelector(".upload");
const uploadImg = document.querySelector(".upload img");
const imginput = document.querySelector(".upload input");

const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDyWPpRz3NYD_zf_Oyk-vKsgseEM47IxgE"

let user = {
    file: {
        mime_type: null,
        data: null
    }
}

function scrollToBottom() {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth"
    });
}



async function getResponse(message) {
    let requestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{
                "parts": [{ "text": message }, (user.file.data ? [{ "inline_data": user.file }] : [])
                ]
            }]
        })

    }
    try {

        let response = await fetch(url, requestOption);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text.trim();
        let aiHtml = `<div class="ai-chat chat"><img class="" src="12.Ai ChatBot/ai.png" alt="ai"><div class="">${apiResponse}</div></div>`
        chatContainer.innerHTML = chatContainer.innerHTML + aiHtml
        scrollToBottom();

        // return apiResponse;
    } catch (error) {
        console.log(error)
    }

}
function handleRespone(message) {
    let html = ` <div class="user-chat chat"><div class="imgParent">${message}${user.file.data ? `<img src="data: ${user.file.mime_type};base64,${user.file.data}"id = "chooseimg" />` : ""}</div><img src="12.Ai ChatBot/user.png" alt="ai"></div>`
    chatContainer.innerHTML = chatContainer.innerHTML + html
    scrollToBottom();

    getResponse(message);

}
promt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handleRespone(promt.value);
        uploadImg.src =`12.Ai ChatBot/submit.svg`
        promt.value = "";
    }
})

imginput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        let base64str = event.target.result.split(",")[1];
        user.file = {
            mime_type: file.type,
            data: base64str
        }
        uploadImg.src =`data: ${user.file.mime_type};base64,${user.file.data}`
    };
    reader.readAsDataURL(file);
});


imgbtn.addEventListener("click", () => {
    imgbtn.querySelector("input").click();
})