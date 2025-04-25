// js/layout-loader.js

document.addEventListener("DOMContentLoaded", () => {
    fetch("layout/header.html")
      .then(response => response.text())
      .then(data => document.getElementById("header").innerHTML = data);
  
    fetch("layout/footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  });
  