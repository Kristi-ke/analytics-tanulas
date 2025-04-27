// js/layout-loader.js

document.addEventListener("DOMContentLoaded", () => {
  const inject = (id, file) => {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = data;
      });
  };

  inject("header", "layout/header.html");
  inject("footer", "layout/footer.html");
  inject("consent-banner-placeholder", "layout/consent.html");
});
