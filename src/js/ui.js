import { gameState } from "./gameState.js";

export const questionText = document.getElementById("question-text");
export const answerText = document.getElementById("answer-text");
export const highScoreText = document.getElementById("high-score");
export const countdownText = document.getElementById("countdown");
export const startButton = document.getElementById("start-button");
export const quizContainer = document.getElementById("quiz-container");
export const currentPointText = document.getElementById("current-point");
// Update current point and question index
export function updateCurrentPoint(isCorrect) {
  isCorrect
    ? ((gameState.currentPoint += 100),
      currentPointText.classList.add("text-green-500"),
      setTimeout(
        () => currentPointText.classList.remove("text-green-500"),
        3000
      ))
    : ((gameState.currentPoint -= 100),
      currentPointText.classList.add("text-red-500"),
      setTimeout(
        () => currentPointText.classList.remove("text-red-500"),
        3000
      ));
  gameState.currentQuestionIndex++;
  updateCurrentPointText();
}
// Update styles for correct and incorrect answers
function updateIncorrectAnswersStyle(el, correctEl) {
  correctEl.classList.remove("bg-sky-500", "hover:bg-sky-700");
  correctEl.classList.add("bg-green-500");
  el.classList.remove("bg-sky-500", "hover:bg-sky-700");
  el.classList.add("bg-red-500");
  setTimeout(() => {
    correctEl.classList.add("bg-sky-500", "hover:bg-sky-700");
    correctEl.classList.remove("bg-green-500");
    el.classList.add("bg-sky-500", "hover:bg-sky-700");
    el.classList.remove("bg-red-500");
  }, 3000);
}
function updateCorrectAnswersStyle(el) {
  el.classList.remove("bg-sky-500", "hover:bg-sky-700");
  el.classList.add("bg-green-500");
  setTimeout(() => {
    el.classList.add("bg-sky-500", "hover:bg-sky-700");
    el.classList.remove("bg-green-500");
  }, 3000);
}

export function hideQuizContainer() {
  startButton.classList.remove("hidden");
  quizContainer.classList.add("hidden");
  quizContainer.classList.remove("flex");
}
export function showQuizContainer() {
  startButton.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  quizContainer.classList.add("flex");
}
// Show ending alert with score summary
export function showEndingAlert() {
  Swal.fire({
    title: "Done! Your score is " + gameState.currentPoint,
    text:
      "You got " +
      gameState.countRightAnswers +
      " correct answers and " +
      gameState.countWrongAnswers +
      " wrong answers. Do you want to try again?",
    icon: "success",
    confirmButtonText: "Yah sure!",
    denyButtonText: "No, thanks",
    showDenyButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}
// Update styles based on answer correctness
export function updateStyles(element, isCorrect, correctAnswerElement) {
  if (isCorrect) {
    gameState.countRightAnswers++;
    updateCorrectAnswersStyle(element);
  } else {
    gameState.countWrongAnswers++;
    updateIncorrectAnswersStyle(element, correctAnswerElement);
  }
}
// Update countdown
export function updateCountdown() {
  gameState.timeLeft--;
  countdownText.innerText = `Time: ${gameState.timeLeft}s`;
}
// Render question and answers UI
export function renderQuestionUI(index) {
  gameState.statusOfGame = "active";
  const currentQuestion = gameState.questions[index].question;
  const currentAnswers = gameState.questions[index].answers;
  questionText.innerText = `${gameState.questions[index].id}. ${currentQuestion}`;
  answerText.setAttribute(
    "data-correct-index",
    gameState.questions[index].correctIndex
  );
  const listOfAnswers = answerText.querySelectorAll("li");
  listOfAnswers.forEach((li, i) => {
    li.innerText = currentAnswers[i];
  });
}
// Show correct answer if time runs out
export function showCorrectAnswer() {
  const correctAnswerIndex = answerText.getAttribute("data-correct-index");
  const correctAnswerElement = answerText.querySelector(
    "li[data-index= '" + correctAnswerIndex + "' ]"
  );
  updateStyles(correctAnswerElement, true, null);
  updateCurrentPoint(false);
}

export function updateHighScore() {
  highScoreText.innerText = `High Score: ${gameState.highScore}`;
}
export function updateCurrentPointText() {
  currentPointText.innerText = `Current point: ${gameState.currentPoint}`;
}
