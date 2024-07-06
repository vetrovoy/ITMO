import "../css/app.css";
import "./select.js";

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("#hamburger");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    document.querySelector(".menu").classList.toggle("menu--active");
  });
});
