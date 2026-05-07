(function () {
  const FONT_BASE_PATH = "Assets/resprite-font";

  function renderRespriteText(element) {
    const sourceText = element.dataset.respriteText || element.textContent || "";
    const normalized = sourceText.toUpperCase();

    element.textContent = "";
    element.classList.add("resprite-text");
    element.setAttribute("aria-label", sourceText.trim());

    for (const char of normalized) {
      if (char === " ") {
        const spacer = document.createElement("span");
        spacer.className = "resprite-space";
        spacer.setAttribute("aria-hidden", "true");
        element.appendChild(spacer);
        continue;
      }

      if (char < "A" || char > "Z") {
        continue;
      }

      const letter = document.createElement("img");
      letter.className = "resprite-letter";
      letter.src = `${FONT_BASE_PATH}/${char}.png`;
      letter.alt = "";
      letter.setAttribute("aria-hidden", "true");
      element.appendChild(letter);
    }
  }

  function initRespriteFont() {
    const targets = document.querySelectorAll("[data-resprite]");
    targets.forEach(renderRespriteText);
  }

  window.renderRespriteText = renderRespriteText;
  window.initRespriteFont = initRespriteFont;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRespriteFont);
  } else {
    initRespriteFont();
  }
})();
