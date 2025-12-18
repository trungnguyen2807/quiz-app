export async function loadQuestions() {
  const res = await fetch("/quiz-app/question.json");

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();
  return data;
}
