import "../css/app.css";
import "./select.js";

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("#hamburger");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    document.querySelector(".menu").classList.toggle("menu--active");
  });

  const collapses = document.querySelectorAll(".collapse");

  collapses.forEach((collapse) => {
    collapse.addEventListener("click", () => {
      collapse.classList.toggle("collapse--active");
    });
  });

  class AnimateCssElementOnVisible {
    constructor(selector, animationClass, options = {}) {
      this.elements = document.querySelectorAll(selector);
      this.animationClass = animationClass;
      this.options = Object.assign(
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
          once: true,
        },
        options
      );
      this.observer = null;
      this.init();
    }

    init() {
      if (this.elements.length === 0) return;

      if ("IntersectionObserver" in window) {
        this.elements.forEach((element) => {
          element.style.visibility = "hidden";
          element.classList.add("animate__animated");
        });

        this.createObserver();
      } else {
        // Fallback for browsers that do not support IntersectionObserver
        this.elements.forEach((element) => {
          element.classList.add(this.animationClass);
        });
      }
    }

    createObserver() {
      this.observer = new IntersectionObserver(
        this.handleIntersect.bind(this),
        this.options
      );
      this.elements.forEach((element) => this.observer.observe(element));
    }

    handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = "visible";
          entry.target.classList.add(this.animationClass);
          if (this.options.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.options.once) {
          entry.target.classList.remove(this.animationClass);
        }
      });
    }
  }

  new AnimateCssElementOnVisible(".section", "animate__fadeIn");
  new AnimateCssElementOnVisible(".title--1", "animate__backInLeft");
  new AnimateCssElementOnVisible(".button", "animate__zoomIn");
  new AnimateCssElementOnVisible(".logo", "animate__zoomIn");
});
