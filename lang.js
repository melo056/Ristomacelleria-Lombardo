document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("lang-switcher");

  function loadLanguage(lang) {
    fetch(`lang.${lang}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento JSON");
        }
        return response.json();
      })
      .then(data => {
        document.querySelectorAll("[data-key]").forEach(el => {
          const key = el.getAttribute("data-key");
          if (data[key]) {
            el.textContent = data[key];
          }
        });
      })
      .catch(error => console.error("Errore:", error));
  }

  // Lingua iniziale = italiano
  loadLanguage("it");

  // Cambio lingua da select
  langSwitcher.addEventListener("change", e => {
    loadLanguage(e.target.value);
  });
});