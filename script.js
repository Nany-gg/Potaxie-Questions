// script.js

const questions = [
  { question: "¿Te has enamorado de algún Fife?", options: ["Si", "No"], correct: "No", points: 1 },
  { question: "Si respondiste si, ¿Cuál es su nombre?", type: "text", correct: "", points: 0 },
  { question: "¿Te crees potaxie?", options: ["Si", "No"], correct: "Si", points: 1 },
  { question: "¿Acaso alguna vez has hecho algo hipócrita?", options: ["Si", "No"], correct: "Si", points: 2 },
  { question: "¿Quisieras revivir una relación del pasado?", options: ["Si", "Quizás", "No"], correct: "No", points: 2, extra: "Quizás" },
  { question: "¿Quién es tu mejor amiga?", type: "text", correct: "", points: 0 },
  { question: "¿Escuchas a Sabrina Carpenter?", options: ["Si", "No", "No se quien es ella"], correct: "Si", points: 1 },
  { question: "¿Escuchas remixs potaxies?", options: ["Si", "No"], correct: "Si", points: 1 },
  { question: "¿Eres Fife?", options: ["Si", "No"], correct: "No", points: 1 },
  { question: "¿Estás enamorado de alguien?", options: ["Si", "No"], correct: "Si", points: 1 },
  { question: "¿De que Fife?", type: "text", correct: "", points: 0 },
];

let currentQuestion = 0;
let userAnswers = [];
let userName = "";

function startQuiz() {
  userName = document.getElementById("user-name").value;
  if (userName === "") {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("loading-screen").style.display = "none";
  loadQuestion();
}

function loadQuestion() {
  const questionData = questions[currentQuestion];
  let questionHTML = `<h2>${questionData.question}</h2>`;
  if (questionData.type === "text") {
    questionHTML += `<input type="text" id="answer" placeholder="Escribe tu respuesta">`;
  } else {
    questionHTML += questionData.options.map((option, index) => {
      return `<label><input type="radio" name="answer" value="${option}"> ${option}</label><br>`;
    }).join("");
  }
  document.getElementById("question-container").innerHTML = questionHTML;
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("prev-btn").style.display = currentQuestion > 0 ? "block" : "none";
}

function nextQuestion() {
  const questionData = questions[currentQuestion];
  let answer = document.getElementById("answer") ? document.getElementById("answer").value : null;
  if (!answer && questionData.type !== "text") {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) answer = selectedOption.value;
  }

  if (answer) {
    userAnswers.push({ question: questionData.question, answer: answer });
    if (answer === questionData.correct) {
      userAnswers[userAnswers.length - 1].points = questionData.points;
    } else {
      userAnswers[userAnswers.length - 1].points = 0;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResults();
    }
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function showResults() {
  let totalScore = 0;
  userAnswers.forEach(answer => {
    totalScore += answer.points;
  });

  document.getElementById("final-score").innerText = totalScore;
  document.getElementById("result-message").innerText =
    totalScore >= 8 ? "Eres potaxie" : "No eres potaxie";

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results").style.display = "block";
}

// Cargar pantalla de carga aleatoria
window.onload = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdDPs9JJGvogbK8HjESOpj2Cit7FdsIY89-4vphb6SlQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tEpF4Ux9HUjv-ZPt8x6ZGqDbqZOnCjbzkCCN5Tv0J05UWh9jZyxtxR4&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTga11M08iXjkA9LhE6SoPSDigtI3-5HET2we1ALMHn3Me6ERG-l_No00rR&s=10"
  ];
  const texts = [
    "...Para llegar al exito, no te debes rendir...",
    "...Sabrina Carpenter es el icono de la belleza💋...",
    "...Álbum del año, Short n' Sweet...",
    "Solo los potaxies saben que es 'Fife'✨",
    "Tomate tu tiempo😪",
    "Acaso, irespetas a tu jefe de grupo!!!",
    "El beso es una representación de S. Carpenter💋..."
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  document.getElementById("loading-image").src = randomImage;
  document.getElementById("loading-text").innerText = randomText;
};

// Ocultar pantalla de carga y mostrar cuestionario después de 3 segundos
setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
}, 3000); // 3 segundos
