// Offline knowledge-base fallback.
// Used only when every AI model is unavailable (down / out of credits / not in
// the plan). It answers common portfolio questions straight from the KB JSON so
// the chatbot never goes completely silent.

function detectLanguage(text) {
  const markers =
    /\b(ang|ng|mga|mo|ko|ka|kang|kita|naman|kasi|daw|kay|yang|mong|kong|ikaw|ako|akong|bakit|pwede|gusto|sana|lang|yan|ito|po|hindi|wala|meron|para|kayo|natin|atin|salamat|opo|sige|kamusta|kumusta|paalam|ano|sino|saan|sa)\b/gi;
  const matches = text.match(markers) || [];
  return matches.length >= 1 ? "taglish" : "english";
}

const INTENTS = [
  {
    key: "identity",
    keywords: [
      "who are you",
      "what is your name",
      "what's your name",
      "your name",
      "sino ka",
      "pangalan",
      "ano ka",
      "ano kang",
      "introduce yourself",
      "tell me about yourself",
      "about yourself",
      "about you",
      "are you agnes",
    ],
  },
  {
    key: "projects",
    keywords: [
      "project",
      "projects",
      "built",
      "build",
      "created",
      "gawa mo",
      "ginawa mo",
      "website",
      "web app",
      "applications",
      "apps",
    ],
  },
  {
    key: "skills",
    keywords: [
      "skill",
      "skills",
      "tech stack",
      "stack",
      "technology",
      "technologies",
      "alam mo",
      "kaya mo",
      "programming language",
      "frontend",
      "backend",
      "database",
      "tools",
    ],
  },
  {
    key: "availability",
    keywords: ["available", "availability", "open to", "opportunity", "opportunities", "entry-level", "status"],
  },
  {
    key: "experience",
    keywords: [
      "experience",
      "karanasan",
      "job",
      "career",
      "ojt",
      "on-the-job",
      "on the job",
      "intern",
      "internship",
      "trabaho",
    ],
  },
  {
    key: "certifications",
    keywords: [
      "certification",
      "certifications",
      "certificate",
      "certificates",
      "certs",
      "tesda",
      "dict",
      "freecodecamp",
      "sertipikasyon",
      "sertipiko",
    ],
  },
  {
    key: "education",
    keywords: [
      "education",
      "school",
      "university",
      "degree",
      "graduate",
      "graduated",
      "study",
      "course",
      "kurso",
      "pag-aaral",
      "edukasyon",
      "college",
      "bachelor",
    ],
  },
  {
    key: "contact",
    keywords: [
      "contact",
      "email",
      "phone",
      "number",
      "reach",
      "message",
      "hire",
      "hiring",
      "apply",
      "makipag-ugnay",
      "contact form",
      "kausap",
      "makausap",
    ],
  },
  {
    key: "learning",
    keywords: [
      "workshop",
      "workshops",
      "bootcamp",
      "bootcamps",
      "seminar",
      "seminars",
      "ideation",
      "mapua",
      "umasenso",
      "wadhwani",
      "salin",
      "hack the system",
    ],
  },
  {
    key: "github",
    keywords: ["github", "resume", "cv", "links", "repositories", "repos", "code"],
  },
  {
    key: "location",
    keywords: [
      "where",
      "location",
      "based",
      "taga",
      "asa ka",
      "digos",
      "davao",
      "nakatira",
      "tirahan",
      "address",
    ],
  },
];

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchKeywords(text, keywords) {
  return keywords.some((k) =>
    new RegExp(`\\b${escapeRegExp(k)}\\b`, "i").test(text)
  );
}

function flattenSkillNames(kb) {
  const names = [];
  const skills = kb?.skills || {};
  for (const group of Object.values(skills)) {
    if (Array.isArray(group)) names.push(...group);
  }
  if (Array.isArray(kb?.about?.focusAreas)) names.push(...kb.about.focusAreas);
  return names;
}

function matchIntent(text, kb) {
  const t = text.toLowerCase();
  for (const intent of INTENTS) {
    if (matchKeywords(t, intent.keywords)) return intent.key;
  }
  const skillNames = flattenSkillNames(kb);
  if (skillNames.some((s) => t.includes(s.toLowerCase()))) return "skills";
  return null;
}

function listItems(items) {
  return items.map((i) => `- ${i}`).join("\n");
}

function formatProjects(kb, lang) {
  const projects = kb?.projects || [];
  if (!projects.length) return null;
  const intro =
    lang === "taglish"
      ? "Ito ang mga projects ni Edsel:"
      : "Here are Edsel's projects:";
  const body = projects
    .map((p) => {
      const tech = p.technologies?.length ? `\n  *Tech:* ${p.technologies.join(", ")}` : "";
      const features = p.features?.length ? `\n  *Features:* ${p.features.join("; ")}` : "";
      const gh = p.github ? `\n  [GitHub](${p.github})` : "";
      return `**${p.title}** — ${p.description}${tech}${features}${gh}`;
    })
    .join("\n\n");
  return `${intro}\n\n${body}`;
}

function formatSkills(kb, lang) {
  const s = kb?.skills || {};
  const groups = [
    ["Frontend", s.frontend],
    ["Backend", s.backend],
    ["Database", s.database],
    ["Tools & Platforms", s.toolsAndPlatforms],
    ["Other Domains", s.otherDomains],
  ].filter(([, v]) => v?.length);
  const intro =
    lang === "taglish"
      ? "Ito ang mga skills at tech stack ni Edsel:"
      : "Here is Edsel's tech stack and skills:";
  const body = groups
    .map(([name, vals]) => `**${name}:** ${vals.join(", ")}`)
    .join("\n");
  return `${intro}\n\n${body}`;
}

