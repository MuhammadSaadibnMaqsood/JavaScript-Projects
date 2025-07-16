const qNa = [
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answer: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answer: [
            { text: "CO2", correct: false },
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false }
        ]
    }
];

let questionElement = document.getElementById("question"); // Corrected ID
let answersElement = document.getElementById("answers");
let score = 0;
let currentQuestion = 0;

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    showQuiz();
}

function showQuiz() {
    if (currentQuestion >= qNa.length) {
        showScore();
        return; // Prevents further execution
    }

    questionElement.textContent = qNa[currentQuestion].question;
    answersElement.innerHTML = ""; // Clears previous answers

    qNa[currentQuestion].answer.forEach(ans => {
        const li = document.createElement("li");
        li.textContent = ans.text;
        li.addEventListener("click", () => {
            if (ans.correct) { // Fixed boolean check
                score++;
            }
            currentQuestion++;
            showQuiz();
        });
        answersElement.appendChild(li);
    });
}

function showScore(){
    answersElement.innerHTML="";
    questionElement.innerHTML = `Congrats, your score is ${score}`;
    let btn = document.createElement("button");
    btn.innerHTML = "Play again";
    btn.addEventListener("click", startQuiz); // Restart game on click
    questionElement.appendChild(btn); // Corrected append
}

// Start the quiz when the page loads
startQuiz();
