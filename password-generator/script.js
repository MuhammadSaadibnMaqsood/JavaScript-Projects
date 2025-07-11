function mainHeadingAnimation() {
    const mainHeading = document.getElementById('mainHeading');
    const headingtext = 'GENERATE STRONG PASSWORD';

    mainHeading.innerText = ''; // clear previous

    for (let i = 0; i < headingtext.length; i++) {
        setTimeout(() => {
            mainHeading.innerText = headingtext.slice(0, i + 1);
        }, i * 200);
    }
}

// Call it once immediately
mainHeadingAnimation();

// Figure out total animation time
const headingtext = 'GENERATE STRONG PASSWORD';
const totalTime = headingtext.length * 200;

// Repeat animation forever
setInterval(() => {
    mainHeadingAnimation();
}, totalTime + 500); // small pause at end


function handleClick(event) {

    window.scrollBy({
        top: 1000,
        behavior: 'smooth'
    });
}


function showValue() {
    const range = document.getElementById('myRange');
    let value = range.value;
    document.getElementById('rangeValue').innerText = value;

}
function generatepassword() {
    let length = document.getElementById('myRange').value;
    let upperCase = document.getElementById('uppercase').checked;
    let lowerCase = document.getElementById('lowercase').checked;
    let special = document.getElementById('special').checked;
    let number = document.getElementById('number').checked;


    let convertlength = Number(length);


    if (upperCase == false && lowerCase == false && special == false && number == false) {
        const formheading = document.getElementById('formHeading');
        formheading.innerText = 'Please check one of the type'
        setTimeout(() => {

            formheading.innerText = 'Genrate your password'



        }, 2000);
        return
    }
    let pass = ''
    // const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()123456789'
    let charPool = ''

    if (upperCase) {
        charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    }

    if (lowerCase) {
        charPool += 'abcdefghijklmnopqrstuvwxyz'

    }
    if (special) {
        charPool += '!@#$%^&*()'

    }
    if (number) {
        charPool += '123456789'

    }




    for (let i = 0; i < convertlength; i++) {


        let randomnum = Math.floor(Math.random() * charPool.length);
        pass += charPool[randomnum];


    }

    console.log(pass);

    document.getElementById('generateText').value = pass;




}
function copyText() {
    let pass = document.getElementById('generateText').value;
    navigator.clipboard.writeText(pass)
    let copyimage = document.getElementById('copyimage');
    copyimage.src = 'https://www.freeiconspng.com/thumbs/check-mark-png/check-mark-icon-green-0.png'

    setTimeout(() => {
        copyimage.src = 'https://cdn-icons-png.flaticon.com/512/178/178921.png'
    }, 2000);
}
