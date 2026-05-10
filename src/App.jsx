import { useState, useEffect, useCallback, useRef } from "react";

// ── Default CEFR vocab lists ───────────────────────────────────────────────
const DEFAULT_LISTS = [
  {
    name: "A1 — Beginner",
    words: [
      { en: "hello", es: "hola" },
      { en: "goodbye", es: "adiós" },
      { en: "please", es: "por favor" },
      { en: "thank you", es: "gracias" },
      { en: "sorry", es: "lo siento" },
      { en: "water", es: "agua" },
      { en: "food", es: "comida" },
      { en: "house", es: "casa" },
      { en: "family", es: "familia" },
      { en: "dog", es: "perro" },
      { en: "cat", es: "gato" },
      { en: "man", es: "hombre" },
      { en: "woman", es: "mujer" },
      { en: "day", es: "día" },
      { en: "year", es: "año" },
      { en: "big", es: "grande" },
      { en: "small", es: "pequeño" },
      { en: "good", es: "bueno" },
      { en: "bad", es: "malo" },
      { en: "friend", es: "amigo" },
    ],
  },
  {
    name: "A2 — Elementary",
    words: [
      { en: "to buy", es: "comprar" },
      { en: "to sell", es: "vender" },
      { en: "to travel", es: "viajar" },
      { en: "to work", es: "trabajar" },
      { en: "to study", es: "estudiar" },
      { en: "to eat", es: "comer" },
      { en: "to drink", es: "beber" },
      { en: "to sleep", es: "dormir" },
      { en: "to walk", es: "caminar" },
      { en: "to run", es: "correr" },
      { en: "morning", es: "mañana" },
      { en: "afternoon", es: "tarde" },
      { en: "night", es: "noche" },
      { en: "week", es: "semana" },
      { en: "month", es: "mes" },
      { en: "school", es: "escuela" },
      { en: "money", es: "dinero" },
      { en: "time", es: "tiempo" },
      { en: "happy", es: "feliz" },
      { en: "tired", es: "cansado" },
    ],
  },
  {
    name: "B1 — Intermediate",
    words: [
      { en: "to decide", es: "decidir" },
      { en: "to explain", es: "explicar" },
      { en: "to improve", es: "mejorar" },
      { en: "to remember", es: "recordar" },
      { en: "to forget", es: "olvidar" },
      { en: "to suggest", es: "sugerir" },
      { en: "to prepare", es: "preparar" },
      { en: "to continue", es: "continuar" },
      { en: "to offer", es: "ofrecer" },
      { en: "to accept", es: "aceptar" },
      { en: "experience", es: "experiencia" },
      { en: "problem", es: "problema" },
      { en: "solution", es: "solución" },
      { en: "opinion", es: "opinión" },
      { en: "situation", es: "situación" },
      { en: "usually", es: "normalmente" },
      { en: "suddenly", es: "de repente" },
      { en: "perhaps", es: "quizás" },
      { en: "instead", es: "en cambio" },
      { en: "at least", es: "al menos" },
    ],
  },
  {
    name: "B2 — Upper Intermediate",
    words: [
      { en: "to achieve", es: "lograr" },
      { en: "to overcome", es: "superar" },
      { en: "to deal with", es: "lidiar con" },
      { en: "to point out", es: "señalar" },
      { en: "to take advantage of", es: "aprovechar" },
      { en: "to complain", es: "quejarse" },
      { en: "to warn", es: "advertir" },
      { en: "to trust", es: "confiar" },
      { en: "to encourage", es: "animar" },
      { en: "to require", es: "exigir" },
      { en: "meanwhile", es: "mientras tanto" },
      { en: "furthermore", es: "además" },
      { en: "on the other hand", es: "por otro lado" },
      { en: "although", es: "aunque" },
      { en: "therefore", es: "por lo tanto" },
      { en: "awareness", es: "conciencia" },
      { en: "challenge", es: "desafío" },
      { en: "consequence", es: "consecuencia" },
      { en: "responsibility", es: "responsabilidad" },
      { en: "environment", es: "medio ambiente" },
    ],
  },
  {
    name: "C1 — Advanced",
    words: [
      { en: "to undermine", es: "socavar" },
      { en: "to embody", es: "encarnar" },
      { en: "to alleviate", es: "aliviar" },
      { en: "to foster", es: "fomentar" },
      { en: "to deter", es: "disuadir" },
      { en: "to encompass", es: "abarcar" },
      { en: "to prevail", es: "prevalecer" },
      { en: "to assert", es: "afirmar" },
      { en: "to pursue", es: "perseguir" },
      { en: "to scrutinise", es: "escudriñar" },
      { en: "presumably", es: "presumiblemente" },
      { en: "intrinsically", es: "intrínsecamente" },
      { en: "henceforth", es: "en adelante" },
      { en: "discrepancy", es: "discrepancia" },
      { en: "resilience", es: "resiliencia" },
      { en: "ambiguity", es: "ambigüedad" },
      { en: "accountability", es: "responsabilidad" },
      { en: "paradigm", es: "paradigma" },
      { en: "implication", es: "implicación" },
      { en: "nonetheless", es: "no obstante" },
    ],
  },
  {
    name: "C2 — Mastery",
    words: [
      { en: "to circumvent", es: "eludir" },
      { en: "to exacerbate", es: "exacerbar" },
      { en: "to mitigate", es: "mitigar" },
      { en: "to vindicate", es: "reivindicar" },
      { en: "to coerce", es: "coaccionar" },
      { en: "to acquiesce", es: "condescender" },
      { en: "to perplex", es: "desconcertar" },
      { en: "to epitomise", es: "ejemplificar" },
      { en: "to relinquish", es: "renunciar a" },
      { en: "to substantiate", es: "corroborar" },
      { en: "nuance", es: "matiz" },
      { en: "ubiquitous", es: "ubicuo" },
      { en: "ephemeral", es: "efímero" },
      { en: "unequivocal", es: "inequívoco" },
      { en: "meticulous", es: "meticuloso" },
      { en: "unprecedented", es: "sin precedentes" },
      { en: "intricate", es: "intrincado" },
      { en: "ambivalent", es: "ambivalente" },
      { en: "contentious", es: "polémico" },
      { en: "paradoxical", es: "paradójico" },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(correct, pool, count = 3) {
  const others = pool.filter((w) => w.es !== correct.es);
  return shuffle(others).slice(0, count).map((w) => w.es);
}

function normalise(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// ── Confetti ───────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const pieces = Array.from({ length: 28 });
  const colors = ["#c9a84c", "#6b8fd4", "#6bcba0", "#c96b6b", "#a8c0e8", "#e8d5a0"];
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000 }}>
      {pieces.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: "-10px",
            width: 9,
            height: 9,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: colors[i % colors.length],
            animation: `fall ${1.4 + Math.random()}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ── Parse pasted vocab ─────────────────────────────────────────────────────
function parseVocab(text) {
  return text
    .split("\n")
    .map((line) => {
      const parts = line.split(/[-–—|,]\s*/);
      if (parts.length >= 2) return { en: parts[0].trim(), es: parts[1].trim() };
      return null;
    })
    .filter(Boolean);
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");

  const [lists, setLists] = useState(() => {
    try {
      const saved = localStorage.getItem("cpvocab_lists");
      return saved ? JSON.parse(saved) : DEFAULT_LISTS;
    } catch {
      return DEFAULT_LISTS;
    }
  });

  const [activeList, setActiveList] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState("mc"); // mc | spell
  const [options, setOptions] = useState([]);
  const [mcPicked, setMcPicked] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // null | 'mc-correct' | 'correct' | 'wrong'
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const [wordStats, setWordStats] = useState(() => {
    try {
      const saved = localStorage.getItem("cpvocab_wordStats");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [highScores, setHighScores] = useState(() => {
    try {
      const saved = localStorage.getItem("cpvocab_highScores");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);
  const howItWorksRef = useRef(null);

  // ── Persistence ──────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("cpvocab_lists", JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem("cpvocab_wordStats", JSON.stringify(wordStats));
  }, [wordStats]);

  useEffect(() => {
    localStorage.setItem("cpvocab_highScores", JSON.stringify(highScores));
  }, [highScores]);

  // Update high score when results screen is shown
  useEffect(() => {
    if (screen !== "results" || !activeList) return;
    const total = score.correct + score.wrong;
    const pct = total ? Math.round((score.correct / total) * 100) : 0;
    setHighScores((prev) => {
      const current = prev[activeList.name] || 0;
      return pct > current ? { ...prev, [activeList.name]: pct } : prev;
    });
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentWord = queue[currentIdx];

  // ── Game logic ───────────────────────────────────────────────────────────
  const startGame = useCallback(
    (list, reviewMode = false) => {
      let words = reviewMode
        ? list.words.filter((w) => (wordStats[w.es]?.wrong || 0) > 0)
        : [...list.words];
      if (!words.length) words = [...list.words];
      setActiveList(list);
      setQueue(shuffle(words));
      setCurrentIdx(0);
      setScore({ correct: 0, wrong: 0 });
      setStreak(0);
      setPhase("mc");
      setMcPicked(null);
      setFeedback(null);
      setInput("");
      setScreen("game");
    },
    [wordStats]
  );

  useEffect(() => {
    if (!currentWord || !activeList) return;
    const wrongs = getWrongOptions(currentWord, activeList.words);
    setOptions(shuffle([currentWord.es, ...wrongs]));
    setPhase("mc");
    setMcPicked(null);
    setFeedback(null);
    setInput("");
  }, [currentIdx, currentWord, activeList]);

  useEffect(() => {
    if (phase === "spell") setTimeout(() => inputRef.current?.focus(), 50);
  }, [phase]);

  function markWord(correct) {
    setWordStats((prev) => {
      const prev2 = prev[currentWord.es] || { seen: 0, wrong: 0 };
      return {
        ...prev,
        [currentWord.es]: {
          seen: prev2.seen + 1,
          wrong: correct ? Math.max(0, prev2.wrong - 1) : prev2.wrong + 1,
        },
      };
    });
  }

  function advance() {
    if (currentIdx + 1 >= queue.length) {
      setScreen("results");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }

  function handleMCAnswer(opt) {
    if (feedback || mcPicked) return;
    setMcPicked(opt);
    if (opt === currentWord.es) {
      setFeedback("mc-correct");
      setTimeout(() => {
        setPhase("spell");
        setMcPicked(null);
        setFeedback(null);
        setInput("");
      }, 700);
    } else {
      markWord(false);
      setFeedback("wrong");
      setStreak(0);
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      setTimeout(() => advance(), 1200);
    }
  }

  function handleSpellAnswer(answer) {
    if (feedback) return;
    const isCorrect = normalise(answer) === normalise(currentWord.es);
    markWord(isCorrect);
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      if (newStreak > 0 && newStreak % 5 === 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setStreak(0);
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
    setTimeout(() => advance(), 1200);
  }

  function handleUpload() {
    setUploadError("");
    const words = parseVocab(uploadText);
    if (words.length < 2) {
      setUploadError("Need at least 2 word pairs. Format: English - Spanish");
      return;
    }
    const name = uploadName.trim() || `My List ${lists.length}`;
    setLists((l) => [...l, { name, words }]);
    setUploadText("");
    setUploadName("");
    setScreen("home");
  }

  // ── Global CSS ───────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background: #111318;
      color: #e8eaf0;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Landing ── */
    .landing {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #111318;
    }

    .l-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      background: rgba(17,19,24,0.88);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(20px);
      z-index: 200;
    }

    .l-nav-logo {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .l-nav-drop {
      font-size: 1.25rem;
      line-height: 1;
    }

    .l-nav-brand {
      font-family: 'DM Serif Display', serif;
      font-size: 1.25rem;
      color: #e8eaf0;
      letter-spacing: -0.01em;
    }

    .l-nav-sub {
      font-size: 0.78rem;
      color: rgba(232,234,240,0.3);
      letter-spacing: 0.04em;
    }

    .l-hero {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 24px 56px;
      max-width: 740px;
      margin: 0 auto;
      width: 100%;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(107,143,212,0.1);
      border: 1px solid rgba(107,143,212,0.22);
      color: #a8c0e8;
      margin-bottom: 28px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .hero-h1 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.8rem, 6.5vw, 4.6rem);
      color: #e8eaf0;
      line-height: 1.04;
      letter-spacing: -0.025em;
      margin-bottom: 14px;
    }

    .hero-sub {
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      font-size: clamp(1.5rem, 3.2vw, 2.4rem);
      color: #c9a84c;
      line-height: 1.2;
      margin-bottom: 26px;
    }

    .hero-desc {
      font-size: 1rem;
      color: rgba(232,234,240,0.48);
      line-height: 1.75;
      max-width: 500px;
      margin: 0 auto 36px;
    }

    .hero-cta {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 48px;
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 64px;
    }

    .pill {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 5px 13px;
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      color: rgba(232,234,240,0.42);
      letter-spacing: 0.02em;
    }

    .stats-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.015);
    }

    .strip-item {
      padding: 30px 16px;
      text-align: center;
      border-right: 1px solid rgba(255,255,255,0.05);
    }
    .strip-item:last-child { border-right: none; }

    .strip-num {
      font-family: 'DM Serif Display', serif;
      font-size: 2.2rem;
      color: #6b8fd4;
      margin-bottom: 5px;
      line-height: 1;
    }

    .strip-lbl {
      font-size: 0.72rem;
      color: rgba(232,234,240,0.32);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .l-footer {
      padding: 20px;
      text-align: center;
      font-size: 0.75rem;
      color: rgba(232,234,240,0.2);
      letter-spacing: 0.04em;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    /* ── App screens (home, game, results, upload) ── */
    .app {
      min-height: 100vh;
      background: #111318;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 28px 20px;
    }

    .card {
      background: #181c24;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 14px;
      padding: 36px;
      width: 100%;
      max-width: 600px;
    }

    /* ── Typography ── */
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .logo-drop { font-size: 1.4rem; line-height: 1; }

    .logo-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.9rem;
      color: #e8eaf0;
      letter-spacing: -0.01em;
    }

    .tagline {
      font-size: 0.85rem;
      color: rgba(232,234,240,0.35);
      letter-spacing: 0.04em;
      margin-bottom: 0;
    }

    .card-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.55rem;
      color: #e8eaf0;
    }

    .section-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: rgba(232,234,240,0.28);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 14px;
    }

    /* ── Buttons ── */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 11px 22px;
      border-radius: 10px;
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-lg { padding: 14px 32px; font-size: 1rem; }

    .btn-primary {
      background: #2a3a5c;
      color: #a8c0e8;
    }
    .btn-primary:hover { background: #334870; transform: translateY(-1px); }

    .btn-ghost {
      background: transparent;
      color: rgba(232,234,240,0.45);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.04); color: #e8eaf0; }

    .btn-danger {
      background: rgba(201,107,107,0.1);
      color: #c96b6b;
      border: 1px solid rgba(201,107,107,0.2);
    }
    .btn-danger:hover { background: rgba(201,107,107,0.16); }

    .btn-gold {
      background: rgba(201,168,76,0.12);
      color: #c9a84c;
      border: 1px solid rgba(201,168,76,0.22);
    }
    .btn-gold:hover { background: rgba(201,168,76,0.2); }

    .btn-exit {
      background: rgba(255,255,255,0.05);
      color: rgba(232,234,240,0.4);
      border: 1px solid rgba(255,255,255,0.07);
      padding: 7px 13px;
      font-size: 0.82rem;
    }
    .btn-exit:hover { color: #e8eaf0; background: rgba(255,255,255,0.08); }

    /* ── List cards ── */
    .list-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 17px 20px;
      margin-bottom: 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: border-color 0.14s, background 0.14s;
    }
    .list-card:hover {
      border-color: rgba(107,143,212,0.22);
      background: rgba(107,143,212,0.04);
    }

    .list-name {
      font-size: 0.93rem;
      font-weight: 600;
      color: #e8eaf0;
    }

    .list-meta {
      font-size: 0.78rem;
      color: rgba(232,234,240,0.32);
      margin-top: 3px;
    }

    .badge-gold {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(201,168,76,0.1);
      color: #c9a84c;
      border: 1px solid rgba(201,168,76,0.18);
      margin-left: 8px;
    }

    /* ── Game header ── */
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .game-counter {
      font-size: 0.82rem;
      color: rgba(232,234,240,0.3);
      letter-spacing: 0.04em;
    }

    .game-streak {
      font-size: 0.82rem;
      color: #c9a84c;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    /* ── Progress bar ── */
    .progress-wrap {
      height: 3px;
      background: rgba(255,255,255,0.06);
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 28px;
    }
    .progress-fill {
      height: 100%;
      background: #6b8fd4;
      border-radius: 99px;
      transition: width 0.35s ease;
    }

    /* ── Stats row (game) ── */
    .stats-row {
      display: flex;
      gap: 9px;
      margin-bottom: 22px;
    }
    .stat-chip {
      flex: 1;
      text-align: center;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      padding: 10px 6px;
    }
    .stat-val {
      font-family: 'DM Serif Display', serif;
      font-size: 1.45rem;
      line-height: 1;
      margin-bottom: 3px;
    }
    .stat-lbl {
      font-size: 0.65rem;
      color: rgba(232,234,240,0.3);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .col-correct { color: #6bcba0; }
    .col-wrong   { color: #c96b6b; }
    .col-gold    { color: #c9a84c; }

    /* ── Phase chip ── */
    .phase-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.64rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 20px;
    }
    .phase-mc    { background: rgba(107,143,212,0.1); color: #6b8fd4; border: 1px solid rgba(107,143,212,0.18); }
    .phase-spell { background: rgba(107,203,160,0.1); color: #6bcba0; border: 1px solid rgba(107,203,160,0.18); }

    /* ── Word display ── */
    .word-display { text-align: center; margin: 20px 0 28px; }
    .word-en {
      font-family: 'DM Serif Display', serif;
      font-size: 2.6rem;
      color: #e8eaf0;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .word-hint {
      font-size: 0.7rem;
      color: rgba(232,234,240,0.25);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 10px;
    }

    /* ── Feedback banner ── */
    .feedback-banner {
      text-align: center;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 14px;
      animation: pop 0.18s ease;
    }
    .fb-correct   { background: rgba(107,203,160,0.09); color: #6bcba0; border: 1px solid rgba(107,203,160,0.18); }
    .fb-wrong     { background: rgba(201,107,107,0.09); color: #c96b6b; border: 1px solid rgba(201,107,107,0.18); }
    .fb-mc-correct { background: rgba(107,143,212,0.09); color: #6b8fd4; border: 1px solid rgba(107,143,212,0.18); }

    /* ── MC grid ── */
    .mc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }
    .mc-btn {
      padding: 15px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      color: #e8eaf0;
      font-family: 'Inter', sans-serif;
      font-size: 0.93rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.13s ease;
      text-align: center;
      line-height: 1.35;
    }
    .mc-btn:hover:not(:disabled) {
      border-color: #6b8fd4;
      background: rgba(107,143,212,0.09);
      transform: translateY(-1px);
    }
    .mc-btn.mc-correct {
      border-color: #6bcba0;
      background: rgba(107,203,160,0.1);
      color: #6bcba0;
    }
    .mc-btn.mc-wrong {
      border-color: #c96b6b;
      background: rgba(201,107,107,0.08);
      color: #c96b6b;
    }
    .mc-btn:disabled { cursor: default; }

    /* ── Type input ── */
    .type-input {
      width: 100%;
      padding: 15px 18px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: #e8eaf0;
      font-family: 'DM Serif Display', serif;
      font-size: 1.55rem;
      text-align: center;
      outline: none;
      transition: border-color 0.16s;
      margin-bottom: 12px;
    }
    .type-input:focus        { border-color: #6b8fd4; }
    .type-input.ti-correct   { border-color: #6bcba0; background: rgba(107,203,160,0.07); }
    .type-input.ti-wrong     { border-color: #c96b6b; background: rgba(201,107,107,0.06); }

    /* ── Upload / text fields ── */
    input[type="text"] {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px;
      padding: 11px 15px;
      color: #e8eaf0;
      font-family: 'Inter', sans-serif;
      font-size: 0.92rem;
      outline: none;
      margin-bottom: 12px;
      transition: border-color 0.15s;
    }
    input[type="text"]:focus { border-color: #6b8fd4; }

    textarea {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px;
      padding: 13px 15px;
      color: #e8eaf0;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      resize: vertical;
      outline: none;
      line-height: 1.7;
      transition: border-color 0.15s;
    }
    textarea:focus { border-color: #6b8fd4; }

    /* ── Results circle ── */
    .result-ring {
      width: 112px;
      height: 112px;
      border-radius: 50%;
      margin: 0 auto 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: conic-gradient(#6bcba0 0% var(--pct), rgba(255,255,255,0.06) var(--pct) 100%);
    }
    .result-pct {
      font-family: 'DM Serif Display', serif;
      font-size: 1.9rem;
      color: #e8eaf0;
      line-height: 1;
    }
    .result-pct-lbl {
      font-size: 0.65rem;
      color: rgba(232,234,240,0.35);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 3px;
    }

    /* ── Word review row ── */
    .word-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.045);
      font-size: 0.88rem;
    }
    .word-row:last-child { border-bottom: none; }

    /* ── Misc ── */
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 20px 0; }

    .streak-banner {
      margin-top: 20px;
      padding: 12px 16px;
      border-radius: 10px;
      background: rgba(201,168,76,0.07);
      border: 1px solid rgba(201,168,76,0.16);
      font-size: 0.84rem;
      color: #c9a84c;
      text-align: center;
    }

    .format-hint {
      background: rgba(107,143,212,0.06);
      border: 1px solid rgba(107,143,212,0.15);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 18px;
      font-size: 0.83rem;
      color: rgba(232,234,240,0.5);
      line-height: 1.6;
    }

    .new-best {
      text-align: center;
      font-size: 0.84rem;
      color: #c9a84c;
      font-weight: 600;
      margin-bottom: 8px;
    }

    /* ── Animations ── */
    @keyframes fall {
      to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
    @keyframes pop {
      from { transform: scale(0.92); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.3s ease forwards; }
  `;

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (screen === "landing") {
    const pills = [
      "A1 through C2 built in",
      "Upload your own lists",
      "Choose then spell mechanic",
      "Track your high scores",
      "No account needed",
      "Free forever",
    ];
    return (
      <>
        <style>{css}</style>
        <div className="landing">
          {/* Fixed nav */}
          <nav className="l-nav">
            <div className="l-nav-logo">
              <span className="l-nav-brand">CPVocab</span>
            </div>
            <span className="l-nav-sub">Spanish Vocab Trainer</span>
          </nav>

          {/* Hero */}
          <main className="l-hero">
            <span className="eyebrow">🇪🇸 Built for learners</span>

            <h1 className="hero-h1">Master your Spanish vocab</h1>
            <p className="hero-sub">one word at a time.</p>

            <p className="hero-desc">
              CPVocab uses a two-phase method — first identify the correct
              translation, then prove you know it by spelling it out. Work through
              six official CEFR levels from A1 to C2, or upload your own lists.
              Everything stays in your browser.
            </p>

            <div className="hero-cta">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setScreen("home")}
              >
                Start Learning →
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() =>
                  howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                How it works
              </button>
            </div>

            <div className="pill-row">
              {pills.map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </main>

          {/* Stats strip */}
          <div className="stats-strip" ref={howItWorksRef}>
            {[
              ["6", "CEFR Levels"],
              ["120+", "Built-in Words"],
              ["2", "Phase Method"],
              ["∞", "Custom Lists"],
            ].map(([num, lbl]) => (
              <div key={lbl} className="strip-item">
                <div className="strip-num">{num}</div>
                <div className="strip-lbl">{lbl}</div>
              </div>
            ))}
          </div>

          <footer className="l-footer">
            No data leaves your browser · Free to use · Built for learners
          </footer>
        </div>
      </>
    );
  }

  // ── HOME ─────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <div className="card fade-up" style={{ maxHeight: "calc(100vh - 48px)", overflowY: "auto" }}>
            {/* Logo */}
            <div className="logo-row">
              <span className="logo-name">CPVocab</span>
            </div>
            <p className="tagline" style={{ marginBottom: 24 }}>Spanish Vocab Trainer</p>

            <div className="section-label">Your Lists</div>

            {lists.map((list, i) => {
              const mastered = list.words.filter(
                (w) =>
                  (wordStats[w.es]?.seen || 0) >= 4 &&
                  (wordStats[w.es]?.wrong || 0) === 0
              ).length;
              const best = highScores[list.name];
              const hasWrong = list.words.some(
                (w) => (wordStats[w.es]?.wrong || 0) > 0
              );
              return (
                <div className="list-card" key={i}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                      <span className="list-name">{list.name}</span>
                      {best != null && (
                        <span className="badge-gold">🏆 {best}%</span>
                      )}
                    </div>
                    <div className="list-meta">
                      {list.words.length} words · {mastered} mastered
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                    <button className="btn btn-primary" onClick={() => startGame(list)}>
                      Play ▶
                    </button>
                    {hasWrong && (
                      <button className="btn btn-danger" onClick={() => startGame(list, true)}>
                        Review ⚡
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <button
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 6 }}
              onClick={() => setScreen("upload")}
            >
              + Add New List
            </button>

            {bestStreak > 0 && (
              <div className="streak-banner">
                🔥 Best streak this session: <strong>{bestStreak}</strong>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── UPLOAD ───────────────────────────────────────────────────────────────
  if (screen === "upload") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <div className="card fade-up">
            <button
              className="btn btn-ghost"
              style={{ marginBottom: 20 }}
              onClick={() => setScreen("home")}
            >
              ← Back
            </button>
            <div className="card-title" style={{ marginBottom: 4 }}>Add Vocab List</div>
            <p style={{ fontSize: "0.85rem", color: "rgba(232,234,240,0.35)", marginBottom: 22 }}>
              Paste your words below, one per line
            </p>

            <div className="format-hint">
              <strong style={{ color: "#6b8fd4" }}>Format:</strong> one pair per line,
              separated by a dash, comma, or pipe<br />
              <span style={{ fontFamily: "monospace", display: "block", marginTop: 6, color: "rgba(232,234,240,0.55)" }}>
                hello - hola<br />
                goodbye - adiós<br />
                library - la biblioteca
              </span>
            </div>

            <input
              type="text"
              placeholder="List name (e.g. Week 3 Vocab)"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
            />

            <textarea
              rows={10}
              placeholder={"to achieve - lograr\nto overcome - superar\nmeanwhile - mientras tanto"}
              value={uploadText}
              onChange={(e) => setUploadText(e.target.value)}
            />

            {uploadError && (
              <p style={{ color: "#c96b6b", fontSize: "0.83rem", marginTop: 10 }}>
                {uploadError}
              </p>
            )}

            <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 16 }}
              onClick={handleUpload}
            >
              Save List
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── GAME ─────────────────────────────────────────────────────────────────
  if (screen === "game" && currentWord) {
    const progressPct = Math.round((currentIdx / queue.length) * 100);

    const fbText = () => {
      if (feedback === "mc-correct") return "✓ Correct — now spell it in Spanish";
      if (feedback === "correct")
        return `✓ Perfect!${streak >= 3 ? `  🔥 ${streak} streak` : ""}`;
      if (feedback === "wrong") return `✗  ${currentWord.es}`;
      return null;
    };

    const fbClass = () => {
      if (feedback === "mc-correct") return "feedback-banner fb-mc-correct";
      if (feedback === "correct") return "feedback-banner fb-correct";
      if (feedback === "wrong") return "feedback-banner fb-wrong";
      return "";
    };

    return (
      <>
        <style>{css}</style>
        <Confetti active={showConfetti} />
        <div className="app">
          <div className="card fade-up">
            {/* Header row */}
            <div className="game-header">
              <button className="btn btn-exit" onClick={() => setScreen("home")}>
                ✕ Exit
              </button>
              <span className="game-counter">
                {currentIdx + 1} / {queue.length}
              </span>
              <span className="game-streak">🔥 {streak}</span>
            </div>

            {/* Progress */}
            <div className="progress-wrap">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-chip">
                <div className="stat-val col-correct">{score.correct}</div>
                <div className="stat-lbl">Correct</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val col-wrong">{score.wrong}</div>
                <div className="stat-lbl">Wrong</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val col-gold">{streak}</div>
                <div className="stat-lbl">Streak</div>
              </div>
            </div>

            {/* Phase chip */}
            <div style={{ textAlign: "center" }}>
              <span className={`phase-chip ${phase === "mc" ? "phase-mc" : "phase-spell"}`}>
                {phase === "mc" ? "⊞ Multiple Choice" : "✏ Spell it"}
              </span>
            </div>

            {/* Word */}
            <div className="word-display">
              <div className="word-en">{currentWord.en}</div>
              <div className="word-hint">
                {phase === "mc" ? "Choose the Spanish translation" : "Type in Spanish"}
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={fbClass()}>{fbText()}</div>
            )}

            {/* MC phase */}
            {phase === "mc" && (
              <div className="mc-grid">
                {options.map((opt) => {
                  let cls = "mc-btn";
                  if (mcPicked) {
                    if (opt === currentWord.es) cls += " mc-correct";
                    else if (opt === mcPicked) cls += " mc-wrong";
                  }
                  return (
                    <button
                      key={opt}
                      className={cls}
                      disabled={!!mcPicked}
                      onClick={() => handleMCAnswer(opt)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Spell phase */}
            {phase === "spell" && (
              <>
                <input
                  ref={inputRef}
                  className={`type-input${feedback === "correct" ? " ti-correct" : feedback === "wrong" ? " ti-wrong" : ""}`}
                  type="text"
                  placeholder="escribe en español…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !feedback) handleSpellAnswer(input);
                  }}
                  disabled={!!feedback}
                  autoComplete="off"
                  spellCheck={false}
                />
                {!feedback && (
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => handleSpellAnswer(input)}
                  >
                    Check →
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (screen === "results") {
    const total = score.correct + score.wrong;
    const pct = total ? Math.round((score.correct / total) * 100) : 0;
    const grade =
      pct >= 90 ? "¡Excelente! 🌟"
      : pct >= 70 ? "¡Muy bien! 👏"
      : pct >= 50 ? "¡Bien! Keep going 💪"
      : "Keep practising 📚";
    const isNewBest =
      activeList && pct > 0 && pct >= (highScores[activeList.name] || 0);
    const hardWords =
      activeList?.words.filter((w) => (wordStats[w.es]?.wrong || 0) > 0) || [];

    return (
      <>
        <style>{css}</style>
        <Confetti active={pct >= 80} />
        <div className="app">
          <div className="card fade-up">
            <div className="card-title" style={{ textAlign: "center", marginBottom: 24 }}>
              Round Complete
            </div>

            {/* Score ring */}
            <div className="result-ring" style={{ "--pct": `${pct}%` }}>
              <div className="result-pct">{pct}%</div>
              <div className="result-pct-lbl">score</div>
            </div>

            {isNewBest && <p className="new-best">🏆 New best score!</p>}

            <p style={{ textAlign: "center", fontSize: "1.15rem", fontWeight: 600, marginBottom: 6 }}>
              {grade}
            </p>
            <p style={{ textAlign: "center", fontSize: "0.83rem", color: "rgba(232,234,240,0.35)", marginBottom: 4 }}>
              {score.correct} correct · {score.wrong} wrong · best streak {bestStreak}
            </p>

            {hardWords.length > 0 && (
              <>
                <hr className="divider" />
                <p style={{ fontSize: "0.78rem", color: "#c96b6b", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ⚡ To review ({hardWords.length})
                </p>
                <div style={{ maxHeight: 148, overflowY: "auto" }}>
                  {hardWords.map((w) => (
                    <div className="word-row" key={w.es}>
                      <span style={{ color: "rgba(232,234,240,0.5)" }}>{w.en}</span>
                      <span style={{ color: "#6b8fd4", fontWeight: 600 }}>{w.es}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <hr className="divider" />

            <div style={{ display: "flex", gap: 9 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => startGame(activeList)}
              >
                Play Again
              </button>
              {hardWords.length > 0 && (
                <button
                  className="btn btn-gold"
                  style={{ flex: 1 }}
                  onClick={() => startGame(activeList, true)}
                >
                  Review ⚡
                </button>
              )}
            </div>
            <button
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 9 }}
              onClick={() => setScreen("home")}
            >
              ← Back to Lists
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}
