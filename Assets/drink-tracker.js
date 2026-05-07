(function () {
  const STORAGE_KEY = "visited-drinks";
  const ALL_DRINKS = ["milk", "martini", "water", "coffee", "mintmojito", "mysterycocktail"];

  function getVisitedSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      return new Set();
    }
  }

  function saveVisitedSet(set) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch (err) {
      /* ignore */
    }
  }

  function clearVisited() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
  }

  function markVisited(drinkId) {
    if (!ALL_DRINKS.includes(drinkId)) return;
    const visited = getVisitedSet();
    visited.add(drinkId);
    saveVisitedSet(visited);
  }

  function attachMoreDrinksLogic() {
    const buttons = document.querySelectorAll('a[href="fridge.html"]');
    buttons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const visited = getVisitedSet();
        const allVisited = ALL_DRINKS.every((id) => visited.has(id));
        if (allVisited) {
          event.preventDefault();
          clearVisited();
          window.location.href = "index.html";
        }
      });
    });
  }

  function init() {
    const drinkId = document.body && document.body.dataset && document.body.dataset.drinkId;
    if (drinkId) {
      markVisited(drinkId);
    }
    attachMoreDrinksLogic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