function formatExperience(kb, lang) {
  const work = kb?.workExperience || [];
  if (!work.length) return null;
  const intro =
    lang === "taglish"
      ? "Ito ang work experience ni Edsel:"
      : "Here is Edsel's work experience:";
  const body = work
    .map((w) => {
      const meta = [w.company, w.location, w.period].filter(Boolean).join(" · ");
      const resp = w.responsibilities?.length
        ? `\n\n*Responsibilities:*\n${listItems(w.responsibilities)}`
        : "";
      return `**${w.title}**\n${meta}${resp}`;
    })
    .join("\n\n");
  return `${intro}\n\n${body}`;
}

function formatCertifications(kb, lang) {
  const certs = kb?.certifications || [];
  if (!certs.length) return null;
  const intro =
    lang === "taglish"
      ? "Ito ang mga certifications ni Edsel:"
      : "Here are Edsel's certifications:";
  const body = certs
    .map((c) => `- **${c.title}** — ${c.issuer} (${c.date})`)
    .join("\n");
  return `${intro}\n\n${body}`;
}

function formatEducation(kb, lang) {
  const edu = kb?.about?.education || {};
  const identity = kb?.identity || {};
  if (!identity.degree && !edu.degree) return null;
  const degree = identity.degree || edu.degree;
  const school = identity.school || edu.school;
  const period = identity.educationPeriod || edu.period || "";
  const courses = edu.relevantCourses?.length
    ? `\n\n*Relevant courses:* ${edu.relevantCourses.join(", ")}`
    : "";
  const intro = lang === "taglish" ? "Ito ang edukasyon ni Edsel:" : "Here is Edsel's education:";
  return `${intro}\n\n**${degree}**\n${school} (${period})${courses}`;
}

function formatLearning(kb, lang) {
  const items = kb?.learningExperiences || [];
  if (!items.length) return null;
  const intro =
    lang === "taglish"
      ? "Ito ang mga learning experiences ni Edsel:"
      : "Here are Edsel's learning experiences:";
  const body = items
    .map(
      (l) =>
        `**${l.title}** — ${l.type}, ${l.organization} (${l.date})\n${l.description}`
    )
    .join("\n\n");
  return `${intro}\n\n${body}`;
}

function formatContact(kb, lang) {
  const policy = kb?.contactPolicy;
  const github = kb?.links?.github;
  const resume = kb?.links?.resume;
  const lines = [];
  if (policy) lines.push(policy);
  if (github) lines.push(`GitHub: ${github}`);
  if (resume) lines.push(`Resume: ${resume}`);
  if (lang === "taglish") lines.unshift("Para makipag-ugnayan kay Edsel:");
  else lines.unshift("To get in touch with Edsel:");
  return lines.join("\n");
}

function formatIdentity(kb, lang) {
  const id = kb?.identity || {};
  if (!id.name) return null;
  const parts = [id.name];
  if (id.role) parts.push(id.role);
  if (id.professionalSummary) parts.push(id.professionalSummary);
  if (id.location) parts.push(`Based in ${id.location}.`);
  if (id.availability) parts.push(id.availability);
  const intro =
    lang === "taglish"
      ? "Ako si **Edsel's Assistant** — ang portfolio assistant ni Edsel Suralta Payan.😊"
      : "I'm **Edsel's Assistant** — the portfolio assistant for Edsel Suralta Payan. 😊";
  return `${intro}\n\n${parts.join(" ")}`;
}

function formatLocation(kb, lang) {
  const id = kb?.identity || {};
  if (!id.location) return null;
  return lang === "taglish"
    ? `Taga-${id.location} si Edsel.`
    : `Edsel is based in ${id.location}.`;
}

function formatAvailability(kb, lang) {
  const id = kb?.identity || {};
  if (!id.availability) return null;
  const reach =
    lang === "taglish"
      ? "Pwede mo siyang ma-reach sa contact form sa ibaba ng page."
      : "You can reach him through the contact form at the bottom of the page.";
  return `${id.availability}. ${reach}`;
}

function formatGithub(kb, lang) {
  const github = kb?.links?.github;
  const resume = kb?.links?.resume;
  if (!github && !resume) return null;
  const lines = [];
  if (github) lines.push(`GitHub: ${github}`);
  if (resume) lines.push(`Resume: ${resume}`);
  const intro =
    lang === "taglish"
      ? "Ito ang mga public links ni Edsel:"
      : "Here are Edsel's public links:";
  return `${intro}\n${lines.join("\n")}`;
}

const FORMATTERS = {
  identity: formatIdentity,
  projects: formatProjects,
  skills: formatSkills,
  experience: formatExperience,
  certifications: formatCertifications,
  education: formatEducation,
  learning: formatLearning,
  contact: formatContact,
  github: formatGithub,
  location: formatLocation,
  availability: formatAvailability,
};

// Returns a markdown answer from the knowledge base, or null when the message
// does not match any portfolio topic.
export function answerFromKb(text, kb) {
  if (!text || !kb || typeof text !== "string") return null;
  const lang = detectLanguage(text);
  const intent = matchIntent(text, kb);
  if (!intent) return null;
  const formatter = FORMATTERS[intent];
  if (!formatter) return null;
  return formatter(kb, lang);
}
