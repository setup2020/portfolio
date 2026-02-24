/**
 * Pascal Gouchighe - Portfolio Scripts
 * Handles custom animations, scroll effects and dynamic interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Current Year Footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // 2. Navbar Shrink on Scroll
  const navbarCollapse = function () {
    const mainNav = document.getElementById("mainNav");
    if (!mainNav) {
      return;
    }
    if (window.scrollY > 50) {
      mainNav.classList.add("py-2", "shadow-sm");
      mainNav.classList.remove("py-3");
      mainNav.style.background = "rgba(2, 6, 23, 0.85)";
    } else {
      mainNav.classList.add("py-3");
      mainNav.classList.remove("py-2", "shadow-sm");
      mainNav.style.background = "rgba(2, 6, 23, 0.5)";
    }
  };
  navbarCollapse();
  document.addEventListener("scroll", navbarCollapse);

  // 3. Close responsive menu when a scroll trigger link is clicked
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link"),
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // 4. Hero Animation Elements (Initial Load)
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".animate-fade-in-up");
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("is-visible");
      }, i * 150);
    });
  }, 100);

  // 5. Intersection Observer for Scroll Animations
  // Replacing AOS library with custom lightweight Intersection Observer for better performance
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1,
  };

  const animateOnScrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
          // Optional: Stop observing once animated
          // observer.unobserve(entry.target);
        } else {
          // Optional: remove class to re-animate on scroll up
          // entry.target.classList.remove('aos-animate');
        }
      });
    },
    observerOptions,
  );

  const animatedElements = document.querySelectorAll("[data-aos]");
  animatedElements.forEach((el) => {
    // Set delay if provided
    const delay = el.getAttribute("data-aos-delay");
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    animateOnScrollObserver.observe(el);
  });

  // 6. Smooth Scrolling for Anchor Links (fallback for browsers not supporting CSS scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
