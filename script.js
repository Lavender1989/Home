const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const searchButton = document.querySelector("#searchButton");
const commandInput = document.querySelector("#commandInput");
const runCommand = document.querySelector("#runCommand");
const terminalOutput = document.querySelector("#terminalOutput");

const responses = {
  help: [
    "Available commands:",
    "  whoami     short intro",
    "  projects   featured projects",
    "  about      what I am exploring",
    "  contact    email and links",
    "  clear      clear the output",
  ].join("\n"),
  whoami: "Lavendar: building useful little systems, shipping fast, learning in public.",
  projects: [
    "1. Agent Workspace - personal AI task console",
    "2. Memory Garden - searchable long-term notes",
    "3. Vibe Clips - quick creator tooling prototype",
  ].join("\n"),
  about:
    "I like turning fuzzy ideas into clickable things: agents, workflows, interfaces, and tiny tools that save time.",
  contact: "Email: hello@example.com\nGitHub: https://github.com/",
};

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

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runCliCommand();
  }
});

setTheme(localStorage.getItem("preferred-theme") || "dark");
