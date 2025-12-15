import "./style.css";

const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const currentPointText = document.getElementById("current-point");
const highScoreText = document.getElementById("high-score");
const countdownText = document.getElementById("countdown");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questions = [
  "1. Which city is the capital of Vietnam?",
  "2. In Vietmanese cuisine, what is a bánh mì closest to?",
  "3. Phong Nha National Park is home to the world’s largest what?",
  "4. In which mountainous town does the Love Market traditionally take place?",
  "5. What is the unusual ingredient you’ll find in Cà phê trứng coffee?",
  "6. Where will you find the UNESCO-listed Purple Forbidden City?",
  "7. What currency is used in Vietnam?",
  "8. In what year did Halong Bay become inscribed by UNESCO?",
  "9. Ho Chi Minh city was renamed after the revolutionary leader who fought for Vietnamese independence. But what was it called before 1975?",
  "10. What species of monkey can you expect to see at Cat Tien National Park?",
  "11. The Vietnamese celebrate their New Year in mid-January to mid-February, depending on the lunar calendar. What do they call it?",
  "12. Vietnam is the third-largest exporter of what?",
  "13. How many stars are on the Vietnamese flag?",
  "14. In which province will you find the Tràng An Scenic Landscape Complex?",
  "15. What is the name of the train that runs from north to south Vietnam?",
];
const answers = [
  ["A. Ho Chi Minh", "B. Hanoi", "C. Hue", "D. Da Nang", 1],
  ["A. Stirfry", "B. Soup", "C. Stew", "D. Sandwich", 3],
  ["A. Tree", "B. Lagoon", "C. Pinnacle formation", "D. Cave", 3],
  ["A. Sapa", "B. Mai Chau", "C. Pleiku", "D. Cat Cat", 0],
  ["A. Cheese", "B. Egg", "C. Chilli", "D. Rice", 1],
  ["A. Dalat", "B. Vinh", "C. Hue", "D. Mỹ Tho", 2],
  ["A. Dong", "B. Ding", "C. Dang", "D. Sung", 0],
  ["A. 1986", "B. 1990", "C. 1994", "D. 1998", 2],
  ["A. Saigon", "B. Ly Thai To", "C. Thành phố", "D. Faifo", 0],
  ["A. Saki", "B. Howler", "C. Macaque", "D. Gibbons", 3],
  ["A. Tết", "B. Lim", "C. Xến Xó Phốn", "D. Oóc Om Bóc", 0],
  ["A. Cocoa", "B. Rice", "C. Coffee", "D. Olive oil", 1],
  ["A. One", "B. Two", "C. Three", "D. Four", 0],
  ["A. Lam Dong", "B. Dak Lak", "C. Dong Nai", "D. Ninh Binh", 3],
  [
    "A. Independence Express",
    "B. Red and Yellow Express",
    "C. Reunification Express",
    "D. Starlight Express",
    2,
  ],
];

let currentPoint = 0;
let currentQuestionIndex = 0;
let statusOfGame = "";
let highScore = localStorage.getItem("highScore");
let countRightAnswers = 0;
let countWrongAnswers = 0;
let countdownInterval = null;
let timeLeft = 15;
// Initialize high score if not present
if (!highScore) {
  localStorage.setItem("highScore", 0);
  highScore = 0;
}
highScoreText.innerText = `High Score: ${highScore}`;

