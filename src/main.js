import "./style.css";

// const Swal = require("sweetalert2");
const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const currentPointText = document.getElementById("current-point");
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
function resetGame() {
  currentPoint = 0;
  currentQuestionIndex = 0;
  currentPointText.innerText = currentPoint;
  renderQuestion(currentQuestionIndex);
  return;
}
function renderQuestion(index) {
  if (index >= questions.length) {
    Swal.fire({
      title: "Done! Your score is " + currentPoint,
      text: "Do you want to try again?",
      icon: "success",
      confirmButtonText: "Yah sure!",
      denyButtonText: "No, thanks",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: resetGame(),
      preDeny: resetGame(),
    });
  } else {
    const currentQuestion = questions[index];
    const currentAnswer = answers[index];
    questionText.innerText = currentQuestion;
    answerText.setAttribute("data-correct-index", currentAnswer[4]);
    const listOfAnswers = answerText.querySelectorAll("li");
    listOfAnswers.forEach((li, i) => {
      li.innerText = currentAnswer[i];
    });
  }
}
function updateCurrentPoint(isCorrect) {
  isCorrect ? (currentPoint += 100) : (currentPoint -= 100);
  currentPointText.innerText = currentPoint;
}
answerText.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedAsnwerIndex = e.target.getAttribute("data-index");
    const correctAnswerIndex = answerText.getAttribute("data-correct-index");
    if (selectedAsnwerIndex == correctAnswerIndex) {
      e.target.classList.add("text-green-500");
      updateCurrentPoint(true);
      currentQuestionIndex++;
      setTimeout(() => {
        e.target.classList.remove("text-green-500");
        renderQuestion(currentQuestionIndex);
      }, "1");
    } else {
      const correctAnswers = answerText.querySelector(
        "li[data-index= '" + correctAnswerIndex + "' ]"
      );
      correctAnswers.classList.add("text-green-500");
      updateCurrentPoint(false);
      e.target.classList.add("text-red-500");
      currentQuestionIndex++;
      setTimeout(() => {
        correctAnswers.classList.remove("text-green-500");
        e.target.classList.remove("text-red-500");
        renderQuestion(currentQuestionIndex);
      }, "1");
    }
  }
});
renderQuestion(currentQuestionIndex);
