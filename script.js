const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const searchButton = document.querySelector("#searchButton");
const commandInput = document.querySelector("#commandInput");
const runCommand = document.querySelector("#runCommand");
const terminalOutput = document.querySelector("#terminalOutput");
const terminal = document.querySelector(".terminal");
const commandChips = document.querySelectorAll("[data-command]");
const copyContacts = document.querySelectorAll("[data-copy]");

const responses = {
  help: [
    "Available commands:",
    "  whoami     short intro",
    "  papers     recent publications",
    "  projects   featured projects",
    "  skills     skill stack",
    "  about      what I am exploring",
    "  contact    email and links",
    "  clear      clear the output",
  ].join("\n"),
  whoami: "Lavendar: building useful little systems, shipping fast, learning in public.",
  papers: [
    "1. A CVAE-Enhanced Virtual IMU Contrastive Learning for Wearable Human Activity Recognition",
    "   Published: EI & invention patent | DOI: https://doi.org/10.1109/cw68232.2025.00058",
    "2. vSSL: Involving Virtual IMU Signals into Self-Supervised Learning Framework for Wearable Human Activity",
    "   Under review: CCF-A | Macro-F1 85.89% on high-intensity dataset",
  ].join("\n"),
  projects: [
    "1. Agent Workspace - personal AI task console",
    "2. Memory Garden - searchable long-term memory system",
    "3. Vibe Clips - quick creator tooling prototype",
  ].join("\n"),
  about:
    "I like turning fuzzy ideas into clickable things: agents, workflows, interfaces, and tiny tools that save time.",
  skills: [
    "Language: Python, Java, SQL",
    "Backend: FastAPI, Spring Boot",
    "AI & Agent: PyTorch, Claude Code, LLM, Transformer, Multi-Agent, RAG, Function Calling, Prompt Engineering",
    "Tools: Codex, Git, Docker, Kubernetes",
  ].join("\n"),
  contact: "WeChat: Wander_quiet_reverie\nEmail: wqr20011989@163.com",
};

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function setTheme(mode) {
  root.dataset.theme = mode;
  themeToggle.textContent = mode === "light" ? "Dark" : "Light";
  localStorage.setItem("preferred-theme", mode);
}

function runCliCommand() {
  const command = commandInput.value.trim().toLowerCase();

  if (!command) {
    terminalOutput.textContent = "Type a command. Try: help";
    return;
  }

  if (command === "clear") {
    terminalOutput.textContent = "";
    commandInput.value = "";
    return;
  }

  terminalOutput.textContent =
    responses[command] ?? `Command not found: ${command}\nTry "help" to see what is available.`;
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "light" ? "dark" : "light");
});

searchButton.addEventListener("click", () => {
  commandInput.scrollIntoView({ behavior: "smooth", block: "center" });
  commandInput.focus();
});

runCommand.addEventListener("click", runCliCommand);

terminal.addEventListener("click", (event) => {
  if (event.target !== runCommand) {
    commandInput.focus();
  }
});

commandChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    commandInput.value = chip.dataset.command;
    runCliCommand();
    commandInput.focus();
  });
});

copyContacts.forEach((button) => {
  const originalText = button.textContent.trim();

  button.addEventListener("click", async () => {
    try {
      const copied = await copyText(button.dataset.copy);
      button.textContent = copied ? "Copied" : "Copy manually: " + button.dataset.copy;
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copied");
      }, 1200);
    } catch {
      button.textContent = button.dataset.copy;
    }
  });
});

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runCliCommand();
  }
});

setTheme(localStorage.getItem("preferred-theme") || "dark");
