import { gameState } from "./gameState.js";
import {
  renderQuestionUI,
  showEndingAlert,
  countdownText,
  hideQuizContainer,
  updateCountdown,
  showCorrectAnswer,
  updateHighScore,
  updateStyles,
  answerText,
  updateCurrentPoint,
  updateCurrentPointText,
  startButton,
} from "./ui.js";
import { loadQuestions } from "./quizService.js";
// Check logic to render next question or end game
export function renderQuestion(index) {
  if (index >= gameState.questions.length) {
    showEndingAlert();
    resetGame();
  } else {
    renderQuestionUI(index);
    // Reset countdown
    gameState.timeLeft = 15;
    countdownText.innerText = `Time: ${gameState.timeLeft}s`;
  }
}
// Reset game to initial state
export function resetGame() {
  if (gameState.currentPoint > gameState.highScore) {
    gameState.highScore = gameState.currentPoint;
    localStorage.setItem("highScore", gameState.highScore);
    updateHighScore();
  }
  updateHighScore();
  gameState.currentPoint = 0;
  gameState.currentQuestionIndex = 0;
  gameState.countRightAnswers = 0;
  gameState.countWrongAnswers = 0;
  updateCurrentPointText();
  hideQuizContainer();
  clearInterval(gameState.countdownInterval);
  gameState.timeLeft = 15;
  return;
}
// Handle countdown timer
export function startCountdown() {
  gameState.countdownInterval = setInterval(() => {
    if (gameState.timeLeft > 0) {
      // Update countdown
      updateCountdown();
    } else {
      // Show correct answer
      showCorrectAnswer();
      // Handle time out
      gameState.statusOfGame = "waiting";
      gameState.timeLeft = 15;
      clearInterval(gameState.countdownInterval);
      setTimeout(() => {
        renderQuestion(gameState.currentQuestionIndex);
        startCountdown();
      }, 3000);
    }
  }, 1000);
}
// Stop countdown timer
export function stopCountdown() {
  clearInterval(gameState.countdownInterval);
  gameState.timeLeft = 15;
  setTimeout(() => {
    renderQuestion(gameState.currentQuestionIndex);
    startCountdown();
  }, "3000");
}
// Handle answer selection
export function handleAnswerSelection(e) {
  if (e.target.tagName === "LI") {
    if (gameState.statusOfGame === "waiting") {
      return;
    }
    gameState.statusOfGame = "waiting";
    const selectedAnswerIndex = e.target.getAttribute("data-index");
    const correctAnswerIndex = answerText.getAttribute("data-correct-index");
    // Check answer
    if (selectedAnswerIndex == correctAnswerIndex) {
      updateStyles(e.target, true, null);
      updateCurrentPoint(true);
      stopCountdown();
    } else {
      const correctAnswers = answerText.querySelector(
        "li[data-index= '" + correctAnswerIndex + "' ]"
      );
      updateStyles(e.target, false, correctAnswers);
      updateCurrentPoint(false);
      stopCountdown();
    }
  }
}
// Initial render
export async function init() {
  try {
    gameState.questions = await loadQuestions();
    updateCurrentPointText();
    updateHighScore();
    startButton.disabled = false;
    startButton.classList.remove("opacity-50", "cursor-not-allowed");
    startButton.classList.add("cursor-pointer");
  } catch (err) {
    console.error(err);
  }
}
