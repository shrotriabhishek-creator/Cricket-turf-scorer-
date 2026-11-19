(() => {
  const TOTAL_BALLS = 36;
  const STORAGE_KEY = "turf-cricket-scorer-v1";
  const fresh = () => ({ runs: 0, wickets: 0, legalBalls: 0, extras: 0, history: [] });
  let state = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Number.isInteger(saved.runs) && Array.isArray(saved.history)) return saved;
    } catch (_) {}
    return fresh();
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  function completed() { return state.legalBalls >= TOTAL_BALLS || state.wickets >= 10; }
  function snapshot() {
    return { runs: state.runs, wickets: state.wickets, legalBalls: state.legalBalls, extras: state.extras };
  }
  function record() {
    state.history.push(snapshot());
  }
  function addRun(value) {
    if (completed()) return;
    record();
    state.runs += value;
    state.legalBalls += 1;
    render(value === 4 ? "FOUR!" : value === 6 ? "SIX!" : `${value} run${value === 1 ? "" : "s"}`);
  }
  function addExtra(type) {
    if (completed()) return;
    record();
    state.runs += 1;
    state.extras += 1;
    render(type === "wide" ? "Wide +1 extra" : "No Ball +1 extra");
  }
  function addWicket() {
    if (completed()) return;
    record();
    state.wickets += 1;
    state.legalBalls += 1;
    render("Wicket!");
  }
  function undo() {
    if (!state.history.length) return;
    const previous = state.history.pop();
    Object.assign(state, previous);
    render("Last action undone");
  }
  function reset() {
    if (!confirm("Reset the score and start a new 6-over innings?")) return;
    state = fresh();
    render("New innings started");
  }
  function render(message = "") {
    const overs = Math.floor(state.legalBalls / 6);
    const balls = state.legalBalls % 6;
    document.getElementById("runs").textContent = state.runs;
    document.getElementById("wickets").textContent = state.wickets;
    document.getElementById("overs").textContent = `${overs}.${balls}`;
    document.getElementById("balls").textContent = `${state.legalBalls} / ${TOTAL_BALLS}`;
    document.getElementById("rate").textContent = state.legalBalls ? (state.runs / (state.legalBalls / 6)).toFixed(2) : "0.00";
    document.getElementById("extras").textContent = state.extras;
    document.getElementById("undo").disabled = state.history.length === 0;
    const done = completed();
    document.getElementById("status").textContent = done ? "INNINGS OVER" : "LIVE";
    document.getElementById("status").classList.toggle("done", done);
    document.querySelectorAll("[data-action]").forEach(button => button.disabled = done);
    document.getElementById("message").textContent = done ? "Innings complete!" : (message || "Ready when you are. Tap a run to start.");
    save();
  }

  document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "run") addRun(Number(button.dataset.value));
      if (action === "wide" || action === "noball") addExtra(action);
      if (action === "wicket") addWicket();
    });
  });
  document.getElementById("undo").addEventListener("click", undo);
  document.getElementById("reset").addEventListener("click", reset);

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
  render();
})();