// Reset game to initial state
function resetGame() {
  if (currentPoint > highScore) {
    highScore = currentPoint;
    localStorage.setItem("highScore", highScore);
    highScoreText.innerText = `High Score: ${highScore}`;
  }
  currentPoint = 0;
  currentQuestionIndex = 0;
  countRightAnswers = 0;
  countWrongAnswers = 0;
  currentPointText.innerText = currentPoint;
  startButton.classList.remove("hidden");
  quizContainer.classList.add("hidden");
  quizContainer.classList.remove("flex");
  clearInterval(countdownInterval);
  timeLeft = 15;
  renderQuestion(currentQuestionIndex);
  return;
}
// Update styles based on answer correctness
function updateStyles(element, isCorrect, correctAnswerElement) {
  if (isCorrect) {
    countRightAnswers++;
    element.classList.remove("bg-sky-500", "hover:bg-sky-700");
    element.classList.add("bg-green-500");
    setTimeout(() => {
      element.classList.add("bg-sky-500", "hover:bg-sky-700");
      element.classList.remove("bg-green-500");
    }, 3000);
  } else {
    countWrongAnswers++;
    correctAnswerElement.classList.remove("bg-sky-500", "hover:bg-sky-700");
    correctAnswerElement.classList.add("bg-green-500");
    element.classList.remove("bg-sky-500", "hover:bg-sky-700");
    element.classList.add("bg-red-500");
    setTimeout(() => {
      correctAnswerElement.classList.add("bg-sky-500", "hover:bg-sky-700");
      correctAnswerElement.classList.remove("bg-green-500");
      element.classList.add("bg-sky-500", "hover:bg-sky-700");
      element.classList.remove("bg-red-500");
    }, 3000);
  }
}
// Render question, answers and countdown
function renderQuestion(index) {
  if (index >= questions.length) {
    Swal.fire({
      title: "Done! Your score is " + currentPoint,
      text:
        "You got " +
        countRightAnswers +
        " correct answers and " +
        countWrongAnswers +
        " wrong answers. Do you want to try again?",
      icon: "success",
      confirmButtonText: "Yah sure!",
      denyButtonText: "No, thanks",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    resetGame();
  } else {
    // Render question and answers
    statusOfGame = "active";
    const currentQuestion = questions[index];
    const currentAnswer = answers[index];
    questionText.innerText = currentQuestion;
    answerText.setAttribute("data-correct-index", currentAnswer[4]);
    const listOfAnswers = answerText.querySelectorAll("li");
    listOfAnswers.forEach((li, i) => {
      li.innerText = currentAnswer[i];
    });
    // Reset countdown
    timeLeft = 15;
    countdownText.innerText = `Time: ${timeLeft}s`;
  }
}
// Handle countdown timer
function startCountdown() {
  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      // Update countdown
      timeLeft--;
      countdownText.innerText = `Time: ${timeLeft}s`;
    } else {
      // Handle time out
      statusOfGame = "waiting";
      timeLeft = 15;
      // Show corect answer
      const correctAnswerIndex = answerText.getAttribute("data-correct-index");
      const correctAnswerElement = answerText.querySelector(
        "li[data-index= '" + correctAnswerIndex + "' ]"
      );
      // If time runs out
      clearInterval(countdownInterval);
      updateStyles(correctAnswerElement, true);
      updateCurrentPoint(false);
      setTimeout(() => {
        renderQuestion(currentQuestionIndex);
        startCountdown();
      }, 3000);
    }
  }, 1000);
}
// Update current point and question index
function updateCurrentPoint(isCorrect) {
  isCorrect
    ? ((currentPoint += 100),
      currentPointText.classList.add("text-green-500"),
      setTimeout(
        () => currentPointText.classList.remove("text-green-500"),
        3000
      ))
    : ((currentPoint -= 100),
      currentPointText.classList.add("text-red-500"),
      setTimeout(
        () => currentPointText.classList.remove("text-red-500"),
        3000
      ));
  currentQuestionIndex++;
  currentPointText.innerText = `Current point: ${currentPoint}`;
}
// Initial render
startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  quizContainer.classList.add("flex");
  renderQuestion(currentQuestionIndex);
  startCountdown();
});
// Handle answer chosen
answerText.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    if (statusOfGame === "waiting") {
      return;
    }
    statusOfGame = "waiting";
    const selectedAsnwerIndex = e.target.getAttribute("data-index");
    const correctAnswerIndex = answerText.getAttribute("data-correct-index");

    // Check answer
    if (selectedAsnwerIndex == correctAnswerIndex) {
      updateStyles(e.target, true, null);
      updateCurrentPoint(true);
      // Stop countdown
      clearInterval(countdownInterval);
      timeLeft = 15;
      setTimeout(() => {
        renderQuestion(currentQuestionIndex);
        startCountdown();
      }, "3000");
    } else {
      const correctAnswers = answerText.querySelector(
        "li[data-index= '" + correctAnswerIndex + "' ]"
      );
      updateStyles(e.target, false, correctAnswers);
      updateCurrentPoint(false);
      // Stop countdown
      clearInterval(countdownInterval);
      timeLeft = 15;
      setTimeout(() => {
        renderQuestion(currentQuestionIndex);
        startCountdown();
      }, "3000");
    }
  }
});
