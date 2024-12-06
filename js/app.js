// /* 
// 1. Define constants and variables.
// 2. Define the app’s state variables, but don’t assign values to them.
// 3. Select and save (cache) elements in variables that need to be accessed in the JavaScript code more than once.
// 4. Add event listeners - use delegated event listeners to listen to multiple elements with a single listener.
// 5. Invoke the init function used to initialize all state variables.
// 6. Invoke the primary render function that transfers all state variables to the DOM.
// 7. Wait for the user to click on a button.
// - Update all state variables with the correct values depending on the user’s choice.
// - Invoke the primary render function.
// 8. Wait for the user to click the “Play Again” button.
// - Invoke the init function to reset all state variables to their initial values.

// */  

// /*-------------- Constants -------------*/
// const harryPotterQuestions = [
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
// ];

// const greekGodQuestions = [
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
//     { question: "", options: ["", ""], correct: 1 },
// ];


// const winningCombinations = [
// ]

// let (i = 0; i <= 3; i++); {


// }

// /*---------- Variables (state) ---------*/
// let score
// let currentQuestion = QUESTIONS[currentQuestionIndex]
// let questions
// let currentQuestionIndex
// let selectedOption 
// let isAnswered
// let correctAnswersCount
// let winner 
// let optionsChosen





// /*----- Cached Element References  -----*/


// /*-------------- Functions -------------*/
// const handleBoxClick = 

// function render(){}

// function loadQuestion() {
//     let currentQuestion = QUESTIONS[currentQuestionIndex];
//     console.log(`Question: ${currentQuestion.question}`);
//     console.log(`Options: ${currentQuestion.options.join(", ")}`);
// }

// const init = () => {
//     score = 0;
//     currentQuestionIndex = 0;
//     questions = QUESTIONS;
//     correctAnswersCount = 0;
//     gameOver = false;
//     optionsChosen = [ '', '', '', '', '', '', '', '', '', '', ];
//     winner = false 
//     loadQuestion();

//     render();
// }

// const storeAnswer = (option) => {
//     optionsChosen[currentQuestionIndex] = option;
// }

// const checkAnswer = () => {

// }

// /*----------- Event Listeners ----------*/


/***************
 * Step 1: Define constants and variables
 ***************/

// Define correct answers for each quiz
const HARRY_POTTER_ANSWERS = ["option1", "option2", "option2", "option1", "option2"];
const GREEK_GODS_ANSWERS = ["option1", "option2", "option1", "option2", "option1"];


// State variables
let currentQuiz; // Tracks the current quiz type
let selectedAnswers = []; // Stores user's selected answers
let score; // Tracks the score
let quizInProgress = false; // Tracks whether a quiz is in progress
let harryPotterAudio = document.getElementById("harryPotterAudio");
let greekMythologyAudio = document.getElementById("greekMythologyAudio");

/***************
 * Step 2: Cache DOM elements
 ***************/
const pages = {
    page1: document.getElementById("page1"),
    page2: document.getElementById("page2"),
    page3: document.getElementById("page3"),
    page4: document.getElementById("page4"),
};
// const quizTitle = document.getElementById("greekGodsTitle");
const questionList = document.getElementById("questionList");
const resultsBox = document.getElementById("resultsBox");

const harryPotterBtn = document.getElementById("harryPotterBtn");
const greekGodsBtn = document.getElementById("greekGodsBtn");

const playAgainBtn = document.getElementById("playAgainBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");

const radioButtons = document.querySelectorAll("input[type='radio']");
/***************
 * Step 3: Add event listeners
 ***************/

// Delegated event listeners for all buttons
document.addEventListener("click", (e) => {
    const target = e.target;
    console.log("event listener function")

    // Navigation from Home Page
    if (target.id === "harryPotterQuiz") startQuiz("Harry Potter");
    if (target.id === "greekGodsQuiz") startQuiz("Greek Gods");

    // Submit button for quizzes
    if (target.id === "submitQuiz") handleSubmitQuiz(HARRY_POTTER_ANSWERS);
    if (target.id === "submitQuizGreek") handleSubmitQuiz(GREEK_GODS_ANSWERS);


    // Results Page Buttons
    if (target.id === "playAgain") restartQuiz();
    if (target.id === "backHome") showPage("page1");
    console.log(target.id)
});

/***************
 * Step 4: Initialize the app
 ***************/
function init() {
    currentQuiz = null;
    selectedAnswers = [];
    score = 0;
    quizInProgress = false;
    showPage("page1"); // Show the home page by default
}

/***************
 * Step 5: Render Function
 ***************/

// Render the quiz page dynamically
function renderQuiz() {
    showPage(currentQuiz === "Harry Potter" ? "page2" : "page3");
}

// Render the results page
function renderResults() {
    const resultMessage =
        score >= 3
            ? `Congratulations! You scored ${score}/5. You win! 🎉`
            : `You scored ${score}/5, too bad! Want to try again? `;
    resultsBox.textContent = resultMessage;

    // Show the results page
    showPage("page4");
}

/***************
 * Step 6: Quiz Logic
 ***************/

// Start a quiz
function startQuiz(quizType) {
    currentQuiz = quizType;
    selectedAnswers = [];
    quizInProgress = true;
    radioButtons.forEach((radio) => (radio.checked = false));
    harryPotterAudio.play();
    greekMythologyAudio.play();
    renderQuiz(); // Render the quiz
}

// Handle quiz submission
function handleSubmitQuiz(correctAnswers) {
    selectedAnswers = [];
    for (let i = 1; i <= 5; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        selectedAnswers.push(selectedOption ? selectedOption.value : null);
    }

    // add query selector.all to get all questions - you can get an array of questions. questionArray.length

    // Calculate score
    score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (selectedAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }

    // Show results 
    quizInProgress = false;
    renderResults();
}

// Restart the quiz
function restartQuiz() {
    quizInProgress = true;
    score = 0;
    selectedAnswers = [];
    radioButtons.forEach((radio) => (radio.checked = false));
    harryPotterAudio.play();
    greekMythologyAudio.play();
    renderQuiz(); // Re-render the current quiz
}

/***************
 * Utility Functions
 ***************/

// Show a specific page and hide the others
function showPage(pageId) {
    if (pageId === "page1") {
        harryPotterAudio.pause();
    }
    if (pageId === "page4") {
        harryPotterAudio.pause();
    }
    if (pageId === "page3") {
        harryPotterAudio.pause();
    }
    
    if (pageId === "page1") {
        greekMythologyAudio.pause();
    }
    if (pageId === "page4") {
        greekMythologyAudio.pause();
    }
    if (pageId === "page2") {
        greekMythologyAudio.pause();
    }

    Object.values(pages).forEach((page) => page.classList.remove("active"));
    pages[pageId].classList.add("active");
}


// A function to show the selected page and hide others




/***************
 * Initialize the app
 ***************/
init();


//TO-DO: Add music to greek mythology page. 
// TO-DO: check how to make link copyable so multiple people can play the game.

