const ABUSE_SUBSTRINGS = [
  "gago", "gaga", "gagu", "bobo", "boba", "tanga", "ulol", "tarantado", "tarandado",
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

// Topics that ARE part of Edsel's public portfolio. Anything matching these is
// considered on-topic and is allowed to reach the AI (which then answers from
// the knowledge base only).
const PORTFOLIO_TERMS = [
  "edsel", "suralta", "payan", "epky", "portfolio", "project", "experience",
  "skills", "skill", "certifications", "certification", "certificate", "cert",
  "intern", "internship", "ojt", "training", "education", "degree",
  "graduate", "graduated", "graduating", "university", "mindanao", "digos",
  "davao", "resume", "github", "contact", "hire", "hiring", "job", "work",
  "employ", "apply", "application", "react", "laravel", "php", "python",
  "fastapi", "mysql", "postgres", "postgresql", "docker", "bootstrap",
  "javascript", "tailwind", "frontend", "backend", "database", "tech",
  "stack", "technologies", "technology", "web", "system", "systems",
  "big 8", "hotel", "tesda", "dict", "freecodecamp", "study", "school",
  "background", "academics", "availability", "rentmate", "pabnor", "pabnors",
  "g.a. ruiz", "ga-ruiz", "salin", "kaalaman", "wadhwani", "umasenso",
  "mapua", "bootcamp", "workshop", "cybersecurity", "penetration", "hacking",
  "chatbot", "email",
];

// Phrases where the visitor is talking to the assistant itself. Let the AI
// handle these (it can introduce itself / offer help) instead of a canned reply.
const BOT_SELF_PHRASES = [
  /who are you/i, /what('s| is) your name/i, /your name/i, /your name is/i,
  /what do you do/i, /what can you do/i, /what are you/i, /sino ka/i, /pangalan/i,
  /are you agnes/i, /kaya mo ba/i, /unsa ka/i, /tell me about yourself/i,
  /about yourself/i, /about you/i, /can you help/i, /can u help/i, /pa help/i,
  /how are you/i, /kumusta ka/i, /kamusta ka/i,
];

const GRATITUDE_TERMS = [
  "salamat", "thank you", "thanks", "thankyou", "thank u", "thx", "thnx",
  "tnx", "salamat kaayo", "maraming salamat", "daghang salamat", "gracias",
  "merci", "appreciate",
];

const GREETING_TERMS = [
  "hi", "hello", "hallo", "hey", "kamusta", "kumusta", "musta",
  "good morning", "good afternoon", "good evening", "good day", "greetings",
];

const FAREWELL_TERMS = [
  "bye", "goodbye", "good bye", "paalam", "good night", "goodnight",
  "sleep well",
];

// Greeting / farewell / affirmation / phatic filler words. After stripping these
// out, if nothing meaningful is left, the message is just small talk.
const SOCIAL_TOKENS = [
  "good morning", "good afternoon", "good evening", "good day", "good night",
  "goodnight", "goodbye", "good bye", "salamat kaayo", "maraming salamat",
  "daghang salamat", "salamat", "hello", "hallo", "kamusta", "kumusta",
  "musta", "greetings", "there", "hi", "hey", "thanks", "thank you",
  "thankyou", "thank u", "thx", "thnx", "tnx", "bye", "paalam", "sige",
  "ge", "okay", "ok lang", "okay lang", "ok", "opo", "oo", "yes", "yeah",
  "yep", "yup", "sure", "continue", "go on", "more", "next", "ulit", "tuloy",
  "naa pa", "pwede pa", "po", "ka", "ko", "na", "nga", "din", "rin",
  "naman", "lang", "ba", "pala", "daw", "gud", "man", "ke", "ta", "nya",
  "nimo", "imo", "sa", "ng", "ay", "to", "a", "an", "the", "you", "your",
  "u", "ur", "i", "im", "ako", "akong", "kasi", "kay", "para", "yung",
  "yang", "mong", "kong", "namo", "tulong", "please", "pls", "welcome",
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

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripTokens(text, tokens) {
  let t = ` ${text} `;
  const sorted = tokens.slice().sort((a, b) => b.length - a.length);
  for (const token of sorted) {
    t = t.replace(new RegExp(`\\b${escapeRegExp(token)}\\b`, "gi"), " ");
  }
  return t.trim();
}

// Decides whether a message is related to the portfolio at all. Returns:
//   null                -> on-topic (portfolio, self, greetings) -> let the AI answer
//   { category: "offtopic" }   -> unrelated question -> canned "not in my data" reply
//   { category: "gratitude" }  -> "salamat" / "thank you" -> canned "you're welcome"
//   { category: "greeting" }   -> pure greeting -> canned friendly greeting
//   { category: "farewell" }   -> pure goodbye -> canned farewell
//   { category: "casual" }     -> short affirmation / small talk -> canned casual reply
function detectOffTopic(text) {
  if (!text || typeof text !== "string") return null;
  const t = text.toLowerCase();

  if (hasAny(PORTFOLIO_TERMS, t)) return null;
  if (hasAny(BOT_SELF_PHRASES, t)) return null;
  if (hasAny(GRATITUDE_TERMS, t)) return { category: "gratitude" };

  const stripped = stripTokens(t, SOCIAL_TOKENS).replace(/[^a-z0-9\u00f1]/g, "");
  if (stripped.length <= 3) {
    if (hasAny(FAREWELL_TERMS, t)) return { category: "farewell" };
    if (hasAny(GREETING_TERMS, t)) return { category: "greeting" };
    return { category: "casual" };
  }

  return { category: "offtopic" };
}

const TAGLISH_MARKERS = /\b(ang|ng|mga|mo|ko|ka|kang|kita|naman|kasi|daw|kay|yang|mong|kong|ikaw|ako|akong|bakit|pwede|gusto|sana|lang|yan|ito|po|hindi|wala|meron|para|kayo|natin|atin|salamat|opo|sige|kamusta|kumusta|paalam)\b/gi;

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
  offtopic: {
    en: [
      "Sorry, that's not in my data — I can only answer questions about Edsel's portfolio. 😊 I'd be happy to help with his projects, skills, certifications, or experience!",
      "Sorry, that question is outside what I know! 😊 I'm Edsel's portfolio assistant, so I can only help with his projects, skills, certifications, or experience. What would you like to know?",
      "Hmm, that's not in my data, sorry! 😊 I can only answer questions about Edsel's portfolio — his projects, skills, certifications, and experience. Want to hear about them?",
    ],
    taglish: [
      "Sorry, wala sa data ko ang tanong na 'yan! 😊 Portfolio assistant lang ako ni Edsel — projects, skills, certifications, o experience niya lang ang kaya kong sagutin. Anong gusto mong malaman?",
      "Pasensya, hindi 'yan kasama sa alam ko! 😊 Portfolio lang ni Edsel ang kaya kong sagutin — projects, skills, certifications, o experience niya. May itatanong ka ba tungkol sa kanya?",
      "Sorry, hindi ko alam ang sagot diyan! 😊 Ang alam ko lang ay tungkol sa portfolio ni Edsel — projects, skills, certifications, at experience niya. Anong pwede kong itulong?",
    ],
  },
  gratitude: {
    en: [
      "You're welcome! 😊 I'm glad I could help. Anything else you'd like to know about Edsel — his projects, skills, or certifications?",
      "You're very welcome! 😊 Don't hesitate to ask if you have more questions about Edsel's portfolio.",
      "Anytime! 😊 Happy to help. Feel free to ask about Edsel's projects, certifications, or skills anytime.",
    ],
    taglish: [
      "Walang anuman! 😊 Masaya akong nakatulong. May iba ka pa bang gustong malaman tungkol kay Edsel — projects, skills, o certifications niya?",
      "Walang anuman! 😊 Huwag kang mahiyang magtanong kung may gusto ka pang malaman tungkol sa portfolio ni Edsel.",
      "Sige lang, anytime! 😊 Tumutulong ako nang may galak. Pwede mo akong tanungin anytime tungkol sa projects o certifications ni Edsel.",
    ],
  },
  greeting: {
    en: [
      "Hello! 👋 I'm Edsel's portfolio assistant. Ask me about his projects, skills, certifications, or experience!",
      "Hi there! 😊 How can I help you today? I can tell you about Edsel's projects, skills, certifications, or background.",
    ],
    taglish: [
      "Hello! 👋 Ako si Edsel's portfolio assistant. Itanong mo lang ang tungkol sa projects, skills, certifications, o experience niya!",
      "Hi! 😊 May matutulong ba ako sa'yo? Pwede kong ipakilala ang mga projects ni Edsel, skills, o certifications niya.",
    ],
  },
  farewell: {
    en: [
      "Goodbye! 😊 Thanks for visiting Edsel's portfolio. Come back anytime if you have more questions!",
      "Take care! 😊 It was nice talking to you. Feel free to come back if you want to know more about Edsel's work.",
    ],
    taglish: [
      "Paalam! 😊 Salamat sa pagbisita sa portfolio ni Edsel. Balik-balik lang kung may tanong ka!",
      "Ingat! 😊 Masaya akong nakausap ka. Balik ka lang kung may gusto ka pang malaman tungkol sa mga gawa ni Edsel.",
    ],
  },
  casual: {
    en: [
      "Got it! 😊 So, what would you like to know about Edsel's portfolio — projects, skills, certifications, or experience?",
      "Sure! 😊 What can I help you with? I know all about Edsel's projects, skills, and certifications.",
    ],
    taglish: [
      "Sige! 😊 Anong gusto mong malaman tungkol kay Edsel — projects, skills, certifications, o experience niya?",
      "Okay lang 'yan! 😊 Anong matutulong ko? Alam ko ang mga projects, skills, at certifications ni Edsel.",
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

export { detectAbuse, detectLanguage, detectOffTopic, friendlyReply };
