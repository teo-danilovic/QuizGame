

const HARRY_POTTER_ANSWERS = ["option1", "option2", "option2", "option1", "option2"];
const GREEK_GODS_ANSWERS = ["option1", "option2", "option1", "option2", "option1"];


let currentQuiz;
let selectedAnswers = [];
let score;
let quizInProgress = false;
let harryPotterAudio = document.getElementById("harryPotterAudio");
let greekMythologyAudio = document.getElementById("greekMythologyAudio");


const pages = {
    page1: document.getElementById("page1"),
    page2: document.getElementById("page2"),
    page3: document.getElementById("page3"),
    page4: document.getElementById("page4"),
};
const questionList = document.getElementById("questionList");
const resultsBox = document.getElementById("resultsBox");

const harryPotterBtn = document.getElementById("harryPotterBtn");
const greekGodsBtn = document.getElementById("greekGodsBtn");

const playAgainBtn = document.getElementById("playAgainBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");

const radioButtons = document.querySelectorAll("input[type='radio']");

document.addEventListener("click", (e) => {
    const target = e.target;
    console.log("event listener function")

    if (target.id === "harryPotterQuiz") startQuiz("Harry Potter");
    if (target.id === "greekGodsQuiz") startQuiz("Greek Gods");

    if (target.id === "submitQuiz") handleSubmitQuiz(HARRY_POTTER_ANSWERS);
    if (target.id === "submitQuizGreek") handleSubmitQuiz(GREEK_GODS_ANSWERS);

    if (target.id === "playAgain") restartQuiz();
    if (target.id === "backHome") showPage("page1");
    console.log(target.id)
});

function init() {
    currentQuiz = null;
    selectedAnswers = [];
    score = 0;
    quizInProgress = false;
    showPage("page1");
}


function renderQuiz() {
    showPage(currentQuiz === "Harry Potter" ? "page2" : "page3");
}

function renderResults() {
    const resultMessage =
        score >= 3
            ? `Congratulations! You scored ${score}/5. You win! 🎉`
            : `You scored ${score}/5, too bad! Want to try again? `;
    resultsBox.textContent = resultMessage;

    showPage("page4");
}


function startQuiz(quizType) {
    currentQuiz = quizType;
    selectedAnswers = [];
    quizInProgress = true;
    radioButtons.forEach((radio) => (radio.checked = false));
    harryPotterAudio.play();
    greekMythologyAudio.play();
    renderQuiz();
}

function handleSubmitQuiz(correctAnswers) {
    selectedAnswers = [];
    for (let i = 1; i <= 5; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        selectedAnswers.push(selectedOption ? selectedOption.value : null);
    }

    score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (selectedAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }

    quizInProgress = false;
    renderResults();
}

function restartQuiz() {
    quizInProgress = true;
    score = 0;
    selectedAnswers = [];
    radioButtons.forEach((radio) => (radio.checked = false));
    harryPotterAudio.play();
    greekMythologyAudio.play();
    renderQuiz();
}


function showPage(pageId) {
    if (pageId === "page1" || pageId === "page3" || pageId === "page4") {
        harryPotterAudio.pause();
    }

    if (pageId === "page1" || pageId === "page2" || pageId === "page4") {
        greekMythologyAudio.pause();
    }

    Object.values(pages).forEach((page) => page.classList.remove("active"));
    pages[pageId].classList.add("active");
}

init();