// ==========================
// Navigation
// ==========================
function show(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");

  if (id === "tasks") loadTask();
  if (id === "theory") loadTheory();
}

document.getElementById("startBtn").onclick = () => show("start");
document.getElementById("theoryBtn").onclick = () => show("theory");
document.getElementById("tasksBtn").onclick = () => show("tasks");

// ==========================
// Dark / Light Mode
// ==========================
const themeBtn = document.getElementById("themeToggle");
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// ==========================
// Klassenstufe
// ==========================
const gradeSelect = document.getElementById("gradeSelect");
let selectedGrade = gradeSelect.value;
gradeSelect.onchange = e => {
  selectedGrade = e.target.value;
  taskIndex = 0;
  wrongCount = 0;
};

// ==========================
// Woche
// ==========================
const COURSE_START = new Date("2030-01-01"); // Woche 0 Testphase
function calcWeek() {
  const diff = new Date() - COURSE_START;
  return Math.max(0, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)));
}
let currentWeek = calcWeek();
document.getElementById("currentWeek").textContent =
  currentWeek === 0
    ? "Testwoche (Woche 0)"
    : "Woche " + currentWeek;


// ==========================
// Aufgaben / Fortschritt
// ==========================
const TASKS_PER_WEEK = 10;
let taskIndex = 0;
let wrongCount = 0;

// ==========================
// THEORIE (WOCHE 0 – TEST)
// ==========================
const theory = {
  7: {
    0: "Physik untersucht Naturerscheinungen. Größen wie Länge, Zeit und Masse werden gemessen. Einheitensystem: SI."
  },
  8: {
    0: "In der Elektrizitätslehre geht es um Stromstärke (I), Spannung (U) und Widerstand (R)."
  },
  9: {
    0: "Mechanik: Geschwindigkeit, Beschleunigung und Kraft beschreiben Bewegungen."
  },
  10: {
    0: "Energie kann nicht erzeugt oder vernichtet werden, nur umgewandelt."
  }
};
theory[7][1] =
"Physikalische Größen beschreiben Eigenschaften. Beispiele: Länge (m), Zeit (s), Masse (kg).";

theory[8][1] =
"Elektrische Ladungen können positiv oder negativ sein. Gleiche Ladungen stoßen sich ab.";

theory[9][1] =
"Bewegung beschreibt eine Ortsänderung mit der Zeit.";

theory[10][1] =
"Elektrische Felder wirken auf geladene Teilchen.";


function loadTheory() {
  const box = document.getElementById("theoryBox");
  const t = theory[selectedGrade]?.[0];
  box.textContent = t || "Für diese Woche ist noch keine Theorie freigeschaltet.";
}
// ===== KLASSE 7 =====
theory[7][2] = "Messgeräte haben eine Genauigkeit. Messfehler entstehen durch Ablesefehler.";
theory[7][3] = "Die Dichte berechnet man mit: ρ = m / V. Einheit: kg/m³.";

// ===== KLASSE 8 =====
theory[8][2] = "Ein Stromkreis besteht aus Spannungsquelle, Verbraucher und Leitungen.";
theory[8][3] = "Die Stromstärke gibt an, wie viel Ladung pro Zeit fließt. Einheit: Ampere (A).";

// ===== KLASSE 9 =====
theory[9][2] = "Geschwindigkeit berechnet man mit v = s / t.";
theory[9][3] = "Beschleunigung ist die Änderung der Geschwindigkeit pro Zeit.";

// ===== KLASSE 10 =====
theory[10][2] = "Magnetfelder wirken auf bewegte elektrische Ladungen.";
theory[10][3] = "Bei der Induktion entsteht Spannung durch Änderung eines Magnetfeldes.";


// ==========================
// AUFGABEN – WOCHE 0 (TEST)
// ==========================
const tasks = {
  7: {
    0: [
      {
        q: "Welche Einheit hat die Masse?",
        a: "kg",
        s: "Die Masse wird im SI-System in Kilogramm (kg) angegeben."
      }
    ]
  },
  8: {
    0: [
      {
        q: "Welche Einheit hat die elektrische Spannung?",
        a: "V",
        s: "Die Spannung wird in Volt (V) gemessen."
      }
    ]
  },
  9: {
    0: [
      {
        q: "Wie lautet die Formel für Geschwindigkeit?",
        a: "v=s/t",
        s: "Geschwindigkeit ist Weg durch Zeit: v = s / t."
      }
    ]
  },
  10: {
    0: [
      {
        q: "Welche Einheit hat Energie?",
        a: "J",
        s: "Energie wird in Joule (J) angegeben."
      }
    ]
  }
};
tasks[7][2] = [
  { q: "Was ist ein Messfehler?", a: "Abweichung", s: "Ein Messfehler ist die Abweichung vom wahren Wert." },
  { q: "Nenne einen Ablesefehler.", a: "Parallaxe", s: "Parallaxefehler entstehen durch schräges Ablesen." }
];

tasks[7][3] = [
  {
    q: "Ein Körper hat m = 2 kg und V = 0,5 m³. Berechne die Dichte.",
    a: "4",
    s: "ρ = m / V = 2 / 0,5 = 4 kg/m³"
  }
];

tasks[7][1] = [
  { q: "Welche Einheit hat die Länge?", a: "m", s: "Die Länge wird in Metern (m) gemessen." },
  { q: "Welche Einheit hat die Zeit?", a: "s", s: "Die Zeit wird in Sekunden (s) gemessen." },
  { q: "Welche Einheit hat die Masse?", a: "kg", s: "Die Masse wird in Kilogramm (kg) gemessen." }
];

