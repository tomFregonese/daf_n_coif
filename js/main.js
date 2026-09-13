(() => {
  "use strict";

  /* ---------- Année dans le footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header : fond au scroll ---------- */
  const header = document.getElementById("site-header");
  /* Le bouton d'appel flottant (mobile) n'apparaît qu'une fois le héros
     dépassé : celui-ci affiche déjà un bouton d'appel bien visible. */
  const stickyCall = document.querySelector(".sticky-call");
  const heroEl = document.getElementById("accueil");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");

    if (stickyCall && heroEl) {
      const pastHero = window.scrollY > heroEl.offsetHeight - 120;
      stickyCall.classList.toggle("is-visible", pastHero);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Révélation au scroll ----------
     N'active l'état "caché" (voir CSS) qu'une fois l'observateur prêt, et
     pose un filet de sécurité : si un élément n'a pas été révélé après un
     délai raisonnable (onglet en arrière-plan, navigateur capricieux...),
     il est rendu visible quand même plutôt que de rester invisible. */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }, 2500);
  }

  /* ---------- Galerie : lightbox ---------- */
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  if (items.length && lightbox) {
    const imgEl = document.getElementById("lightbox-img");
    const sourceEl = document.getElementById("lightbox-source");
    const captionEl = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    let currentIndex = 0;
    let lastFocused = null;

    const show = (index) => {
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      imgEl.src = item.dataset.full;
      imgEl.alt = item.dataset.caption || "";
      sourceEl.srcset = item.dataset.fullWebp || "";
      captionEl.textContent = item.dataset.caption || "";
    };

    const open = (index) => {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      imgEl.src = "";
      if (lastFocused) lastFocused.focus();
    };

    items.forEach((item, index) => {
      item.addEventListener("click", () => open(index));
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => show(currentIndex - 1));
    nextBtn.addEventListener("click", () => show(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  }
})();
