/**
 * Adomantra - Service Cards Sticky GSAP Stacking & View Switcher
 * Provides:
 * 1. GSAP ScrollTrigger card stacking animation (previous cards scale down and tuck underneath without opacity changes)
 * 2. Top View Switcher (Vertical Cards Stack vs Grid View)
 */

(function () {
  "use strict";

  let scrollTriggers = [];
  let currentView = "stack";

  function initServiceCards() {
    const container = document.getElementById("ado-services-container");
    if (!container) return;

    const switcherBtns = document.querySelectorAll(".ado-view-btn");

    // Initialize View Switcher Click Handlers
    switcherBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const targetView = this.getAttribute("data-view");
        if (targetView === currentView) return;

        switcherBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        switchView(targetView);
      });
    });

    // Initialize initial view (stack)
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initStackAnimation();
    } else {
      // Retry once GSAP is ready
      window.addEventListener("load", () => {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          initStackAnimation();
        }
      });
    }
  }

  function initStackAnimation() {
    clearStackTriggers();

    const container = document.getElementById("ado-services-container");
    if (!container || !container.classList.contains("ado-view-stack")) return;

    const cards = Array.from(container.querySelectorAll(".ado-service-card"));
    if (!cards.length) return;

    // Apply stacking z-index (earlier cards have lower z-index, so later cards slide over them)
    cards.forEach((card, index) => {
      card.style.zIndex = index + 1;

      // When the next card arrives, animate current card down in scale
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        // Animate scale down as next card slides in
        // CRITICAL: Opacity is strictly NOT changed
        const tween = gsap.to(card, {
          scale: 0.92,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 75%",
            end: "top 120px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (tween.scrollTrigger) {
          scrollTriggers.push(tween.scrollTrigger);
        }
      }
    });

    ScrollTrigger.refresh();
  }

  function clearStackTriggers() {
    scrollTriggers.forEach((st) => st.kill());
    scrollTriggers = [];

    const container = document.getElementById("ado-services-container");
    if (container) {
      const cards = container.querySelectorAll(".ado-service-card");
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "transform,scale" });
      });
    }
  }

  function switchView(view) {
    const container = document.getElementById("ado-services-container");
    if (!container) return;

    currentView = view;

    if (view === "grid") {
      clearStackTriggers();
      container.classList.remove("ado-view-stack");
      container.classList.add("ado-view-grid");
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    } else {
      container.classList.remove("ado-view-grid");
      container.classList.add("ado-view-stack");
      initStackAnimation();
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceCards);
  } else {
    initServiceCards();
  }
})();
