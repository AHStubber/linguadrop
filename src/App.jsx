// Copyright © 2026 AH Stubber. All rights reserved.
// CPVocab — cpvocab.com
// This code may not be copied, modified, or redistributed without explicit written permission.
import { useState, useEffect, useCallback, useRef } from "react";

// ── Clipboard icon with Spanish flag colours ───────────────────────────────
function ClipboardIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="46" rx="6" fill="#1e2d4a" stroke="#3a5080" strokeWidth="1.5"/>
      <rect x="22" y="10" width="20" height="10" rx="4" fill="#2a3a5c" stroke="#3a5080" strokeWidth="1.5"/>
      <rect x="26" y="8" width="12" height="6" rx="3" fill="#1a2840"/>
      <clipPath id="flag-clip">
        <rect x="11" y="28" width="42" height="28"/>
      </clipPath>
      <g clipPath="url(#flag-clip)">
        <rect x="11" y="28" width="42" height="8" fill="#c60b1e"/>
        <rect x="11" y="36" width="42" height="12" fill="#ffc400"/>
        <rect x="11" y="48" width="42" height="8" fill="#c60b1e"/>
      </g>
      <line x1="18" y1="22" x2="46" y2="22" stroke="#3a5080" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="27" x2="38" y2="27" stroke="#3a5080" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="10" y="14" width="44" height="46" rx="6" fill="none" stroke="#3a5080" strokeWidth="1.5"/>
    </svg>
  );
}

function LogoBrand() {
  return (
    <><span style={{ color: "#e8eaf0" }}>CP</span><span style={{ color: "#6b8fd4" }}>Vocab</span></>
  );
}

// ── Default CEFR vocab lists ───────────────────────────────────────────────
const DEFAULT_LISTS = [
  {
    name: "A1 — Beginner",
    isDefault: true,
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
    isDefault: true,
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
    isDefault: true,
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
    isDefault: true,
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
    isDefault: true,
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
    isDefault: true,
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

// ── Corre SVGs ────────────────────────────────────────────────────────────
function CorreBullSVG({ danger = false }) {
  return (
    <svg width="96" height="68" viewBox="0 0 96 68" fill="none">
      <ellipse cx="56" cy="38" rx="30" ry="19" fill="#6B3A1F"/>
      <ellipse cx="56" cy="38" rx="26" ry="16" fill="#7a4525"/>
      <ellipse cx="53" cy="27" rx="22" ry="7" fill="#9a5a30" opacity="0.38"/>
      <ellipse cx="50" cy="24" rx="13" ry="8" fill="#5a3018"/>
      <ellipse cx="30" cy="34" rx="14" ry="11" fill="#6B3A1F"/>
      <ellipse cx="16" cy="32" rx="15" ry="13" fill="#7a4525"/>
      <ellipse cx="11" cy="23" rx="8" ry="6" fill="#6B3A1F"/>
      <path d="M6 20 Q-4 4 8 12" stroke="#D4A85A" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M21 18 Q32 3 20 11" stroke="#D4A85A" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <circle cx="8" cy="12" r="2.2" fill="#b88840"/>
      <circle cx="20" cy="11" r="2.2" fill="#b88840"/>
      <circle cx="11" cy="29" r="4.5" fill="#1a0800"/>
      <circle cx="11" cy="29" r="2.5" fill="#080200"/>
      <circle cx="9.5" cy="27.8" r="1.1" fill="white" opacity="0.75"/>
      <path d="M6 24 Q11 21 17 24" stroke="#2a1008" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="5" cy="37" rx="7" ry="5.5" fill="#5a2a10"/>
      <ellipse cx="3" cy="36" r="1.8" fill="#1a0800"/>
      <ellipse cx="8" cy="36" r="1.8" fill="#1a0800"/>
      <path d="M2.5 39 Q5.5 42 8.5 39" stroke="#D4A85A" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {!danger ? (
        <>
          <path d="M0 30 Q-4 24 0 18" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          <path d="M3 29 Q-1 22 3 16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </>
      ) : (
        <>
          <path d="M0 30 Q-6 22 0 14" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M3 29 Q-3 20 3 12" stroke="#ff6655" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M7 28 Q1 19 7 11" stroke="#ff3322" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        </>
      )}
      <path d="M28 52 Q55 60 82 50" stroke="#3a1a08" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M86 28 Q94 16 90 8" stroke="#5a3018" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <circle cx="90" cy="7" r="4.5" fill="#5a3018"/>
      <rect x="28" y="46" width="9" height="16" rx="4.5" fill="#5a3018" transform="rotate(-25 32 50)"/>
      <ellipse cx="23" cy="59" rx="5.5" ry="2.5" fill="#2a1008"/>
      <rect x="40" y="50" width="9" height="18" rx="4.5" fill="#5a3018"/>
      <ellipse cx="44.5" cy="67" rx="5.5" ry="2.5" fill="#2a1008"/>
      <rect x="62" y="49" width="9" height="17" rx="4.5" fill="#5a3018"/>
      <ellipse cx="66.5" cy="65" rx="5.5" ry="2.5" fill="#2a1008"/>
      <rect x="73" y="45" width="9" height="15" rx="4.5" fill="#5a3018" transform="rotate(22 77 50)"/>
      <ellipse cx="82" cy="56" rx="5.5" ry="2.5" fill="#2a1008"/>
    </svg>
  );
}

function CorreMatadorSVG({ danger = false }) {
  return (
    <svg width="50" height="82" viewBox="-22 0 72 82" fill="none">
      <path d={danger ? "M12 42 Q-14 48 -18 62 Q-10 65 6 58 Q10 50 12 46 Z" : "M12 42 Q-8 48 -12 60 Q-4 63 6 56 Q10 50 12 46 Z"} fill="#c60b1e" opacity="0.9"/>
      <path d={danger ? "M12 42 Q-14 48 -18 62 Q-10 65 6 58 Q10 50 12 46 Z" : "M12 42 Q-8 48 -12 60 Q-4 63 6 56 Q10 50 12 46 Z"} fill="#ffc400" opacity="0.25"/>
      <ellipse cx="25" cy="10" rx="16" ry="4.5" fill="#1a1a2e"/>
      <rect x="17" y="4" width="16" height="8" rx="2.5" fill="#1a1a2e"/>
      <path d="M17 4 Q25 1 33 4" stroke="#D4A85A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="25" cy="2" r="2" fill="#D4A85A" opacity="0.85"/>
      <ellipse cx="25" cy="22" rx="9.5" ry="10.5" fill="#f4c896"/>
      <circle cx="21" cy="20" r="2.2" fill="#2a1a0a"/>
      <circle cx="29" cy="20" r="2.2" fill="#2a1a0a"/>
      <circle cx="20.3" cy="19.2" r="0.75" fill="white" opacity="0.7"/>
      <circle cx="28.3" cy="19.2" r="0.75" fill="white" opacity="0.7"/>
      <path d="M18 16 Q21 14 24 16" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M26 16 Q29 14 32 16" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M21 28 Q25 26 29 28" stroke="#c0705a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="36" cy="17" rx="1.4" ry="2" fill="rgba(100,190,255,0.55)" transform="rotate(15 36 17)"/>
      <ellipse cx="38" cy="22" rx="1.1" ry="1.7" fill="rgba(100,190,255,0.45)" transform="rotate(10 38 22)"/>
      {danger && <ellipse cx="36" cy="27" rx="1" ry="1.5" fill="rgba(100,190,255,0.4)" transform="rotate(5 36 27)"/>}
      <rect x="22" y="31" width="6" height="6" rx="2" fill="#f4c896"/>
      <rect x="18" y="36" width="14" height="18" rx="2" fill="#c60b1e"/>
      <path d="M18 36 L11 44 L12 54 L18 54 Z" fill="#c60b1e"/>
      <path d="M32 36 L39 44 L38 54 L32 54 Z" fill="#c60b1e"/>
      <line x1="21" y1="36" x2="21" y2="54" stroke="#D4A85A" strokeWidth="1.8"/>
      <line x1="29" y1="36" x2="29" y2="54" stroke="#D4A85A" strokeWidth="1.8"/>
      <line x1="18" y1="40" x2="32" y2="40" stroke="#D4A85A" strokeWidth="1.5"/>
      <line x1="18" y1="46" x2="32" y2="46" stroke="#D4A85A" strokeWidth="1.2"/>
      <circle cx="25" cy="42" r="1.2" fill="#D4A85A"/>
      <circle cx="25" cy="47" r="1.2" fill="#D4A85A"/>
      <circle cx="25" cy="52" r="1.2" fill="#D4A85A"/>
      <ellipse cx="17" cy="36" rx="6" ry="3" fill="#D4A85A"/>
      <ellipse cx="33" cy="36" rx="6" ry="3" fill="#D4A85A"/>
      <path d="M32 40 Q41 35 39 44" stroke="#c60b1e" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M18 40 Q9 45 11 52" stroke="#c60b1e" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <circle cx="39" cy="44" r="3.2" fill="#f4c896"/>
      <circle cx="11" cy="52" r="3.2" fill="#f4c896"/>
      <rect x="19" y="54" width="6" height="22" rx="3" fill="#f0e8c8"/>
      <rect x="25" y="54" width="6" height="22" rx="3" fill="#e8e0be"/>
      <path d="M19 75 Q14 78 11 75 L14 72 L19 74 Z" fill="#1a1a2e"/>
      <path d="M31 75 Q36 78 39 75 L36 72 L31 74 Z" fill="#1a1a2e"/>
    </svg>
  );
}

// ── Help Modal ────────────────────────────────────────────────────────────
function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">How to add your vocab lists</h2>
        <p className="modal-body">
          Copy and paste your word pairs directly into CPVocab. Each word pair
          goes on a new line with the English word first, separated by a dash,
          comma, or pipe.
        </p>
        <div className="modal-code">
          <div>hello - hola</div>
          <div>goodbye — adiós</div>
          <div>library | la biblioteca</div>
          <div>water, agua</div>
        </div>
        <ul className="modal-notes">
          <li>English always comes first</li>
          <li>Accents are optional — the app accepts both <em>adiós</em> and <em>adios</em></li>
          <li>Minimum 2 word pairs required</li>
        </ul>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 20 }} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

