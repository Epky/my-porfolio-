const { spawn } = require("child_process");

const child = spawn("vercel", ["dev"], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (err) => {
  console.error("Failed to start `vercel dev`: " + err.message);
  console.error("Make sure the Vercel CLI is installed (npm i -g vercel).");
  process.exit(1);
});

child.on("exit", (code) => process.exit(code ?? 0));
