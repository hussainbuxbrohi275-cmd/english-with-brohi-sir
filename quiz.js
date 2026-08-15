const QUIZ_QUESTIONS = [
  {
    q: "She ____ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correct: 1,
    explain: `"She" is singular, so the verb takes an "s" in present simple: goes.`,
  },
  {
    q: "Choose the correct sentence:",
    options: [
      "He don't like tea.",
      "He doesn't likes tea.",
      "He doesn't like tea.",
      "He not like tea.",
    ],
    correct: 2,
    explain: `With "doesn't," the main verb stays in its base form: "doesn't like," not "doesn't likes."`,
  },
  {
    q: "I have been living here ____ 2019.",
    options: ["since", "for", "from", "at"],
    correct: 0,
    explain: `Use "since" with a specific starting point in time (like a year), and "for" with a duration (like "for 5 years").`,
  },
  {
    q: "Which word means 'extremely large'?",
    options: ["Fragile", "Enormous", "Cautious", "Isolated"],
    correct: 1,
    explain: `"Enormous" means extremely large in size.`,
  },
  {
    q: "Choose the correct sentence:",
    options: [
      "This is more better than that.",
      "This is more good than that.",
      "This is better than that.",
      "This is much good than that.",
    ],
    correct: 2,
    explain: `"Better" is already a comparative form — never add "more" before it.`,
  },
  {
    q: "They ____ playing football right now.",
    options: ["is", "am", "are", "be"],
    correct: 2,
    explain: `"They" always takes "are" in present continuous: "They are playing."`,
  },
  {
    q: "Which sentence uses 'discuss' correctly?",
    options: [
      "Let's discuss about the plan.",
      "Let's discuss the plan.",
      "Let's discussing the plan.",
      "Let's discuss to the plan.",
    ],
    correct: 1,
    explain: `"Discuss" never needs "about" after it — "discuss the plan" is correct on its own.`,
  },
  {
    q: "Choose the word that means 'unwilling':",
    options: ["Diligent", "Genuine", "Reluctant", "Frequent"],
    correct: 2,
    explain: `"Reluctant" means unwilling or hesitant to do something.`,
  },
];

let quizState = { index: 0, score: 0, answered: false };

function renderQuiz() {
  const card = document.getElementById("quiz-card");
  const total = QUIZ_QUESTIONS.length;

  if (quizState.index >= total) {
    renderQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[quizState.index];
  const progressPct = (quizState.index / total) * 100;

  card.innerHTML = `
    <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progressPct}%"></div></div>
    <span class="eyebrow">Question ${quizState.index + 1} of ${total}</span>
    <h3>${q.q}</h3>
    <div class="quiz-options" id="quiz-options"></div>
    <p id="quiz-explain" style="margin-top:16px; font-size:0.92rem; display:none;"></p>
    <button class="btn btn-primary" id="quiz-next" style="display:none; margin-top:8px;">Next Question →</button>
  `;

  const optionsEl = document.getElementById("quiz-options");
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });

  quizState.answered = false;
}

function selectAnswer(i) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ_QUESTIONS[quizState.index];
  const buttons = document.querySelectorAll(".quiz-option");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add("correct");
    else if (idx === i) btn.classList.add("incorrect");
  });

  if (i === q.correct) quizState.score++;

  const explain = document.getElementById("quiz-explain");
  explain.textContent = "💡 " + q.explain;
  explain.style.display = "block";

  const nextBtn = document.getElementById("quiz-next");
  nextBtn.style.display = "inline-flex";
  nextBtn.addEventListener("click", () => {
    quizState.index++;
    renderQuiz();
  });
}

function renderQuizResult() {
  const card = document.getElementById("quiz-card");
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((quizState.score / total) * 100);

  let message = "Keep practicing — try our free resources page for a refresher!";
  if (pct >= 80) message = "Excellent! Your grammar and vocabulary are strong. 🎉";
  else if (pct >= 50) message = "Good effort! A little more practice and you'll master this.";

  card.innerHTML = `
    <div class="quiz-result">
      <span class="eyebrow" style="justify-content:center;">Quiz Complete</span>
      <div class="score">${quizState.score} / ${total}</div>
      <p class="lead" style="margin: 0 auto 24px;">${message}</p>
      <div class="hero-actions" style="justify-content:center;">
        <button class="btn btn-marigold" id="quiz-retry">🔁 Try Again</button>
        <a href="register.html" class="btn btn-outline">📝 Join a Free Trial</a>
      </div>
    </div>
  `;
  document.getElementById("quiz-retry").addEventListener("click", () => {
    quizState = { index: 0, score: 0, answered: false };
    renderQuiz();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("quiz-card")) renderQuiz();
});