// ── Add Words Modal ───────────────────────────────────────────────────────
function AddWordsModal({ list, onAdd, onDeleteWord, onClose }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleAdd() {
    const words = parseVocab(text);
    if (words.length === 0) {
      setError("No valid word pairs found. Format: English - Spanish");
      return;
    }
    onAdd(words);
    setText("");
    setError("");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title" style={{ marginBottom: 16 }}>Manage words — {list.name}</h2>

        {/* Existing words */}
        <p className="section-label" style={{ marginBottom: 8 }}>Current words ({list.words.length})</p>
        {list.words.length === 0 ? (
          <p style={{ fontSize: "0.8rem", color: "rgba(232,234,240,0.25)", fontStyle: "italic", marginBottom: 12 }}>
            No words yet — add some below.
          </p>
        ) : (
          <div className="modal-word-list">
            {list.words.map((w, wi) => (
              <div key={wi} className="modal-word-row">
                <span className="modal-word-en">{w.en}</span>
                <span className="modal-word-sep">→</span>
                <span className="modal-word-es">{w.es}</span>
                <button
                  className="list-delete-btn"
                  style={{ fontSize: "0.85rem", padding: "2px 4px" }}
                  title="Remove word"
                  onClick={() => onDeleteWord(wi)}
                >🗑</button>
              </div>
            ))}
          </div>
        )}

        <hr className="divider" style={{ margin: "16px 0" }} />

        {/* Add new words */}
        <p className="section-label" style={{ marginBottom: 8 }}>Add new words</p>
        <div className="format-hint" style={{ marginBottom: 10 }}>
          <strong style={{ color: "#6b8fd4" }}>Format:</strong> one pair per line<br />
          <span style={{ fontFamily: "monospace", display: "block", marginTop: 4, color: "rgba(232,234,240,0.55)" }}>
            hello - hola &nbsp;·&nbsp; goodbye — adiós &nbsp;·&nbsp; water, agua
          </span>
        </div>
        <textarea
          rows={4}
          placeholder={"to achieve - lograr\nto overcome - superar"}
          value={text}
          onChange={(e) => { setText(e.target.value); setError(""); }}
        />
        {error && <p style={{ color: "#c96b6b", fontSize: "0.83rem", marginTop: 6 }}>{error}</p>}
        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Done</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>Add Words</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────
function DeleteConfirmModal({ listName, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Delete list?</h2>
        <p className="modal-body">
          Delete <strong style={{ color: "#e8eaf0" }}>{listName}</strong>? This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 9, marginTop: 24 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" style={{ flex: 1 }} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── About Modal ───────────────────────────────────────────────────────────
function AboutModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">About CPVocab</h2>
        <p style={{ marginBottom: 14, color: "rgba(232,234,240,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          CPVocab was built by a Spanish learner who couldn't find a vocab tool that was good enough. Most tools made you pick a meaning from a dictionary or forced you through set lessons before you could study your own words.
        </p>
        <p style={{ marginBottom: 14, color: "rgba(232,234,240,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          CPVocab is different — just copy and paste the lists you create with your tutor, build with Google Translate, or generate with any AI tool, and get straight to learning. No setup, no lessons, no friction.
        </p>
        <p style={{ marginBottom: 14, color: "rgba(232,234,240,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          Use it on your computer or mobile — it may be simple but it just works. Just copy, paste and get going.
        </p>
        <p style={{ marginBottom: 14, color: "rgba(232,234,240,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          A great companion for anyone learning Spanish — with or without a tutor.
        </p>
        <p style={{ marginBottom: 14, fontSize: "0.9rem" }}>
          Questions or feedback? Get in touch at{" "}
          <a href="mailto:CPVocab@gmail.com" style={{ color: "#6b8fd4", textDecoration: "none" }}>
            CPVocab@gmail.com
          </a>
        </p>
        <p style={{ marginBottom: 10, fontSize: "0.85rem", color: "rgba(232,234,240,0.45)" }}>
          If CPVocab has helped your Spanish learning, you can support us here:
        </p>
        <a
          href="https://ko-fi.com/cpvocab"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            border: "1px solid rgba(201,168,76,0.35)",
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: "0.85rem",
            color: "rgba(201,168,76,0.75)",
            textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          🍺 Buy us a cerveza
        </a>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 22 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

// ── App Footer ────────────────────────────────────────────────────────────
function AppFooter({ onAbout }) {
  return (
    <footer className="app-footer">
      <div>
        © 2026 CPVocab · No data leaves your browser · contact:{" "}
        <a href="mailto:CPVocab@gmail.com" className="footer-link">CPVocab@gmail.com</a>
        {" · "}
        <button className="footer-link-btn" onClick={onAbout}>About</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <a
          href="https://ko-fi.com/cpvocab"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-kofi-btn"
        >
          🍺 Buy us a cerveza
        </a>
      </div>
    </footer>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");

  const [lists, setLists] = useState(() => {
    try {
      const saved = localStorage.getItem("cpvocab_lists");
      if (!saved) return DEFAULT_LISTS;
      const defaultNames = new Set(DEFAULT_LISTS.map((l) => l.name));
      return JSON.parse(saved).map((l) =>
        defaultNames.has(l.name) ? { ...l, isDefault: true } : l
      );
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
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [editingListIdx, setEditingListIdx] = useState(null);
  const [editingListName, setEditingListName] = useState("");
  const [addWordsListIdx, setAddWordsListIdx] = useState(null);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState(null);

  // ── Corre! game state ─────────────────────────────────────────────────────
  const [correScores, setCorreScores] = useState(() => {
    try {
      const saved = localStorage.getItem("cpvocab_correScores");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [correQueue, setCorreQueue] = useState([]);
  const [correIdx, setCorreIdx] = useState(0);
  const [correScore, setCorreScore] = useState(0);
  const [correOptions, setCorreOptions] = useState([]);
  const [correPhase, setCorrePhase] = useState("playing");
  const [correPicked, setCorrePicked] = useState(null);
  const [correWrongWords, setCorreWrongWords] = useState([]);
  const [correNewBest, setCorreNewBest] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [shieldActive, setShieldActive] = useState(true);
  const [bullPosOverride, setBullPosOverride] = useState(null);
  const [matadorAnim, setMatadorAnim] = useState("run");

  const inputRef = useRef(null);
  const howItWorksRef = useRef(null);
  const correTimerRef = useRef(null);
  const correGameRef = useRef({});

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

  useEffect(() => {
    localStorage.setItem("cpvocab_correScores", JSON.stringify(correScores));
  }, [correScores]);

  // Corre options — set on each new word
  useEffect(() => {
    if (screen !== "corre" || !correQueue[correIdx] || !activeList) return;
    const word = correQueue[correIdx];
    const wrongs = getWrongOptions(word, activeList.words);
    setCorreOptions(shuffle([word.es, ...wrongs]));
    setCorrePicked(null);
    setBullPosOverride(null);
    setMatadorAnim("run");
  }, [correIdx, screen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Corre timer — 5 seconds per word
  useEffect(() => {
    if (screen !== "corre" || correPhase !== "playing") { stopCorreTimer(); return; }
    setTimeRemaining(5);
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += 100;
      const remaining = Math.max(0, 5 - elapsed / 1000);
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(id); correTimerRef.current = null;
        const { correPicked: cp } = correGameRef.current;
        if (cp !== null) return;
        setCorrePicked("__timeout__");
        doWrongAnswer();
      }
    }, 100);
    correTimerRef.current = id;
    return () => { clearInterval(id); correTimerRef.current = null; };
  }, [correIdx, screen, correPhase]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Keyboard shortcuts: press 1–4 to pick MC answer
  useEffect(() => {
    function onKey(e) {
      const idx = ["1", "2", "3", "4"].indexOf(e.key);
      if (idx === -1) return;
      if (screen === "game" && phase === "mc" && !mcPicked && options[idx]) {
        handleMCAnswer(options[idx]);
      }
      if (screen === "corre" && correPhase === "playing" && !correPicked && correOptions[idx]) {
        handleCorreAnswer(correOptions[idx]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, phase, mcPicked, options, correPicked, correPhase, correOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCopyLink() {
    navigator.clipboard.writeText("https://www.cpvocab.com");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

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

  function handleRenameList(idx, newName) {
    const trimmed = newName.trim();
    const oldName = lists[idx].name;
    if (!trimmed || trimmed === oldName) { setEditingListIdx(null); return; }
    setLists((prev) => prev.map((l, i) => (i === idx ? { ...l, name: trimmed } : l)));
    setHighScores((prev) => {
      const next = { ...prev };
      if (next[oldName] !== undefined) { next[trimmed] = next[oldName]; delete next[oldName]; }
      return next;
    });
    setCorreScores((prev) => {
      const next = { ...prev };
      if (next[oldName] !== undefined) { next[trimmed] = next[oldName]; delete next[oldName]; }
      return next;
    });
    setEditingListIdx(null);
  }

  function handleAddWords(idx, newWords) {
    const list = lists[idx];
    const existingEn = new Set(list.words.map((w) => w.en));
    const toAdd = newWords.filter((w) => !existingEn.has(w.en));
    if (toAdd.length === 0) return;
    const listWordKeys = list.words.map((w) => w.es);
    setWordStats((prev) => {
      const next = { ...prev };
      listWordKeys.forEach((k) => delete next[k]);
      return next;
    });
    setHighScores((prev) => { const next = { ...prev }; delete next[list.name]; return next; });
    setLists((prev) => prev.map((l, i) => (i === idx ? { ...l, words: [...l.words, ...toAdd] } : l)));
  }

  function handleDeleteWord(listIdx, wordIdx) {
    const list = lists[listIdx];
    const listWordKeys = list.words.map((w) => w.es);
    setWordStats((prev) => {
      const next = { ...prev };
      listWordKeys.forEach((k) => delete next[k]);
      return next;
    });
    setHighScores((prev) => { const next = { ...prev }; delete next[list.name]; return next; });
    setLists((prev) =>
      prev.map((l, i) =>
        i === listIdx ? { ...l, words: l.words.filter((_, wi) => wi !== wordIdx) } : l
      )
    );
  }

  function handleDeleteList(idx) {
    const list = lists[idx];
    const listWordKeys = list.words.map((w) => w.es);
    setWordStats((prev) => {
      const next = { ...prev };
      listWordKeys.forEach((k) => delete next[k]);
      return next;
    });
    setHighScores((prev) => { const next = { ...prev }; delete next[list.name]; return next; });
    setCorreScores((prev) => { const next = { ...prev }; delete next[list.name]; return next; });
    setLists((prev) => prev.filter((_, i) => i !== idx));
    setDeleteConfirmIdx(null);
  }

  // ── Corre! logic ──────────────────────────────────────────────────────────
  function selectMode(list) {
    setActiveList(list);
    setScreen("modeSelect");
  }

  function stopCorreTimer() {
    if (correTimerRef.current) { clearInterval(correTimerRef.current); correTimerRef.current = null; }
  }

  function saveCorreScore(won, wordsSurvived) {
    if (!activeList) return;
    setCorreScores((prev) => {
      const name = activeList.name;
      const cur = prev[name];
      let isNew = false;
      if (won) {
        isNew = !cur || !cur.completed;
      } else {
        isNew = !cur || (!cur.completed && wordsSurvived > (cur.bestWordsSurvived || 0));
      }
      if (isNew) {
        setCorreNewBest(true);
        return { ...prev, [name]: { completed: won, bestWordsSurvived: wordsSurvived } };
      }
      return prev;
    });
  }

  function doCorreWin() {
    stopCorreTimer();
    setCorrePhase("win");
    setBullPosOverride(0);
    setMatadorAnim("celebrate");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    const { correQueue: cq } = correGameRef.current;
    saveCorreScore(true, cq.length);
    setTimeout(() => setScreen("correResults"), 2600);
  }

  function doWrongAnswer() {
    const { shieldActive: sa, correIdx: ci, correQueue: cq } = correGameRef.current;
    const word = cq[ci];
    setCorreWrongWords((prev) => [...prev, word]);
    stopCorreTimer();

    if (sa) {
      setShieldActive(false);
      setBullPosOverride(60);
      setMatadorAnim("jump");
      setTimeout(() => {
        const nextIdx = ci + 1;
        if (nextIdx >= cq.length) {
          doCorreWin();
        } else {
          setCorreIdx(nextIdx);
        }
      }, 950);
    } else {
      setMatadorAnim("flip");
      setBullPosOverride(90);
      setTimeout(() => setCorrePhase("lose"), 600);
      saveCorreScore(false, ci);
      setTimeout(() => setScreen("correResults"), 1800);
    }
  }

  function startCorre(list) {
    stopCorreTimer();
    const words = shuffle([...list.words]);
    setActiveList(list);
    setCorreQueue(words);
    setCorreIdx(0);
    setCorreScore(0);
    setCorrePicked(null);
    setCorreWrongWords([]);
    setCorreNewBest(false);
    setTimeRemaining(5);
    setShieldActive(true);
    setBullPosOverride(null);
    setMatadorAnim("run");
    setCorrePhase("playing");
    setScreen("corre");
  }

  function handleCorreAnswer(opt) {
    const { correPicked: cp, correPhase: ph, correIdx: ci, correQueue: cq } = correGameRef.current;
    if (cp !== null || ph !== "playing") return;
    const word = cq[ci];
    setCorrePicked(opt);
    if (opt === word.es) {
      setCorreScore((s) => s + 1);
      stopCorreTimer();
      setMatadorAnim("jump");
      setTimeout(() => {
        const nextIdx = ci + 1;
        if (nextIdx >= cq.length) {
          doCorreWin();
        } else {
          setCorreIdx(nextIdx);
        }
      }, 680);
    } else {
      doWrongAnswer();
    }
  }

  // Keep ref in sync with latest render values for timer/event closures
  correGameRef.current = { correPhase, correPicked, shieldActive, correIdx, correQueue };

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
      margin-bottom: 40px;
    }

    .demo-section {
      width: 100%;
    }

    .demo-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: rgba(232,234,240,0.28);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      text-align: center;
      margin-bottom: 16px;
    }

    .demo-video-wrap {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
    }

    .demo-video-wrap iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
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

    /* ── Modal ── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 24px;
    }

    .modal-card {
      background: #181c24;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      padding: 32px;
      width: 100%;
      max-width: 500px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      animation: fadeUp 0.2s ease;
    }

    .modal-word-list {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      margin-bottom: 4px;
    }

    .modal-word-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .modal-word-row:last-child { border-bottom: none; }

    .modal-word-en {
      font-size: 0.83rem;
      color: rgba(232,234,240,0.55);
      flex: 1;
      min-width: 0;
    }

    .modal-word-sep {
      font-size: 0.75rem;
      color: rgba(232,234,240,0.2);
      flex-shrink: 0;
    }

    .modal-word-es {
      font-size: 0.83rem;
      color: #6b8fd4;
      flex: 1;
      min-width: 0;
    }

    .modal-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.5rem;
      color: #e8eaf0;
      margin-bottom: 14px;
    }

    .modal-body {
      font-size: 0.9rem;
      color: rgba(232,234,240,0.55);
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .modal-code {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 14px 16px;
      font-family: monospace;
      font-size: 0.88rem;
      color: rgba(232,234,240,0.6);
      line-height: 1.9;
      margin-bottom: 16px;
    }

    .modal-notes {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .modal-notes li {
      font-size: 0.83rem;
      color: rgba(232,234,240,0.45);
      padding-left: 16px;
      position: relative;
    }

    .modal-notes li::before {
      content: '·';
      position: absolute;
      left: 4px;
      color: #6b8fd4;
    }

    /* ── Logo button ── */
    .logo-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 9px;
    }

    /* ── Help link ── */
    .help-link {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: #6b8fd4;
      line-height: 1;
    }
    .help-link:hover { opacity: 0.75; }

    /* ── List management controls ── */
    .list-name-input {
      font-size: 0.93rem;
      font-weight: 600;
      color: #e8eaf0;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(107,143,212,0.45);
      border-radius: 6px;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      outline: none;
      flex: 1;
      min-width: 0;
    }
    .list-name-input:focus { border-color: #6b8fd4; }

    .list-edit-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(107,143,212,0.45);
      font-size: 0.72rem;
      padding: 2px 6px;
      line-height: 1;
      transition: color 0.14s;
      flex-shrink: 0;
    }
    .list-edit-btn:hover { color: #6b8fd4; }

    .list-action-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b8fd4;
      font-size: 0.74rem;
      padding: 0;
      font-family: 'Inter', sans-serif;
      line-height: 1;
      flex-shrink: 0;
    }
    .list-action-btn:hover { opacity: 0.7; }

    .list-delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(201,107,107,0.45);
      font-size: 1rem;
      padding: 4px 4px;
      line-height: 1;
      transition: color 0.14s;
      flex-shrink: 0;
    }
    .list-delete-btn:hover { color: #c96b6b; }

    /* ── Mode select ── */
    .mode-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      cursor: pointer;
      transition: border-color 0.14s, background 0.14s, transform 0.14s;
      margin-bottom: 10px;
      background: rgba(255,255,255,0.02);
      width: 100%;
      text-align: left;
    }
    .mode-card:hover {
      background: rgba(255,255,255,0.045);
      border-color: rgba(255,255,255,0.13);
      transform: translateY(-1px);
    }
    .mode-card-corre { border-color: rgba(201,107,107,0.18); }
    .mode-card-corre:hover { border-color: rgba(201,107,107,0.38); background: rgba(201,107,107,0.05); }
    .mode-icon { font-size: 2rem; line-height: 1; flex-shrink: 0; }
    .mode-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.2rem;
      color: #e8eaf0;
      margin-bottom: 4px;
    }
    .mode-desc { font-size: 0.82rem; color: rgba(232,234,240,0.42); line-height: 1.5; }

    /* ── Corre arena ── */
    .corre-timer-bar-wrap {
      height: 6px;
      background: rgba(0,0,0,0.35);
      border-radius: 4px 4px 0 0;
      overflow: hidden;
    }
    .corre-timer-bar-fill {
      height: 100%;
      transition: width 0.1s linear, background 0.5s;
    }
    .corre-arena {
      position: relative;
      border-radius: 0 0 12px 12px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
      border-top: none;
      margin-bottom: 16px;
    }
    .corre-sky {
      height: 40px;
      background: linear-gradient(180deg, #080c16 0%, #111e38 55%, #1e2e50 100%);
      position: relative;
      overflow: hidden;
    }
    .corre-sun {
      position: absolute;
      right: 28px;
      top: 7px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle, #ffe066 30%, #ffc400 60%, rgba(255,196,0,0) 100%);
      box-shadow: 0 0 18px 6px rgba(255,196,0,0.22);
    }
    .corre-stands {
      height: 38px;
      background: linear-gradient(180deg, #0e1320 0%, #1a2030 100%);
      display: flex;
      align-items: flex-end;
      padding: 0 6px 3px;
      overflow: hidden;
      border-bottom: 2px solid #252e40;
    }
    .corre-crowd-row {
      display: flex;
      gap: 2px;
      width: 100%;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .corre-crowd-head {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .corre-barrier {
      height: 12px;
      background: linear-gradient(180deg, #d4a860 0%, #b88440 100%);
      border-top: 2px solid #e8c078;
      border-bottom: 2px solid #7a5020;
    }
    .corre-floor {
      height: 100px;
      position: relative;
      background: linear-gradient(180deg, #d4a870 0%, #c49060 50%, #b47840 100%);
      overflow: hidden;
    }
    .corre-floor-line {
      position: absolute;
      top: 0;
      width: 1px;
      height: 100%;
      background: rgba(100,60,10,0.12);
    }
    .corre-floor-hline {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(100,60,10,0.1);
    }

    /* Bull */
    .corre-bull-wrap {
      position: absolute;
      bottom: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: left 0.12s linear;
      animation: bullGallop 0.28s ease-in-out infinite;
    }
    .corre-bull-wrap.danger { animation: bullDangerGallop 0.15s ease-in-out infinite; }
    .corre-bull-wrap.retreating { animation: none; transition: left 1.8s ease; }

    /* Shadows */
    .corre-shadow {
      width: 52px; height: 7px;
      border-radius: 50%;
      background: rgba(70,35,0,0.25);
      margin-top: -2px;
    }
    .corre-shadow-mat {
      width: 28px; height: 5px;
      border-radius: 50%;
      background: rgba(70,35,0,0.2);
      margin-top: -2px;
    }

    /* Matador */
    .corre-matador-wrap {
      position: absolute;
      right: 16px;
      bottom: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .corre-matador-inner { animation: matadorRun 0.55s ease-in-out infinite; }
    .corre-matador-inner.danger { animation: matadorDanger 0.22s ease-in-out infinite; }
    .corre-matador-inner.jump { animation: matadorJump 0.7s ease forwards; }
    .corre-matador-inner.flip { animation: matadorFlip 0.85s ease forwards; }
    .corre-matador-inner.celebrate { animation: matadorCelebrate 0.6s ease-in-out infinite; }

    /* Overlay */
    .corre-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
      background: rgba(0,0,0,0.15);
    }
    .corre-ole {
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      font-size: 2.8rem;
      color: #c9a84c;
      text-shadow: 0 2px 18px rgba(0,0,0,0.7);
      animation: fadeUp 0.35s ease;
    }
    .corre-ay {
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      font-size: 1.9rem;
      color: #c96b6b;
      text-shadow: 0 2px 16px rgba(0,0,0,0.7);
      text-align: center;
      animation: fadeUp 0.35s ease;
    }

    /* Shield row */
    .corre-shield-active { color: #6b8fd4; font-size: 0.82rem; font-weight: 600; }
    .corre-shield-used { color: rgba(232,234,240,0.22); font-size: 0.82rem; text-decoration: line-through; }

    /* Corre badge */
    .badge-corre {
      display: inline-flex;
      align-items: center;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 6px;
      background: rgba(201,107,107,0.1);
      color: #c96b6b;
      border: 1px solid rgba(201,107,107,0.18);
      margin-left: 6px;
    }

    @keyframes bullGallop {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(-1deg); }
      75% { transform: translateY(-3px) rotate(1deg); }
    }
    @keyframes bullDangerGallop {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-7px) rotate(-2deg); }
      75% { transform: translateY(-4px) rotate(2deg); }
    }
    @keyframes matadorRun {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes matadorDanger {
      0% { transform: translateY(0) rotate(-3deg); }
      25% { transform: translateY(-5px) rotate(3deg); }
      50% { transform: translateY(-1px) rotate(-5deg); }
      75% { transform: translateY(-4px) rotate(4deg); }
      100% { transform: translateY(0) rotate(-3deg); }
    }
    @keyframes matadorJump {
      0%   { transform: translateY(0) rotate(0deg); }
      30%  { transform: translateY(-20px) rotate(-10deg); }
      65%  { transform: translateY(-14px) rotate(6deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    @keyframes matadorFlip {
      0%   { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(0) rotate(360deg); }
    }
    @keyframes matadorCelebrate {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-11px) rotate(-22deg); }
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

    /* ── App footer (all screens) ── */
    .app-footer {
      width: 100%;
      max-width: 640px;
      padding: 16px 24px;
      text-align: center;
      font-size: 0.72rem;
      color: rgba(232,234,240,0.2);
      border-top: 1px solid rgba(255,255,255,0.05);
      margin: 12px auto 0;
    }
    .footer-link {
      color: rgba(232,234,240,0.2);
      text-decoration: none;
    }
    .footer-link:hover { color: rgba(232,234,240,0.4); }
    .footer-link-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-size: inherit;
      color: rgba(232,234,240,0.2);
      font-family: inherit;
    }
    .footer-link-btn:hover { color: rgba(232,234,240,0.4); }
    .footer-kofi-btn {
      display: inline-block;
      background: rgba(201,168,76,0.12);
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 8px;
      padding: 6px 14px;
      color: #c9a84c;
      font-size: 0.8rem;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .footer-kofi-btn:hover { background: rgba(201,168,76,0.2); border-color: rgba(201,168,76,0.5); }

    /* ── Share nudge ── */
    .share-nudge {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .share-nudge p {
      font-size: 0.78rem;
      color: rgba(232,234,240,0.3);
      margin-bottom: 10px;
    }
    .btn-copy-link {
      background: none;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: rgba(232,234,240,0.35);
      font-size: 0.78rem;
      padding: 6px 16px;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-copy-link:hover { border-color: rgba(255,255,255,0.25); color: rgba(232,234,240,0.55); }

    /* ── Keyboard tip ── */
    .kbd-tip {
      text-align: center;
      font-size: 0.7rem;
      color: rgba(232,234,240,0.2);
      margin-top: 8px;
    }
    @media (hover: none) and (pointer: coarse) { .kbd-tip { display: none; } }

    /* ── What's new badge ── */
    .whats-new {
      font-size: 0.75rem;
      color: rgba(232,234,240,0.3);
      text-align: center;
      margin-bottom: 12px;
    }
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
            <button className="logo-btn l-nav-logo" onClick={() => setScreen("landing")}>
              <ClipboardIcon size={32} />
              <span className="l-nav-brand"><LogoBrand /></span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <button className="help-link" onClick={() => setShowHelp(true)}>How it works</button>
              <button className="help-link" onClick={() => setShowAbout(true)}>About</button>
              <a
                href="https://ko-fi.com/cpvocab"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-kofi-btn"
              >
                🍺 Buy us a cerveza
              </a>
              <span className="l-nav-sub">Spanish Vocab Trainer</span>
            </div>
          </nav>

          {/* Hero */}
          <main className="l-hero">
            <span className="eyebrow">🇪🇸 Built for learners</span>

            <h1 className="hero-h1">Master your Spanish vocab</h1>
            <p className="hero-sub">one word at a time.</p>

            <p className="hero-desc">
              CPVocab makes building your Spanish vocabulary effortless — just copy
              and paste your word lists straight in. Our two-phase method makes sure
              you actually remember every word: first identify the correct
              translation, then spell it from memory. Six official CEFR levels from
              A1 to C2 are built in, or paste in your own lists in seconds.
              Everything stays in your browser — no account, no fuss.
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

            {/* Demo video */}
            <div className="demo-section">
              <p className="demo-label">See how it works</p>
              <div className="demo-video-wrap">
                <iframe
                  src="https://www.loom.com/embed/847d4cfdadf648ccb9f8c2d26d800b87"
                  allowFullScreen
                  title="CPVocab demo"
                />
              </div>
            </div>
          </main>

          {/* What's new */}
          <p className="whats-new">🆕 Latest update: ¡Corre! bull chase game mode — May 2026</p>

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

          <AppFooter onAbout={() => setShowAbout(true)} />
        </div>
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
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
            <button className="logo-btn logo-row" onClick={() => setScreen("landing")}>
              <ClipboardIcon size={40} />
              <span className="logo-name"><LogoBrand /></span>
            </button>
            <p className="tagline" style={{ marginBottom: 24 }}>Spanish Vocab Trainer</p>

            {/* ── DEFAULT LISTS ── */}
            <div className="section-label">Default Lists</div>
            {lists
              .map((list, i) => ({ list, i }))
              .filter(({ list }) => list.isDefault)
              .map(({ list, i }) => {
                const mastered = list.words.filter(
                  (w) => (wordStats[w.es]?.seen || 0) >= 4 && (wordStats[w.es]?.wrong || 0) === 0
                ).length;
                const best = highScores[list.name];
                const cs = correScores[list.name];
                const hasWrong = list.words.some((w) => (wordStats[w.es]?.wrong || 0) > 0);
                return (
                  <div className="list-card" key={i}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                        <span className="list-name">{list.name}</span>
                        {best != null && <span className="badge-gold">🏆 {best}%</span>}
                        {cs && (
                          <span className="badge-corre">
                            {cs.completed ? `🐂 ✓` : `🐂 ${cs.bestWordsSurvived}/${list.words.length}`}
                          </span>
                        )}
                      </div>
                      <div className="list-meta">{list.words.length} words · {mastered} mastered</div>
                    </div>
                    <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                      <button className="btn btn-primary" onClick={() => selectMode(list)}>Play ▶</button>
                      {hasWrong && (
                        <button className="btn btn-danger" onClick={() => startGame(list, true)}>Review ⚡</button>
                      )}
                    </div>
                  </div>
                );
              })
            }

            {/* ── MY LISTS ── */}
            <div className="section-label" style={{ marginTop: 22 }}>My Lists</div>
            {lists.filter((l) => !l.isDefault).length === 0 ? (
              <p style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.22)", fontStyle: "italic", padding: "10px 0 6px" }}>
                No lists yet — add one below
              </p>
            ) : (
              lists
                .map((list, i) => ({ list, i }))
                .filter(({ list }) => !list.isDefault)
                .map(({ list, i }) => {
                  const mastered = list.words.filter(
                    (w) => (wordStats[w.es]?.seen || 0) >= 4 && (wordStats[w.es]?.wrong || 0) === 0
                  ).length;
                  const best = highScores[list.name];
                  const cs = correScores[list.name];
                  const hasWrong = list.words.some((w) => (wordStats[w.es]?.wrong || 0) > 0);
                  const isEditing = editingListIdx === i;
                  return (
                    <div className="list-card" key={i}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        {isEditing ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <input
                              className="list-name-input"
                              value={editingListName}
                              onChange={(e) => setEditingListName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleRenameList(i, editingListName);
                                if (e.key === "Escape") setEditingListIdx(null);
                              }}
                              autoFocus
                            />
                            <button className="list-action-btn" onClick={() => handleRenameList(i, editingListName)}>✓</button>
                          </div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                            <span className="list-name">{list.name}</span>
                            {best != null && <span className="badge-gold">🏆 {best}%</span>}
                            {cs && (
                              <span className="badge-corre">
                                {cs.completed ? `🐂 ✓` : `🐂 ${cs.bestWordsSurvived}/${list.words.length}`}
                              </span>
                            )}
                            <button
                              className="list-edit-btn"
                              title="Rename list"
                              onClick={() => { setEditingListIdx(i); setEditingListName(list.name); }}
                            >✏</button>
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="list-meta">{list.words.length} words · {mastered} mastered</span>
                          {!isEditing && (
                            <button className="list-action-btn" onClick={() => setAddWordsListIdx(i)}>
                              + Add/remove words
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 7, flexShrink: 0, alignItems: "center" }}>
                        <button className="btn btn-primary" onClick={() => selectMode(list)}>Play ▶</button>
                        {hasWrong && (
                          <button className="btn btn-danger" onClick={() => startGame(list, true)}>Review ⚡</button>
                        )}
                        <button
                          className="list-delete-btn"
                          title="Delete list"
                          onClick={() => setDeleteConfirmIdx(i)}
                        >🗑</button>
                      </div>
                    </div>
                  );
                })
            )}

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
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
        {addWordsListIdx !== null && (
          <AddWordsModal
            list={lists[addWordsListIdx]}
            onAdd={(newWords) => handleAddWords(addWordsListIdx, newWords)}
            onDeleteWord={(wordIdx) => handleDeleteWord(addWordsListIdx, wordIdx)}
            onClose={() => setAddWordsListIdx(null)}
          />
        )}
        {deleteConfirmIdx !== null && (
          <DeleteConfirmModal
            listName={lists[deleteConfirmIdx].name}
            onConfirm={() => handleDeleteList(deleteConfirmIdx)}
            onClose={() => setDeleteConfirmIdx(null)}
          />
        )}
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
            <button className="logo-btn logo-row" style={{ marginBottom: 20 }} onClick={() => setScreen("landing")}>
              <ClipboardIcon size={32} />
              <span className="logo-name" style={{ fontSize: "1.5rem" }}><LogoBrand /></span>
            </button>
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

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
              <button className="help-link" onClick={() => setShowHelp(true)}>? How to format your list</button>
            </div>
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
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
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
            {/* Logo */}
            <button className="logo-btn" style={{ marginBottom: 14, opacity: 0.5 }} onClick={() => setScreen("landing")}>
              <ClipboardIcon size={20} />
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem" }}><LogoBrand /></span>
            </button>

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
              <>
                <div className="mc-grid">
                  {options.map((opt, i) => {
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
                        {i + 1}. {opt}
                      </button>
                    );
                  })}
                </div>
                <p className="kbd-tip">Tip: press 1–4 to select</p>
              </>
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
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
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
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <button className="logo-btn" onClick={() => setScreen("landing")}>
                <ClipboardIcon size={28} />
                <span className="logo-name" style={{ fontSize: "1.5rem" }}><LogoBrand /></span>
              </button>
            </div>
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

            <div className="share-nudge" style={{ marginTop: 20 }}>
              <p>Enjoying CPVocab? Share it with a fellow learner 🇪🇸</p>
              <button className="btn-copy-link" onClick={handleCopyLink}>
                {linkCopied ? "Copied! ✓" : "Copy link"}
              </button>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: "0.76rem", color: "rgba(232,234,240,0.25)", marginBottom: 8 }}>Enjoying CPVocab? Buy us a cerveza 🍺</p>
                <a
                  href="https://ko-fi.com/cpvocab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-copy-link"
                  style={{ color: "rgba(201,168,76,0.6)", borderColor: "rgba(201,168,76,0.25)", textDecoration: "none", display: "inline-block" }}
                >
                  🍺 Buy us a cerveza
                </a>
              </div>
            </div>
          </div>
        </div>
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </>
    );
  }

  // ── MODE SELECT ──────────────────────────────────────────────────────────
  if (screen === "modeSelect") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <div className="card fade-up" style={{ maxWidth: 520 }}>
            <button className="logo-btn logo-row" style={{ marginBottom: 18 }} onClick={() => setScreen("landing")}>
              <ClipboardIcon size={32} />
              <span className="logo-name" style={{ fontSize: "1.5rem" }}><LogoBrand /></span>
            </button>
            <div className="card-title" style={{ marginBottom: 4 }}>Choose Mode</div>
            <p style={{ fontSize: "0.83rem", color: "rgba(232,234,240,0.35)", marginBottom: 20 }}>
              Playing: <strong style={{ color: "#a8c0e8" }}>{activeList?.name}</strong>
            </p>

            <button className="mode-card" onClick={() => startGame(activeList)}>
              <span className="mode-icon">📚</span>
              <div>
                <div className="mode-title">Standard Mode</div>
                <div className="mode-desc">Multiple choice then spell — the original two-phase method</div>
              </div>
            </button>

            <button className="mode-card mode-card-corre" onClick={() => startCorre(activeList)}>
              <span className="mode-icon">🐂</span>
              <div>
                <div className="mode-title" style={{ color: "#c96b6b" }}>¡Corre!</div>
                <div className="mode-desc">5 seconds. One chance. ¡Rápido!</div>
              </div>
            </button>

            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setScreen("home")}>
              ← Back
            </button>
          </div>
        </div>
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </>
    );
  }

  // ── CORRE GAME ───────────────────────────────────────────────────────────
  if (screen === "corre") {
    const corWord = correQueue[correIdx];
    if (!corWord) return null;

    const bullPos = bullPosOverride !== null ? bullPosOverride : ((5 - timeRemaining) / 5 * 75 + 8);
    const dangerZone = bullPos > 62;
    const bullAnimClass = correPhase === "win" ? "retreating" : dangerZone ? "danger" : "";
    const matadorAnimClass = matadorAnim !== "run" ? matadorAnim : (dangerZone ? "danger" : "");

    const timerPct = Math.min(100, (timeRemaining / 5) * 100);
    const timerColor = timeRemaining > 3 ? "#6bcba0" : timeRemaining > 1.5 ? "#c9a84c" : "#c96b6b";

    const crowdColors = ["#c9a84c","#6b8fd4","#6bcba0","#c96b6b","#a8c0e8","#e8d5a0","#9ab4d8","#d4a8c0"];

    return (
      <>
        <style>{css}</style>
        <Confetti active={showConfetti} />
        <div className="app" style={{ padding: "20px 20px" }}>
          <div className="card fade-up" style={{ maxWidth: 640, width: "100%" }}>
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <button className="logo-btn" style={{ opacity: 0.5 }} onClick={() => setScreen("landing")}>
                <ClipboardIcon size={20} />
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "0.95rem" }}><LogoBrand /></span>
              </button>
              <button className="btn btn-exit" onClick={() => setScreen("home")}>✕ Exit</button>
            </div>

            {/* Status row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span className={shieldActive ? "corre-shield-active" : "corre-shield-used"}>
                {shieldActive ? "🛡 Shield ready" : "🛡 Shield used"}
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.38)", letterSpacing: "0.04em" }}>
                {correIdx + 1} / {correQueue.length}
              </span>
              <span style={{ fontSize: "0.82rem", color: "#6bcba0", fontWeight: 600 }}>✓ {correScore}</span>
            </div>

            {/* Timer bar */}
            <div className="corre-timer-bar-wrap">
              <div className="corre-timer-bar-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
            </div>

            {/* Arena */}
            <div className="corre-arena">
              {/* Sky */}
              <div className="corre-sky">
                <div className="corre-sun" />
              </div>

              {/* Stands */}
              <div className="corre-stands">
                <div className="corre-crowd-row">
                  {Array.from({ length: 44 }).map((_, i) => (
                    <div
                      key={i}
                      className="corre-crowd-head"
                      style={{ background: crowdColors[i % crowdColors.length], opacity: 0.5 + (i % 3) * 0.17 }}
                    />
                  ))}
                </div>
              </div>

              {/* Barrier */}
              <div className="corre-barrier" />

              {/* Floor */}
              <div className="corre-floor">
                {[10,20,30,40,50,60,70,80,90].map((x) => (
                  <div key={x} className="corre-floor-line" style={{ left: `${x}%` }} />
                ))}
                {[35,68].map((y) => (
                  <div key={y} className="corre-floor-hline" style={{ top: `${y}%` }} />
                ))}

                {/* Bull */}
                <div
                  className={`corre-bull-wrap${bullAnimClass ? ` ${bullAnimClass}` : ""}`}
                  style={{ left: `${bullPos}%` }}
                >
                  <div style={{ transform: "scaleX(-1)" }}>
                    <CorreBullSVG danger={dangerZone || correPhase === "lose"} />
                  </div>
                  <div className="corre-shadow" />
                </div>

                {/* Matador */}
                <div className="corre-matador-wrap">
                  <div className={`corre-matador-inner${matadorAnimClass ? ` ${matadorAnimClass}` : ""}`}>
                    <CorreMatadorSVG danger={dangerZone || correPhase === "lose"} />
                  </div>
                  <div className="corre-shadow-mat" />
                </div>

                {/* Phase overlays */}
                {correPhase === "win" && (
                  <div className="corre-overlay"><span className="corre-ole">¡Olé!</span></div>
                )}
                {correPhase === "lose" && (
                  <div className="corre-overlay"><span className="corre-ay">¡Ay caramba!</span></div>
                )}
              </div>
            </div>

            {/* Word */}
            <div className="word-display" style={{ margin: "14px 0 18px" }}>
              <div className="word-en">{corWord.en}</div>
              <div className="word-hint">Choose the Spanish translation</div>
            </div>

            {/* MC grid */}
            <div className="mc-grid">
              {correOptions.map((opt, i) => {
                let cls = "mc-btn";
                if (correPicked) {
                  if (opt === corWord.es) cls += " mc-correct";
                  else if (opt === correPicked && correPicked !== "__timeout__") cls += " mc-wrong";
                }
                return (
                  <button
                    key={opt}
                    className={cls}
                    disabled={!!correPicked || correPhase !== "playing"}
                    onClick={() => handleCorreAnswer(opt)}
                  >
                    {i + 1}. {opt}
                  </button>
                );
              })}
            </div>
            <p className="kbd-tip">Tip: press 1–4 to select</p>
          </div>
        </div>
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </>
    );
  }

  // ── CORRE RESULTS ────────────────────────────────────────────────────────
  if (screen === "correResults") {
    const won = correPhase === "win";
    const cs = correScores[activeList?.name];
    return (
      <>
        <style>{css}</style>
        <Confetti active={won} />
        <div className="app">
          <div className="card fade-up">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <button className="logo-btn" onClick={() => setScreen("landing")}>
                <ClipboardIcon size={28} />
                <span className="logo-name" style={{ fontSize: "1.5rem" }}><LogoBrand /></span>
              </button>
            </div>

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                color: won ? "#c9a84c" : "#c96b6b",
                lineHeight: 1.1,
                marginBottom: 8,
              }}>
                {won ? "¡Olé! 🎺" : "¡El toro ganó! 🐂"}
              </div>
              <div style={{ fontSize: "0.95rem", color: "rgba(232,234,240,0.45)" }}>
                {won ? "You survived all the words! The matador lives." : "The bull caught the matador..."}
              </div>
            </div>

            {correNewBest && (
              <p className="new-best" style={{ color: "#c96b6b" }}>🐂 New Corre! best!</p>
            )}

            {/* Stats */}
            <div className="stats-row" style={{ marginBottom: 0 }}>
              <div className="stat-chip">
                <div className="stat-val col-correct">{correScore}</div>
                <div className="stat-lbl">Correct</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val" style={{
                  color: shieldActive ? "#6b8fd4" : "rgba(232,234,240,0.22)",
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.5rem", lineHeight: 1, marginBottom: 3
                }}>
                  🛡
                </div>
                <div className="stat-lbl">{shieldActive ? "Shield intact" : "Shield used"}</div>
              </div>
              <div className="stat-chip">
                <div className="stat-val col-gold">{correQueue.length}</div>
                <div className="stat-lbl">Total words</div>
              </div>
            </div>

            {/* Best score */}
            {cs && (
              <p style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(232,234,240,0.3)", marginTop: 10 }}>
                {cs.completed
                  ? `Best: Completed ✓`
                  : `Best: Survived ${cs.bestWordsSurvived}/${correQueue.length} words`}
              </p>
            )}

            {/* Wrong words */}
            {correWrongWords.length > 0 && (
              <>
                <hr className="divider" />
                <p style={{ fontSize: "0.78rem", color: "#c96b6b", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ⚡ Got wrong ({correWrongWords.length})
                </p>
                <div style={{ maxHeight: 140, overflowY: "auto" }}>
                  {correWrongWords.map((w, i) => (
                    <div className="word-row" key={i}>
                      <span style={{ color: "rgba(232,234,240,0.5)" }}>{w.en}</span>
                      <span style={{ color: "#6b8fd4", fontWeight: 600 }}>{w.es}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <hr className="divider" />

            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => startCorre(activeList)}>
                ¡Corre! again
              </button>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => startGame(activeList)}>
                Standard Mode
              </button>
            </div>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 9 }} onClick={() => setScreen("home")}>
              ← Back to Lists
            </button>

            <div className="share-nudge" style={{ marginTop: 20 }}>
              <p>Enjoying CPVocab? Share it with a fellow learner 🇪🇸</p>
              <button className="btn-copy-link" onClick={handleCopyLink}>
                {linkCopied ? "Copied! ✓" : "Copy link"}
              </button>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: "0.76rem", color: "rgba(232,234,240,0.25)", marginBottom: 8 }}>Enjoying CPVocab? Buy us a cerveza 🍺</p>
                <a
                  href="https://ko-fi.com/cpvocab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-copy-link"
                  style={{ color: "rgba(201,168,76,0.6)", borderColor: "rgba(201,168,76,0.25)", textDecoration: "none", display: "inline-block" }}
                >
                  🍺 Buy us a cerveza
                </a>
              </div>
            </div>
          </div>
        </div>
        <AppFooter onAbout={() => setShowAbout(true)} />
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </>
    );
  }

  return null;
}
