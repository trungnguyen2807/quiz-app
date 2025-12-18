import { gameState } from "./gameState.js";
import {
  renderQuestionUI,
  showEndingAlert,
  countdownText,
  hideQuizContainer,
  updateCountdown,
} from "./ui.js";
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
  currentPointText.innerText = `Current point: ${gameState.currentPoint}`;
}
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
    highScoreText.innerText = `High Score: ${gameState.highScore}`;
  }
  gameState.currentPoint = 0;
  gameState.currentQuestionIndex = 0;
  gameState.countRightAnswers = 0;
  gameState.countWrongAnswers = 0;
  currentPointText.innerText = gameState.currentPoint;
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
