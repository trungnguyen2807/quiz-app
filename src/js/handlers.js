import { gameState } from "./gameState.js";
import { handleAnswerSelection } from "./logic.js";
import { startButton, answerText, showQuizContainer } from "./ui.js";
import { renderQuestion, startCountdown } from "./logic.js";

export function bindUIEvents() {
  startButton.addEventListener("click", () => {
    showQuizContainer();
    renderQuestion(gameState.currentQuestionIndex);
    startCountdown();
  });

  answerText.addEventListener("click", handleAnswerSelection);
}
