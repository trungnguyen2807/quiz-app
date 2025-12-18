import "./style.css";
import { loadQuestions } from "./js/quizService.js";
import { gameState } from "./js/gameState.js";
import {
  answerText,
  startButton,
  highScoreText,
  showQuizContainer,
  updateStyles,
} from "./js/ui.js";
import {
  updateCurrentPoint,
  renderQuestion,
  startCountdown,
  stopCountdown,
} from "./js/logic.js";
// Fetch questions and answers from JSON file
async function init() {
  try {
    gameState.questions = await loadQuestions();
  } catch (err) {
    console.error(err);
  }
}
init();
highScoreText.innerText = `High Score: ${gameState.highScore}`;
// Initial render
startButton.addEventListener("click", () => {
  showQuizContainer();
  renderQuestion(gameState.currentQuestionIndex);
  startCountdown();
});
// Handle answer chosen
answerText.addEventListener("click", (e) => {
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
});
