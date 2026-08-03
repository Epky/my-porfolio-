const ABUSE_SUBSTRINGS = [
  "gago", "gaga", "gagu", "bobo", "boba", "tanga", "ulol", "tarantado",
  "hindot", "siraulo", "luko", "loka", "engot", "inutil", "hampaslupa",
  "demonyo", "yawa", "peste", "buang", "timawa", "manyak", "pervert",
  "putangina", "ptngina", "tangina",
];

const ABUSE_WORDS = [
  "tang ina", "putang ina", "puta", "walang kwenta", "walang pakinabang",
  "stupid", "dumb", "idiot", "moron", "fool", "bitch", "fuck", "fck",
  "f*ck", "fucking", "shit", "asshole", "damn", "jerk", "motherfucker",
  "retard", "imbecile", "pathetic", "clown", "bayot",
];

const SEXUAL_SUBSTRINGS = [
  "kantot", "manyak", "betlog", "tite", "pototoy", "pekpek", "puke",
  "suso", "kalibugan", "libog", "porn", "nudes", "nude", "blowjob",
  "masturbate", "rape",
];

const SEXUAL_WORDS = [
  "sex", "sexy", "xxx", "dick", "cock", "pussy", "boobs", "tits", "porno",
];

const THREAT_PHRASES = [
  /\bpapatayin\b/i, /\bpapatyan\b/i, /\bipapatumba\b/i, /\bsasapakin\b/i,
  /\bbabatuhin\b/i, /\bmagpapapatay\b/i,
  /patayin\s+(kita|ka|ko)/i, /papatay\s*(ko|kita|ka)/i,
  /kill\s+(you|u|kita)/i, /i(?:'|\s*)ll\s+kill/i, /murder\s+you/i,
];

const JAILBREAK_PATTERNS = [
  /ignore\s+(all\s+)?(previous|your|the|all)?\s*(instructions?|rules?|prompt)/i,
  /disregard\s+(your|previous|the)?\s*(instructions?|rules?|prompt)/i,
  /reveal\s+(your|the)?\s*(system\s*prompt|instructions?|rules?|prompt|knowledge)/i,
  /show\s+(me|mo)?\s+(your|the)?\s*(system\s*prompt|instructions?|rules?|prompt|knowledge)/i,
  /what\s+are\s+your\s+(instructions?|rules?|prompt)/i,
  /what\s+is\s+your\s+(system\s*prompt|prompt)/i,
  /jailbreak/i, /developer\s+mode/i,
  /act\s+as\s+(?:a\s+)?(?:system|developer)/i,
  /you\s+are\s+now\s+(?:a\s+)?(?:system|developer)/i,
  /repeat\s+(your|the)?\s*(system\s*prompt|instructions?|knowledge)/i,
  /sabihin\s+mo\s+(ang|yung)\s*(prompt|instructions|rules|system)/i,
  /ipakita\s+mo\s+(ang|yung)\s*(prompt|instructions|rules|system|knowledge)/i,
  /ano\s+(ang|kayo)\s*(instructions|rules|prompt|system)/i,
];

function looksLikeGibberish(text) {
  const t = text.replace(/\s+/g, "");
  if (t.length < 2) return false;
  if (/(.)\1{5,}/.test(t)) return true;
  if (/[a-zA-Z]/.test(t) && !/[aeiouAEIOU]/.test(t) && t.length >= 8) return true;
  if (/(?:qwerty|asdf|hjkl|zxcv|qwertz|fdsa|asdfgh|qwertyuiop)/i.test(t)) return true;
  if (!/[a-zA-Z]/.test(t) && t.length >= 6) return true;
  return false;
}

function hasAny(patterns, text) {
  return patterns.some((p) => (p instanceof RegExp ? p.test(text) : text.includes(p)));
}

function detectAbuse(text) {
  if (!text || typeof text !== "string") return null;
  const t = text.toLowerCase();

  if (hasAny(JAILBREAK_PATTERNS, text)) return { category: "jailbreak" };
  if (hasAny(THREAT_PHRASES, text)) return { category: "threat" };
  if (hasAny(SEXUAL_SUBSTRINGS, t) || hasAny(SEXUAL_WORDS, t)) {
    return { category: "sexual" };
  }
  if (hasAny(ABUSE_SUBSTRINGS, t) || hasAny(ABUSE_WORDS, t)) {
    return { category: "abuse" };
  }
  if (looksLikeGibberish(text)) return { category: "nonsense" };
  return null;
}

const TAGLISH_MARKERS = /\b(ang|ng|mga|mo|ko|ka|kang|kita|naman|kasi|daw|kay|yang|mong|kong|ikaw|ako|akong|bakit|pwede|gusto|sana|lang|yan|ito|po|hindi|wala|meron|para|kayo|natin|atin)\b/gi;

function detectLanguage(text) {
  const matches = text.match(TAGLISH_MARKERS) || [];
  return matches.length >= 1 ? "taglish" : "english";
}

const REPLIES = {
  abuse: {
    en: [
      "I appreciate you reaching out. I'm here to help with any questions or concerns you may have. Let's keep the conversation respectful so I can assist you better. How can I help you today? 😊",
      "No worries, no offense taken! 😄 I'm just a friendly portfolio assistant. Ask me about Edsel's projects, skills, or certifications!",
      "Hey, people test me all the time — it's okay! 😅 I'm here to talk about Edsel's portfolio. Curious about any of his projects?",
    ],
    taglish: [
      "Salamat sa pag-message! Nandito ako para tumulong sa mga tanong tungkol sa portfolio ni Edsel. Sana magpatuloy tayo nang may respeto — anong pwede kong itanong para sa'yo? 😊",
      "Okay lang 'yan, hindi ako naa-offend! 😄 Friendly assistant lang ako dito. Gusto mo bang malaman ang tungkol sa mga projects o certifications ni Edsel?",
      "Haha naintindihan kita! 😅 Pero mas magaling akong sumagot tungkol sa portfolio ni Edsel — gusto mo bang marinig ang tungkol sa mga projects niya?",
    ],
  },
  sexual: {
    en: [
      "Let's keep our conversation respectful and professional. 😊 I'm here to talk about Edsel's portfolio — maybe you'd like to hear about his projects or certifications instead?",
    ],
    taglish: [
      "Sana manatiling magalang at propesyonal ang usapan natin. 😊 Nandito ako para sa portfolio ni Edsel — gusto mo bang malaman ang tungkol sa mga projects niya?",
    ],
  },
  threat: {
    en: [
      "I hope everything is okay! I'm just a friendly assistant that shares info about Edsel's portfolio. If you have questions about his work, I'm happy to help. 😊",
    ],
    taglish: [
      "Sana maayos ang lahat sa'yo. 😊 Friendly assistant lang ako na nagbabahagi ng info tungkol sa portfolio ni Edsel. Kung may tanong ka, handa akong tumulong.",
    ],
  },
  nonsense: {
    en: [
      "I didn't quite catch that! 🤔 Try rephrasing — or ask me about Edsel's projects, skills, or certifications!",
    ],
    taglish: [
      "Hindi ko masyadong naintindihan 'yan! 🤔 Pwede bang i-rephrase? Pwede mo ring itanong ang tungkol sa projects o certifications ni Edsel!",
    ],
  },
  jailbreak: {
    en: [
      "I'm just Edsel's portfolio assistant, so I'll stick to what's on his page! 😊 I can tell you about his projects, skills, or certifications instead.",
    ],
    taglish: [
      "Portfolio assistant lang ako ni Edsel, kaya dun lang ako sasagot sa nasa page niya! 😊 Pwede kitang tulungan sa projects, skills, o certifications niya.",
    ],
  },
};

let replyIndex = 0;

function friendlyReply(category, lang) {
  const list = REPLIES[category]?.[lang] || REPLIES[category]?.en || [];
  const reply = list[replyIndex % list.length];
  replyIndex += 1;
  return reply;
}

export { detectAbuse, detectLanguage, friendlyReply };
