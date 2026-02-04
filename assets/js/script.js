document.addEventListener("DOMContentLoaded", () => {

  // MENU MOBILE
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // ANIMAÇÕES
  const elements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("animate");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));

  // TRACK WHATSAPP
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "click_whatsapp" });
    });
  });

});