tasks[8][1] = [
  { q: "Wie nennt man positive oder negative Teilchen?", a: "Ladung", s: "Teilchen tragen elektrische Ladung." },
  { q: "Stoßen sich gleiche Ladungen ab?", a: "ja", s: "Gleiche Ladungen stoßen sich ab." },
  { q: "Ziehen sich ungleiche Ladungen an?", a: "ja", s: "Ungleiche Ladungen ziehen sich an." }
];

tasks[9][1] = [
  { q: "Was beschreibt Bewegung?", a: "Ortsänderung", s: "Bewegung ist eine Ortsänderung mit der Zeit." },
  { q: "Wie heißt der Anfangspunkt einer Bewegung?", a: "Startpunkt", s: "Der Startpunkt ist der Anfang." },
  { q: "Wie heißt der Endpunkt?", a: "Endpunkt", s: "Der Endpunkt ist das Ziel." }
];

tasks[10][1] = [
  { q: "Worauf wirkt ein elektrisches Feld?", a: "Ladungen", s: "Elektrische Felder wirken auf Ladungen." },
  { q: "Ist das Feld sichtbar?", a: "nein", s: "Felder sind unsichtbar." },
  { q: "Was erzeugt ein elektrisches Feld?", a: "Ladung", s: "Geladene Körper erzeugen Felder." }
];
tasks[7][2] = [
  { q: "Was ist ein Messfehler?", a: "Abweichung", s: "Ein Messfehler ist die Abweichung vom wahren Wert." },
  { q: "Nenne einen Ablesefehler.", a: "Parallaxe", s: "Parallaxefehler entstehen durch schräges Ablesen." }
];

tasks[7][3] = [
  {
    q: "Ein Körper hat m = 2 kg und V = 0,5 m³. Berechne die Dichte.",
    a: "4",
    s: "ρ = m / V = 2 / 0,5 = 4 kg/m³"
  }
];

tasks[8][2] = [
  { q: "Nenne ein Bauteil eines Stromkreises.", a: "Spannungsquelle", s: "Ohne Spannungsquelle fließt kein Strom." }
];

tasks[8][3] = [
  {
    q: "Durch einen Leiter fließen 2 C in 1 s. Berechne I.",
    a: "2",
    s: "I = Q / t = 2 / 1 = 2 A"
  }
];
tasks[9][2] = [
  {
    q: "Ein Auto fährt 100 m in 5 s. Berechne v.",
    a: "20",
    s: "v = s / t = 100 / 5 = 20 m/s"
  }
];

tasks[9][3] = [
  {
    q: "v steigt von 0 auf 10 m/s in 2 s. Berechne a.",
    a: "5",
    s: "a = Δv / t = 10 / 2 = 5 m/s²"
  }
];
tasks[10][2] = [
  { q: "Worauf wirkt ein Magnetfeld?", a: "bewegte Ladungen", s: "Nur bewegte Ladungen werden beeinflusst." }
];

tasks[10][3] = [
  { q: "Wie entsteht Induktion?", a: "Magnetfeldänderung", s: "Induktion entsteht durch Änderung des Magnetfeldes." }
];

// ==========================
// Aufgabe laden
// ==========================
if (currentWeek === 0 && !tasks[selectedGrade][0]) {
  document.getElementById("taskBox").innerHTML =
    "<p>⚠️ Testwoche ohne Aufgaben</p>";
  return;
}

if (!tasks[selectedGrade][currentWeek]) {
  document.getElementById("taskBox").innerHTML =
    "<p>🔒 Diese Woche ist noch nicht freigeschaltet.</p>";
  return;
}


function loadTask() {
  const box = document.getElementById("taskBox");
  const weekTasks = tasks[selectedGrade]?.[currentWeek];


  if (!weekTasks || taskIndex >= weekTasks.length) {
    box.innerHTML = "<p>✅ Woche abgeschlossen</p>";
    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("progressText").textContent =
      "Fortschritt: 10 von 10 Aufgaben";
    return;
  }

  const task = weekTasks[taskIndex];
  wrongCount = 0;

  box.innerHTML = `
    <p><b>Aufgabe ${taskIndex + 1}:</b> ${task.q}</p>
    <input id="answerInput" placeholder="Antwort eingeben">
    <button id="checkBtn">Überprüfen</button>
    <p id="feedback"></p>
    <div id="solution" style="display:none">
      <b>Lösungsweg:</b><br>${task.s}
      <br><br>
      <button id="nextBtn">Weiter</button>
    </div>
  `;

  updateProgress();

  document.getElementById("checkBtn").onclick = () => {
    const input = document.getElementById("answerInput").value.trim();
    const feedback = document.getElementById("feedback");

    if (input === task.a) {
      feedback.textContent = "✅ Richtig!";
      feedback.style.color = "green";
      document.getElementById("solution").style.display = "block";
    } else {
      wrongCount++;
      feedback.textContent =
        "❌ Falsch (Versuch " + wrongCount + " von 20)";
      feedback.style.color = "red";

      if (wrongCount >= 20) {
        document.getElementById("solution").style.display = "block";
      }
    }

    document.getElementById("nextBtn").onclick = () => {
      taskIndex++;
      loadTask();
    };
  };
}

// ==========================
// Fortschritt
// ==========================
function updateProgress() {
  const percent = Math.min((taskIndex / TASKS_PER_WEEK) * 100, 100);
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").textContent =
    `Fortschritt: ${taskIndex} von ${TASKS_PER_WEEK} Aufgaben`;
}
