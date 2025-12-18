export const gameState = {
  currentPoint: 0,
  currentQuestionIndex: 0,
  statusOfGame: "",
  highScore: localStorage.getItem("highScore") || 0,
  countRightAnswers: 0,
  countWrongAnswers: 0,
  countdownInterval: null,
  timeLeft: 15,
  questions: [],
};
