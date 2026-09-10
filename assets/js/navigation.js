/**
 * ====================================================================
 * navigation.js - Header, Footer, Mobile Navigation & Search Modules
 * ====================================================================
 * Handles:
 *  1. Desktop Header (hide on scroll down, show on scroll up, glassmorphism)
 *  2. Mobile Navigation Drawer & Hamburger Menu
 *  3. Mobile Bottom Navigation Bar (< 576px)
 *  4. Site Search Modal, Category Filter Chips & Quick Search
 *  5. Mobile Services Bottom Sheet Modal
 *  6. Mobile Slide-Up Quick Enquire Sheet & Floating CTA trigger
 *  7. Footer Accordion for Mobile Screens (< 768px)
 */

const initNavigation = () => {
  /* ---------------- 1. DESKTOP / SITE HEADER (SCROLL BEHAVIOR) ---------------- */
  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY || 0;
  const scrollThreshold = 10;

  const onHeaderScroll = () => {
    if (!header) return;
    const currentScrollY = window.scrollY || 0;

    // Add blurred glassmorphism when page is scrolled past top
    header.classList.toggle("is-scrolled", currentScrollY > 40);

    // Only trigger hide/show logic past top zone
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling Down -> Hide Header
        header.classList.add("is-hidden");
      } else {
        // Scrolling Up -> Show Header
        header.classList.remove("is-hidden");
      }
      lastScrollY = currentScrollY;
    }

    if (currentScrollY <= 20) {
      header.classList.remove("is-hidden");
    }
  };

  if (header) {
    onHeaderScroll();
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
  }

  /* ---------------- 2. MOBILE NAVIGATION DRAWER ---------------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavClose = document.querySelector(".mobile-nav-close");

  const closeMobileNav = () => {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    if (hamburger) {
      hamburger.classList.remove("is-open");
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
    const mbNavMenuBtn = document.getElementById("mbNavMenu");
    if (mbNavMenuBtn) {
      mbNavMenuBtn.classList.remove("active");
      const icon = mbNavMenuBtn.querySelector(".mb-nav-icon i");
      if (icon) icon.className = "fa-solid fa-bars";
    }
    document.body.style.overflow = "";
  };

  const toggleMobileNav = () => {
    if (!mobileNav) return;
    const open = mobileNav.classList.toggle("is-open");
    if (hamburger) {
      hamburger.classList.toggle("is-open", open);
      hamburger.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    }
    const mbNavMenuBtn = document.getElementById("mbNavMenu");
    if (mbNavMenuBtn) {
      mbNavMenuBtn.classList.toggle("active", open);
      const icon = mbNavMenuBtn.querySelector(".mb-nav-icon i");
      if (icon) icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (hamburger) hamburger.addEventListener("click", toggleMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileNav));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  /* ---------------- 3. SEARCH MODAL & INSTANT SEARCH ---------------- */
  const siteSearchModal = document.getElementById("siteSearchModal");
  const siteSearchInput = document.getElementById("siteSearchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const searchModalClose = document.getElementById("searchModalClose");
  const searchModalBackdrop = document.getElementById("searchModalBackdrop");
  const searchResultsList = document.getElementById("searchResultsList");
  const searchResultsHeading = document.getElementById("searchResultsHeading");
  const searchQuickTags = document.getElementById("searchQuickTags");

  const searchData = [
    {
      title: "Connected TV (CTV) Advertising",
      category: "service",
      badge: "Service",
      desc: "Targetable, high-impact big screen video ads across Smart TVs and OTT apps.",
      icon: "fa-solid fa-tv",
      link: "#services"
    },
    {
      title: "Programmatic Advertising",
      category: "service",
      badge: "Service",
      desc: "Automated real-time bidding for display, video, audio & native ad inventory.",
      icon: "fa-solid fa-robot",
      link: "#services"
    },
    {
      title: "Online Video Advertising",
      category: "service",
      badge: "Service",
      desc: "High-retention storytelling and short-form video campaigns across YouTube and OTT.",
      icon: "fa-solid fa-video",
      link: "#services"
    },
    {
      title: "Performance Marketing (PPC & Paid Ads)",
      category: "service",
      badge: "Service",
      desc: "High-intent Google Ads, Meta Ads, and ROI-driven conversion campaigns.",
      icon: "fa-solid fa-chart-line",
      link: "#services"
    },
    {
      title: "Display & Rich Media Advertising",
      category: "service",
      badge: "Service",
      desc: "Interactive, 3D and rich media creatives that capture attention and increase CTR.",
      icon: "fa-solid fa-wand-magic-sparkles",
      link: "#services"
    },
    {
      title: "Brand Strategy & Content Marketing",
      category: "service",
      badge: "Service",
      desc: "Brand narratives, thought leadership, storytelling and content engines.",
      icon: "fa-solid fa-pen-nib",
      link: "#services"
    },
    {
      title: "Search Engine Optimization (SEO)",
      category: "service",
      badge: "Service",
      desc: "Technical SEO, organic search dominance, keyword rankings, and authority building.",
      icon: "fa-solid fa-magnifying-glass-chart",
      link: "#services"
    },
    {
      title: "Website & App Development",
      category: "service",
      badge: "Service",
      desc: "Modern UI/UX, responsive custom web design, high-speed performant web applications.",
      icon: "fa-solid fa-code",
      link: "#services"
    },
    {
      title: "Social Media Marketing (SMM & SMO)",
      category: "service",
      badge: "Service",
      desc: "Viral campaigns, community engagement, and brand building across Instagram & LinkedIn.",
      icon: "fa-solid fa-share-nodes",
      link: "#services"
    },
    {
      title: "Online Reputation Management (ORM)",
      category: "service",
      badge: "Service",
      desc: "Brand sentiment monitoring, digital PR, review defense and executive branding.",
      icon: "fa-solid fa-shield-halved",
      link: "#services"
    },
    {
      title: "Influencer Marketing",
      category: "service",
      badge: "Service",
      desc: "Verified creator partnerships, endorsement activations, and influencer management.",
      icon: "fa-solid fa-bullhorn",
      link: "#services"
    },
    {
      title: "Email Marketing & CRM Automation",
      category: "service",
      badge: "Service",
      desc: "Lifecycle drip flows, automated newsletters, personalized retention marketing.",
      icon: "fa-solid fa-envelope-open-text",
      link: "#services"
    },
    {
      title: "WhatsApp Marketing",
      category: "service",
      badge: "Service",
      desc: "Conversational AI chatbots, WhatsApp blast campaigns, instant customer reach.",
      icon: "fa-brands fa-whatsapp",
      link: "#services"
    },
    {
      title: "Client Case Studies & Portfolio",
      category: "casestudy",
      badge: "Case Studies",
      desc: "Real campaign results, performance case studies, ROI benchmarks and growth stories.",
      icon: "fa-solid fa-briefcase",
      link: "#work"
    },
    {
      title: "Industry Insights & Blogs",
      category: "insights",
      badge: "Insights",
      desc: "Latest ad-tech trends, digital marketing strategies and guides from industry experts.",
      icon: "fa-solid fa-newspaper",
      link: "#insights"
    },
    {
      title: "Our Team & Leadership",
      category: "contact",
      badge: "Company",
      desc: "Meet the strategists, media buyers, designers and engineers behind Adomantra.",
      icon: "fa-solid fa-users",
      link: "#approach"
    },
    {
      title: "Book a Consultation / Contact Us",
      category: "contact",
      badge: "Contact",
      desc: "Speak with our media and growth team for a bespoke marketing strategy.",
      icon: "fa-solid fa-paper-plane",
      link: "#consultationOffcanvas",
      isOffcanvas: true
    }
  ];

  let currentSearchFilter = "all";

  const renderSearchResults = (query = "", filter = "all") => {
    if (!searchResultsList) return;
    const cleanQuery = query.trim().toLowerCase();

    const filtered = searchData.filter((item) => {
      const matchesCategory = filter === "all" || item.category === filter;
      const matchesQuery =
        !cleanQuery ||
        item.title.toLowerCase().includes(cleanQuery) ||
        item.desc.toLowerCase().includes(cleanQuery) ||
        item.badge.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesQuery;
    });

    if (searchResultsHeading) {
      if (cleanQuery) {
        searchResultsHeading.textContent = `Search Results (${filtered.length})`;
      } else if (filter !== "all") {
        searchResultsHeading.textContent = `Category: ${filter.toUpperCase()}`;
      } else {
        searchResultsHeading.textContent = "Popular Services & Links";
      }
    }

    if (filtered.length === 0) {
      searchResultsList.innerHTML = `
        <div class="search-empty-state">
          <div class="search-empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <div class="search-empty-title">No matching results found</div>
          <p class="search-empty-desc">Try searching for keywords like "SEO", "CTV", "Video", or "Contact".</p>
        </div>
      `;
      return;
    }

    searchResultsList.innerHTML = filtered
      .map(
        (item) => `
        <a href="${item.link}" class="search-result-card" data-is-offcanvas="${item.isOffcanvas ? "true" : "false"}">
          <div class="search-result-icon">
            <i class="${item.icon}"></i>
          </div>
          <div class="search-result-info">
            <div class="search-result-top">
              <span class="search-result-title">${item.title}</span>
              <span class="search-result-badge">${item.badge}</span>
            </div>
            <p class="search-result-desc">${item.desc}</p>
          </div>
          <i class="fa-solid fa-chevron-right search-result-arrow"></i>
        </a>
      `
      )
      .join("");

    // Click handling is delegated on searchResultsList container below
  };

  // Delegated click listener on search results container (works for both static HTML and dynamic queries)
  if (searchResultsList) {
    searchResultsList.addEventListener("click", (e) => {
      const card = e.target.closest(".search-result-card");
      if (!card) return;

      const isOffcanvas = card.dataset.isOffcanvas === "true";
      const href = card.getAttribute("href");

      closeSearchModal();

      if (isOffcanvas) {
        e.preventDefault();
        const offcanvasEl = document.getElementById("consultationOffcanvas");
        if (offcanvasEl && window.bootstrap && window.bootstrap.Offcanvas) {
          const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
          bsOffcanvas.show();
        }
      } else if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  const openSearchModal = () => {
    if (!siteSearchModal) return;
    closeMobileNav();
    siteSearchModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    renderSearchResults(siteSearchInput ? siteSearchInput.value : "", currentSearchFilter);
    setTimeout(() => {
      if (siteSearchInput) siteSearchInput.focus();
    }, 100);
  };

  const closeSearchModal = () => {
    if (!siteSearchModal) return;
    siteSearchModal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  if (searchModalClose) {
    searchModalClose.addEventListener("click", closeSearchModal);
  }

  if (searchModalBackdrop) {
    searchModalBackdrop.addEventListener("click", closeSearchModal);
  }

  if (siteSearchInput) {
    siteSearchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle("is-visible", val.length > 0);
      }
      renderSearchResults(val, currentSearchFilter);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (siteSearchInput) {
        siteSearchInput.value = "";
        searchClearBtn.classList.remove("is-visible");
        renderSearchResults("", currentSearchFilter);
        siteSearchInput.focus();
      }
    });
  }

  if (searchQuickTags) {
    searchQuickTags.querySelectorAll(".search-tag-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        searchQuickTags.querySelectorAll(".search-tag-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentSearchFilter = chip.dataset.filter || "all";
        renderSearchResults(siteSearchInput ? siteSearchInput.value : "", currentSearchFilter);
      });
    });
  }

  const headerSearchBtn = document.getElementById("headerSearchBtn");
  const headerMobileSearchBtn = document.getElementById("headerMobileSearchBtn");

  if (headerSearchBtn) {
    headerSearchBtn.addEventListener("click", openSearchModal);
  }

  if (headerMobileSearchBtn) {
    headerMobileSearchBtn.addEventListener("click", openSearchModal);
  }

  document.addEventListener("keydown", (e) => {
    // Open with Cmd/Ctrl + K or forward slash outside input fields
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (siteSearchModal && siteSearchModal.classList.contains("is-open")) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    }
    if (e.key === "Escape" && siteSearchModal && siteSearchModal.classList.contains("is-open")) {
      closeSearchModal();
    }
  });

  /* ---------------- 4. MOBILE BOTTOM NAVIGATION (< 576px) ---------------- */
  const mbNavHome = document.getElementById("mbNavHome");
  const mbNavMenu = document.getElementById("mbNavMenu");
  const mbNavSearch = document.getElementById("mbNavSearch");
  const mbNavServices = document.getElementById("mbNavServices");
  const mbNavChatbot = document.getElementById("mbNavChatbot");
  const mbNavItems = document.querySelectorAll(".mb-nav-item");

  const setActiveBottomNav = (activeId) => {
    mbNavItems.forEach((btn) => {
      btn.classList.toggle("active", btn.id === activeId);
    });
  };

  if (mbNavHome) {
    mbNavHome.addEventListener("click", (e) => {
      e.preventDefault();
      closeMobileNav();
      closeSearchModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveBottomNav("mbNavHome");
    });
  }

  if (mbNavMenu) {
    mbNavMenu.addEventListener("click", () => {
      closeSearchModal();
      toggleMobileNav();
    });
  }

  if (mbNavSearch) {
    mbNavSearch.addEventListener("click", openSearchModal);
  }

  // Mobile Services Bottom Sheet
  const mobileServicesSheet = document.getElementById("mobileServicesSheet");
  const mobileServicesClose = document.getElementById("mobileServicesClose");
  const mobileServicesBackdrop = document.getElementById("mobileServicesBackdrop");
  const btnExploreAllServicesTop = document.getElementById("btnExploreAllServicesTop");

  const openServicesSheet = () => {
    if (!mobileServicesSheet) return;
    closeMobileNav();
    closeSearchModal();
    mobileServicesSheet.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setActiveBottomNav("mbNavServices");
  };

  const closeServicesSheet = () => {
    if (!mobileServicesSheet) return;
    mobileServicesSheet.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  if (mobileServicesClose) {
    mobileServicesClose.addEventListener("click", closeServicesSheet);
  }

  if (mobileServicesBackdrop) {
    mobileServicesBackdrop.addEventListener("click", closeServicesSheet);
  }

  if (btnExploreAllServicesTop) {
    btnExploreAllServicesTop.addEventListener("click", (e) => {
      e.preventDefault();
      closeServicesSheet();
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (mobileServicesSheet) {
    mobileServicesSheet.querySelectorAll(".mobile-service-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const href = card.getAttribute("href");
        closeServicesSheet();
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  if (mbNavServices) {
    mbNavServices.addEventListener("click", (e) => {
      e.preventDefault();
      if (mobileServicesSheet && mobileServicesSheet.classList.contains("is-open")) {
        closeServicesSheet();
      } else {
        openServicesSheet();
      }
    });
  }

  if (mbNavChatbot) {
    mbNavChatbot.addEventListener("click", () => {
      closeMobileNav();
      closeSearchModal();
      closeServicesSheet();
      if (window.AdoChatbot && typeof window.AdoChatbot.toggle === 'function') {
        window.AdoChatbot.toggle();
      } else {
        const chatFab = document.getElementById("ado-chat-fab");
        if (chatFab) chatFab.click();
      }
      const chatWindow = document.getElementById("ado-chat-window");
      const isChatOpen = chatWindow && chatWindow.classList.contains("visible");
      mbNavChatbot.classList.toggle("active", Boolean(isChatOpen));
    });
  }

  const updateBottomNavScroll = () => {
    if (window.innerWidth >= 576) return;
    const servicesSection = document.getElementById("services");
    const scrollY = window.scrollY || window.pageYOffset;

    if (servicesSection) {
      const rect = servicesSection.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 150) {
        setActiveBottomNav("mbNavServices");
        return;
      }
    }

    if (scrollY < 400) {
      setActiveBottomNav("mbNavHome");
    }
  };

  window.addEventListener("scroll", updateBottomNavScroll, { passive: true });

  /* ---------------- 5. FOOTER ACCORDION (Mobile < 768px) ---------------- */
  document.querySelectorAll(".footer-col h4").forEach((heading) => {
    heading.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        const col = heading.closest(".footer-col");
        if (col) {
          col.classList.toggle("is-open");
        }
      }
    });
  });

  /* ---------------- 6. MOBILE BOTTOM ENQUIRY SHEET & FLOATING CTA (< 768px) ---------------- */
  const mobileSheet = document.getElementById("mobileBottomSheet");
  const openSheetBtn = document.getElementById("openMobileModalBtn");
  const closeSheetBtn = document.getElementById("closeMobileModalBtn");
  const sheetBackdrop = document.getElementById("mbsBackdrop");

  const openMobileSheet = () => {
    if (!mobileSheet) return;
    mobileSheet.classList.add("is-active");
    mobileSheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMobileSheet = () => {
    if (!mobileSheet) return;
    mobileSheet.classList.remove("is-active");
    mobileSheet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (openSheetBtn) openSheetBtn.addEventListener("click", openMobileSheet);
  if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeMobileSheet);
  if (sheetBackdrop) sheetBackdrop.addEventListener("click", closeMobileSheet);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileSheet && mobileSheet.classList.contains("is-active")) {
      closeMobileSheet();
    }
  });

  // Update floating Enquiry CTA button visibility based on hero & footer position
  if (openSheetBtn) {
    const updateEnquireBtnVisibility = () => {
      if (window.innerWidth >= 768) return;

      const heroEl = document.querySelector(".hero, .tp-breadcrumb-area, .about-us-spacing, header");
      const footerEl = document.querySelector(".site-footer, .footer-main");
      const scrollY = window.scrollY || window.pageYOffset;
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 120 : 450;

      let nearFooter = false;
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        if (footerTop < window.innerHeight + 80) {
          nearFooter = true;
        }
      }

      if (scrollY > heroBottom && !nearFooter) {
        openSheetBtn.classList.add("is-visible");
      } else {
        openSheetBtn.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", updateEnquireBtnVisibility, { passive: true });
    window.addEventListener("resize", updateEnquireBtnVisibility, { passive: true });
    updateEnquireBtnVisibility();
  }

  /* ---------------- 7. SERVICE DIRECTORY & FLOATING LABELS ---------------- */
  const serviceRows = document.querySelectorAll(".service-row");
  const previewImgs = document.querySelectorAll(".service-preview img");
  function activateService(index) {
    serviceRows.forEach((r, i) => r.classList.toggle("is-active", i === index));
    previewImgs.forEach((img, i) => img.classList.toggle("is-visible", i === index));
  }
  serviceRows.forEach((row, i) => {
    row.addEventListener("mouseenter", () => activateService(i));
    row.addEventListener("click", () => activateService(i));
    const query = row.getAttribute("data-pexels-query");
    const img = previewImgs[i];
    if (img && query && window.PexelsAPI && window.PexelsAPI.applyImageToElement) {
      window.PexelsAPI.applyImageToElement(img, query);
    }
  });
  if (serviceRows.length) activateService(0);

  /* Floating label "has-value" sync for selects */
  document.querySelectorAll(".form-group select").forEach((sel) => {
    const group = sel.closest(".form-group");
    if (!group) return;
    const sync = () => group.classList.toggle("has-value", !!sel.value);
    sel.addEventListener("change", sync);
    sync();
  });

  /* ---------------- 8. OFFCANVAS SERVICES SWIPER (>1200px) ---------------- */
  let offcanvasServicesSwiper = null;
  function initOffcanvasServicesSwiper() {
    if (typeof Swiper !== "undefined" && document.querySelector(".offcanvas-services-swiper")) {
      if (!offcanvasServicesSwiper) {
        offcanvasServicesSwiper = new Swiper(".offcanvas-services-swiper", {
          slidesPerView: 1.7,
          spaceBetween: 18,
          loop: true,
          navigation: {
            nextEl: ".offcanvas-services-next",
            prevEl: ".offcanvas-services-prev",
          },
          autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          speed: 700,
          observer: true,
          observeParents: true,
        });
      } else {
        offcanvasServicesSwiper.update();
      }
    }
  }

  const offcanvasEl = document.getElementById("consultationOffcanvas");
  if (offcanvasEl) {
    offcanvasEl.addEventListener("shown.bs.offcanvas", () => {
      initOffcanvasServicesSwiper();
    });
  }
  initOffcanvasServicesSwiper();

  /* ---------------- 9. FORM VALIDATION (Inquiry, Hero & Mobile Form) ---------------- */
  const attachFormHandler = (formId) => {
    const f = document.getElementById(formId);
    if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!f.checkValidity()) {
        f.classList.add("was-validated");
        return;
      }
      f.classList.add("was-validated");
      const submitBtn = f.querySelector(".btn-arrow span") || f.querySelector("button[type='submit']");
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Thank you — we'll be in touch!";
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 5000);
      }

      if (formId === "heroContactForm") {
        const consultationOffcanvas = document.getElementById("consultationOffcanvas");
        if (consultationOffcanvas && window.bootstrap && window.bootstrap.Offcanvas) {
          const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(consultationOffcanvas);
          if (bsOffcanvas) {
            setTimeout(() => bsOffcanvas.hide(), 1500);
          } else {
            setTimeout(() => consultationOffcanvas.classList.remove("show"), 1500);
          }
        }
      }

      if (formId === "mobileBottomSheetForm") {
        setTimeout(closeMobileSheet, 1200);
      }

      f.reset();
      f.querySelectorAll(".form-group").forEach((grp) => grp.classList.remove("has-value"));
      setTimeout(() => f.classList.remove("was-validated"), 100);
    });
  };
  attachFormHandler("inquiryForm");
  attachFormHandler("heroContactForm");
  attachFormHandler("mobileBottomSheetForm");

  /* ---------------- 10. GLOBAL CONSULTATION OFFCANVAS / "LET'S TALK" CTA HANDLER ---------------- */
  // Click handler for any trigger targeting #consultationOffcanvas (e.g. .btn-header-cta)
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest('a[href="#consultationOffcanvas"], [data-bs-target="#consultationOffcanvas"]');
    if (!trigger) return;

    const targetEl = document.getElementById("consultationOffcanvas");
    if (!targetEl) return;

    e.preventDefault();
    closeMobileNav();
    closeSearchModal();

    if (window.bootstrap && window.bootstrap.Offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(targetEl);
      bsOffcanvas.show();
    } else {
      // Fallback if Bootstrap JS is not active
      targetEl.classList.add("show");
      document.body.classList.add("modal-open");
      let backdrop = document.querySelector(".offcanvas-backdrop");
      if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "offcanvas-backdrop fade show";
        document.body.appendChild(backdrop);
        backdrop.addEventListener("click", () => {
          targetEl.classList.remove("show");
          backdrop.remove();
          document.body.classList.remove("modal-open");
        });
      }
    }
  });

  // Handle offcanvas close button fallback
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest('[data-bs-dismiss="offcanvas"], .offcanvas-close-btn');
    if (!closeBtn) return;
    const offcanvas = closeBtn.closest(".offcanvas");
    if (!offcanvas) return;

    if (window.bootstrap && window.bootstrap.Offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
    offcanvas.classList.remove("show");
    document.body.classList.remove("modal-open");
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) backdrop.remove();
  });

  /* ---------------- 11. FAQ ACCORDION COLLAPSE & EXPAND (.ado-faq-trigger) ---------------- */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".ado-faq-trigger");
    if (!trigger) return;
    e.preventDefault();

    const item = trigger.closest(".ado-faq-item");
    if (!item) return;

    const faqList = item.closest(".ado-faq-list") || item.parentElement;
    const content = item.querySelector(".ado-faq-content");
    const icon = trigger.querySelector(".ado-faq-icon");
    const isOpening = !item.classList.contains("active");

    // Close other open items in the same FAQ list
    if (faqList) {
      faqList.querySelectorAll(".ado-faq-item.active").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("active");
          const openTrigger = openItem.querySelector(".ado-faq-trigger");
          if (openTrigger) openTrigger.setAttribute("aria-expanded", "false");
          const openIcon = openItem.querySelector(".ado-faq-icon");
          if (openIcon) openIcon.textContent = "+";
          const openContent = openItem.querySelector(".ado-faq-content");
          if (openContent) openContent.style.maxHeight = null;
        }
      });
    }

    if (isOpening) {
      item.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
      if (icon) icon.textContent = "−";
      if (content) {
        content.style.maxHeight = (content.scrollHeight + 30) + "px";
      }
    } else {
      item.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      if (icon) icon.textContent = "+";
      if (content) {
        content.style.maxHeight = null;
      }
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}

