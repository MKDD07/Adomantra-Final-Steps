document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  /* ---------------- SMOOTH SCROLL (LENIS) ---------------- */
  let lenis;
  if (typeof Lenis !== 'undefined' && !reduceMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } else {
    if (window.gsap) gsap.registerPlugin(ScrollTrigger);
  }



  /* ---------------- BRAND SLIDER (Official Partners Swiper) ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".brand-slider6")) {
    new Swiper(".brand-slider6", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        480: { slidesPerView: 3, spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 30 },
        1024: { slidesPerView: 5, spaceBetween: 36 },
        1280: { slidesPerView: 6, spaceBetween: 40 },
      },
    });
  }

  /* ---------------- CONTINUOUS TEXT SLIDER TICKERS ---------------- */
  if (typeof Swiper !== "undefined") {
    if (document.querySelector(".text-slide__active-1")) {
      new Swiper(".text-slide__active-1", {
        slidesPerView: "auto",
        spaceBetween: 28,
        loop: true,
        speed: 8500,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
      });
    }
    if (document.querySelector(".text-slide__active-2")) {
      new Swiper(".text-slide__active-2", {
        slidesPerView: "auto",
        spaceBetween: 28,
        loop: true,
        speed: 8500,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        },
        allowTouchMove: false,
      });
    }
  }

  /* ---------------- SERVICES SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".services-swiper")) {
    new Swiper(".services-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: ".services-swiper-next",
        prevEl: ".services-swiper-prev",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 36 },
        1400: { slidesPerView: 4, spaceBetween: 36 }
      },
    });
  }

  /* ---------------- OFFCANVAS SERVICES SWIPER (>1200px) ---------------- */
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

  /* ---------------- JOURNEY / ACHIEVE SECTION SWIPER (<768px) ---------------- */
  let journeySwiperInstance = null;
  function initJourneySwiper() {
    if (typeof Swiper === "undefined") return;
    const journeyEl = document.querySelector(".journey-swiper");
    if (!journeyEl) return;

    if (window.innerWidth < 768) {
      if (!journeySwiperInstance) {
        journeySwiperInstance = new Swiper(".journey-swiper", {
          slidesPerView: 1.15,
          spaceBetween: 16,
          loop: false,
          grabCursor: true,
          observer: true,
          observeParents: true,
          speed: 600,
          breakpoints: {
            480: { slidesPerView: 1.3, spaceBetween: 18 },
            640: { slidesPerView: 1.8, spaceBetween: 20 },
          },
        });
      }
    } else {
      if (journeySwiperInstance) {
        journeySwiperInstance.destroy(true, true);
        journeySwiperInstance = null;
      }
    }
  }

  initJourneySwiper();
  window.addEventListener("resize", () => {
    initJourneySwiper();
  });

  /* ---------------- INDUSTRIES SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".industries-swiper")) {
    new Swiper(".industries-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: ".industries-swiper-next",
        prevEl: ".industries-swiper-prev",
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 36 },
        1400: { slidesPerView: 4, spaceBetween: 36 }
      },
    });
  }

  /* ---------------- CASE STUDY SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".case-study-swiper")) {
    new Swiper(".case-study-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".case-study-swiper-next",
        prevEl: ".case-study-swiper-prev",
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 750,
      observer: true,
      observeParents: true,
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 }
      },
    });
  }

  /* ---------------- INSIGHTS SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".insights-swiper")) {
    new Swiper(".insights-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".insights-swiper-next",
        prevEl: ".insights-swiper-prev",
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 750,
      observer: true,
      observeParents: true,
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 }
      },
    });
  }

  /* ---------------- CLIENTS DUAL-ROW SWIPER (Mobile < 768px) ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".clients-swiper-row1")) {
    new Swiper(".clients-swiper-row1", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: 3500,
      allowTouchMove: true,
    });
  }

  if (typeof Swiper !== "undefined" && document.querySelector(".clients-swiper-row2")) {
    new Swiper(".clients-swiper-row2", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      speed: 3500,
      allowTouchMove: true,
    });
  }

  document.querySelectorAll("video[data-pexels-video]").forEach(async (vidEl) => {
    const query = vidEl.getAttribute("data-pexels-video");
    const quality = vidEl.getAttribute("data-pexels-quality") || "hd";
    if (!query) return;
    try {
      const videoData = await window.PexelsAPI.fetchPexelsVideos(query, quality);
      if (videoData) {
        if (videoData.posterUrl && !vidEl.poster) vidEl.poster = videoData.posterUrl;
        
        // Start playing the lightweight preview immediately
        const startUrl = videoData.previewVideoUrl || videoData.videoUrl;
        vidEl.src = startUrl;
        vidEl.load();
        vidEl.play().catch(() => {});

        // If high-definition 1080p is available and different from initial preview, upgrade seamlessly
        if (videoData.videoUrl && videoData.videoUrl !== startUrl) {
          const upgradeVid = document.createElement("video");
          upgradeVid.src = videoData.videoUrl;
          upgradeVid.preload = "auto";
          upgradeVid.oncanplay = () => {
            const currentTime = vidEl.currentTime;
            vidEl.src = videoData.videoUrl;
            vidEl.currentTime = currentTime;
            vidEl.play().catch(() => {});
          };
        }
      }
    } catch (e) {
      console.warn("Could not load Pexels video:", e);
    }
  });

  /* ---------------- GENERIC PEXELS IMAGE LOADER & JSON DATA LOADER ---------------- */
  if (window.PexelsAPI && window.PexelsAPI.initPexelsJsonData) {
    window.PexelsAPI.initPexelsJsonData();
  }

  document.querySelectorAll("[data-pexels-query]:not([data-pexels-key])").forEach((el) => {
    const query = el.getAttribute("data-pexels-query");
    if (el.tagName === "IMG") {
      window.PexelsAPI.applyImageToElement(el, query);
    }
  });



  /* ---------------- CASE STUDY MODAL INTERACTION ---------------- */
  const caseStudyData = {
    "malabar-jewellery": {
      badge: "Jewellery & Luxury Retail",
      title: "Malabar Jewellery: Turning Festive Buzz Into Sales: How Malabar Jewellery Scaled Sales Across Every Channel",
      image: "assets/malabar-jewellery.png",
      statVal1: "+340%",
      statLbl1: "High-Intent Consultation Leads",
      statVal2: "4.8x",
      statLbl2: "Blended Festive Campaign ROAS",
      overview: "Malabar Gold & Diamonds partnered with Adomantra to scale footfall across 300+ showrooms and accelerate high-ticket bridal jewellery inquiries nationwide.",
      challenge: "High regional competition during peak bridal and festive seasons, along with the complexity of tracking digital media impressions to verified offline showroom visits.",
      strategy: "Deployed localized programmatic geo-fencing around competing jewellery hubs, dynamic rich video creatives featuring real-time gold rates, and hyper-targeted Google search intent campaigns.",
      impact: "Delivered +340% uplift in high-intent bridal consultation leads, achieved a 4.8x blended ROAS during festive seasons, and boosted regional store walk-ins by 42%.",
      url: "https://www.adomantra.com/case-study-detail/malabar-jewellery"
    },
    "food-delivery": {
      badge: "FoodTech & Quick Commerce",
      title: "Food Delivery App: From Unknown to Unmissable: Scaling a Food Delivery App to 2.4M+ Installs",
      image: "assets/food-delivery.png",
      statVal1: "2.4M+",
      statLbl1: "Verified App Installations",
      statVal2: "-38%",
      statLbl2: "First-Order CAC Reduction",
      overview: "A top-tier on-demand food delivery app engaged Adomantra to engineer explosive user acquisition, drive meal-time app orders, and increase active user retention.",
      challenge: "Saturated metropolitan food delivery landscape, soaring app acquisition costs (CAC), and user churn after first installation.",
      strategy: "Executed real-time meal-time contextual push advertising, dynamic video banners tailored to current weather and food craving triggers, paired with automated programmatic CPI/CPA bidding algorithms.",
      impact: "Generated over 2.4 Million verified app installations, decreased first-order CAC by 38%, and elevated 30-day user re-order rates by 2.6x.",
      url: "https://www.adomantra.com/case-study-detail/food-delivery"
    },
    "ola-app-amp-play": {
      badge: "Mobility & Ride Hailing",
      title: "Ola App & Play: Driving Millions of Riders to Engage, Not Just Install",
      image: "assets/ola-app-play.png",
      statVal1: "5.8M+",
      statLbl1: "Active In-Transit Riders Reached",
      statVal2: "+192%",
      statLbl2: "Play Screen Interaction Surge",
      overview: "Adomantra conceptualized and rolled out a high-impact synchronized digital media strategy across Ola's in-cab interactive screen ecosystem (Ola Play) and mobile app network.",
      challenge: "Capturing commuter attention during rides and converting passive screen impressions into verified ecosystem app installations and brand actions.",
      strategy: "Engineered interactive micro-game display units, contextual city-guide video campaigns, and frictionless 1-tap ecosystem app installation incentives directly on in-vehicle tablets.",
      impact: "Engaged 5.8M+ active riders across 12 major metropolitan areas, achieving a 192% surge in screen engagement and driving over 850k cross-app ecosystem downloads.",
      url: "https://www.adomantra.com/case-study-detail/ola-app-amp-play"
    },
    "real-estate": {
      badge: "Luxury Real Estate",
      title: "Real Estate (Luxury): How We Turned HNI Interest Into Verified Site Visits",
      image: "assets/real-estate.png",
      statVal1: "₹65Cr+",
      statLbl1: "Closed Property Inventory",
      statVal2: "+410%",
      statLbl2: "Verified HNI Site Visits",
      overview: "A luxury property conglomerate partnered with Adomantra to capture high-net-worth investor demand and accelerate sales of ultra-luxury residential towers.",
      challenge: "Generic real estate lead generation generated low-intent inquiries, overburdened sales teams, and resulted in prolonged deal closing cycles.",
      strategy: "Implemented interactive 3D virtual tour video units, Google search high-intent keyword exclusivity, and multi-tier algorithmic lead qualification prior to sales escalation.",
      impact: "Directly facilitated ₹65Cr+ in verified residential property sales, increased qualified HNI physical site tours by 410%, and reduced cost-per-booking by 44%.",
      url: "https://www.adomantra.com/case-study-detail/real-estate"
    },
    "healthcare": {
      badge: "Hospitals & Healthcare",
      title: "Narayana Health: +280% High-Intent Patient Consults",
      image: "assets/saroj-hospital.png",
      statVal1: "+280%",
      statLbl1: "Verified OP Consultations",
      statVal2: "3.4x",
      statLbl2: "Appointment Booking ROAS",
      overview: "Narayana Health partnered with Adomantra to scale patient inquiries across super-speciality departments nationwide.",
      challenge: "High regional competition and compliance restrictions in healthcare advertising across search and social.",
      strategy: "Deployed localized Google Medical Search intent funnels and doctor-credential video campaigns.",
      impact: "Generated +280% uplift in appointment consultations with 3.4x ROAS on digital media spend.",
      url: "https://www.adomantra.com/case-study-detail/narayana-health"
    },
    "telehealth": {
      badge: "Telehealth & Care",
      title: "MediBuddy: Scaling Telehealth Subscriptions by 3.8x",
      image: "assets/medibuddy.png",
      statVal1: "3.8x",
      statLbl1: "Telehealth Subscription Growth",
      statVal2: "-42%",
      statLbl2: "Cost Per Active User",
      overview: "MediBuddy engaged Adomantra to drive adoption of unlimited online doctor consultations and corporate wellness plans.",
      challenge: "Overcoming consumer hesitation around virtual healthcare consultations and reducing app CAC.",
      strategy: "Launched programmatic health-intent contextual campaigns and 1-tap consultation onboarding workflows.",
      impact: "Delivered 3.8x growth in annual health subscriptions and lowered acquisition cost by 42%.",
      url: "https://www.adomantra.com/case-study-detail/medibuddy"
    },
    "hospital": {
      badge: "Speciality Healthcare",
      title: "Saroj Hospital: Dominating Regional Care Search Share",
      image: "assets/saroj-hospital.png",
      statVal1: "+310%",
      statLbl1: "Regional Care Inquiries",
      statVal2: "94%",
      statLbl2: "Local Search Impression Share",
      overview: "Saroj Hospital engaged Adomantra to establish dominant regional authority for cardiology and oncology.",
      challenge: "Patients looking for urgent specialty care were being captured by larger aggregate healthcare portals.",
      strategy: "Hyper-targeted radius programmatic search campaigns and emergency helpline click-to-call units.",
      impact: "Secured 94% search impression share in Delhi NCR and drove +310% growth in inpatient admissions.",
      url: "https://www.adomantra.com/case-study-detail/saroj-hospital"
    },
    "ecommerce": {
      badge: "D2C & E-Commerce",
      title: "D2C Fashion: 5.2x Blended ROAS on Meta & CTV",
      image: "assets/d2c-fashion.png",
      statVal1: "5.2x",
      statLbl1: "Blended Multi-Channel ROAS",
      statVal2: "+260%",
      statLbl2: "Repeat Purchase Rate",
      overview: "A premium D2C apparel brand partnered with Adomantra to scale direct web sales profitably.",
      challenge: "High ad fatigue on traditional social feeds and rising cost per purchase during peak sales events.",
      strategy: "CTV video storytelling synchronized with dynamic product catalog ads on Instagram and WhatsApp re-engagement.",
      impact: "Achieved 5.2x blended ROAS across all paid channels and boosted 60-day repeat purchase rate by 260%.",
      url: "https://www.adomantra.com/case-study-detail/d2c-fashion"
    }
  };

  const csModalEl = document.getElementById("caseStudyDetailModal");
  let csBsModal = null;
  if (csModalEl && typeof bootstrap !== "undefined" && bootstrap.Modal) {
    csBsModal = new bootstrap.Modal(csModalEl);
  }

  document.querySelectorAll("[data-cs-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-cs-key");
      const data = caseStudyData[key];
      if (!data) return;

      document.getElementById("csModalBadge").textContent = data.badge;
      document.getElementById("csModalTitle").textContent = data.title;
      document.getElementById("csModalImg").src = data.image;
      document.getElementById("csModalStatVal1").textContent = data.statVal1;
      document.getElementById("csModalStatLbl1").textContent = data.statLbl1;
      document.getElementById("csModalStatVal2").textContent = data.statVal2;
      document.getElementById("csModalStatLbl2").textContent = data.statLbl2;
      document.getElementById("csModalOverview").textContent = data.overview;
      document.getElementById("csModalChallenge").textContent = data.challenge;
      document.getElementById("csModalStrategy").textContent = data.strategy;
      document.getElementById("csModalImpact").textContent = data.impact;
      
      const liveLink = document.getElementById("csModalLiveUrl");
      if (liveLink) liveLink.href = data.url;

      if (csBsModal) {
        csBsModal.show();
      }
    });
  });

  if (reduceMotion || !window.gsap) return;

  /* ---------------- GLOBAL H2 SCROLL REVEAL ANIMATION ---------------- */
  document.querySelectorAll("h2").forEach((h2) => {
    // Skip h2 inside final-cta (which uses WOW.js) or process cinematic pinned sequence
    if (h2.closest(".final-cta") || h2.closest(".pch-video-wrap")) return;

    gsap.fromTo(
      h2,
      {
        opacity: 0,
        y: 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: h2,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* Metrics bar with Odometer Count Animation */
  if (document.querySelector(".metrics-bar")) {
    let metricsAnimated = false;
    ScrollTrigger.create({
      trigger: ".metrics-bar",
      start: "top 85%",
      onEnter: () => {
        if (metricsAnimated) return;
        metricsAnimated = true;

        document.querySelectorAll(".odometer-counter").forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target")) || 0;
          const prefix = counter.getAttribute("data-prefix") || "";
          const suffix = counter.getAttribute("data-suffix") || "";
          const decimals = parseInt(counter.getAttribute("data-decimals"), 20) || 0;
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              counter.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            },
          });
        });
      },
    });

    // Auto-calculate font size based on available space width
    const fitYearsDisplaySize = () => {
      const yearsDisplay = document.querySelector(".years-big-display");
      const counterEl = yearsDisplay ? yearsDisplay.querySelector(".odometer-counter") : null;
      if (!yearsDisplay || !counterEl) return;

      const parentCol = yearsDisplay.closest('[class*="col-"]') || yearsDisplay.parentElement;
      const availableWidth = parentCol ? parentCol.clientWidth : yearsDisplay.clientWidth;

      if (availableWidth > 0) {
        // Calculate font size dynamically based on available width
        const computedSize = Math.max(36, Math.min(availableWidth * 0.52, 120));
        counterEl.style.fontSize = `${Math.round(computedSize)}px`;
      }
    };

    fitYearsDisplaySize();
    window.addEventListener("resize", fitYearsDisplaySize, { passive: true });

    if (window.ResizeObserver) {
      const yearsDisplay = document.querySelector(".years-big-display");
      if (yearsDisplay && yearsDisplay.parentElement) {
        new ResizeObserver(fitYearsDisplaySize).observe(yearsDisplay.parentElement);
      }
    }

    gsap.from(".metrics-slider .swiper-slide", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".metrics-bar", start: "top 88%" },
    });

    if (typeof Swiper !== "undefined" && document.querySelector(".metrics-slider")) {
      new Swiper(".metrics-slider", {
        slidesPerView: 1.2,
        spaceBetween: 14,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        speed: 700,
        breakpoints: {
          576: { slidesPerView: 1.6, spaceBetween: 14 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          992: { slidesPerView: 2, spaceBetween: 16 },
          1400: { slidesPerView: 3, spaceBetween: 16 },
        },
      });
    }
  }

  /* ---------------- WHY US - STICKY STACKING PROBLEM LIST ---------------- */
  if (document.querySelector("#why-us") && window.ScrollTrigger) {
    const whyUsSection = document.querySelector("#why-us");
    const problemList = document.querySelector(".problem-list");
    const problemWrap = document.querySelector(".problem-list-wrap");
    const pills = gsap.utils.toArray("#why-us .problem-pill");
    
    if (problemList && problemWrap && pills.length > 0) {
      const mm = gsap.matchMedia();
      
      // Desktop: Smooth pin & cards reveal/scroll
      mm.add("(min-width: 992px)", () => {
        const getScrollDistance = () => {
          return Math.max(0, problemList.scrollHeight - problemWrap.clientHeight + 40);
        };

        gsap.to(problemList, {
          y: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: whyUsSection,
            start: "top 12%",
            end: () => `+=${Math.max(700, getScrollDistance() * 2)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      });

      // Mobile / Tablet (< 992px): Sticky Stacking Card Animation
      mm.add("(max-width: 991px)", () => {
        pills.forEach((pill, i) => {
          pill.style.zIndex = i + 1;
          
          // Toggle is-stuck class when card hits sticky top (96px)
          ScrollTrigger.create({
            trigger: pill,
            start: "top 96px",
            end: "bottom bottom",
            toggleClass: { targets: pill, className: "is-stuck" }
          });

          // As subsequent cards scroll in, subtly scale down, dim, and remove shadow on previous cards
          if (i < pills.length - 1) {
            gsap.to(pill, {
              scale: 0.94,
              opacity: 0.7,
              boxShadow: "none",
              transformOrigin: "top center",
              ease: "power1.out",
              scrollTrigger: {
                trigger: pills[i + 1],
                start: "top 65%",
                end: "top 25%",
                scrub: true,
                invalidateOnRefresh: true,
              }
            });
          }
        });
      });
    }
  }

  /* ---------------- SPLIT MEDIA PINNED FULLSCREEN SHOWCASE (Think Section - >768px only) ---------------- */
  if (document.querySelector(".think-section") && window.ScrollTrigger) {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const thinkTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".think-section",
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: () => {
            header.classList.add("is-hidden");
          },
          onLeave: () => {
            header.classList.remove("is-hidden");
          },
          onEnterBack: () => {
            header.classList.add("is-hidden");
          },
          onLeaveBack: () => {
            header.classList.remove("is-hidden");
          },
        },
      });

      thinkTl
        // Curtains slide left & right to reveal full showcase
        .fromTo(".think-split-left", { xPercent: 0 }, { xPercent: -102, ease: "power2.inOut" }, 0)
        .fromTo(".think-split-right", { xPercent: 0 }, { xPercent: 102, ease: "power2.inOut" }, 0)
        // Card expands from slightly compact to full-scale screen filling presence
        .fromTo(
          ".think-cta-card",
          { scale: 0.9, opacity: 0.3, y: 30 },
          { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
          0
        )
        // Stagger pillar items into view
        .fromTo(
          ".think-pillars-grid .tp-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out" },
          0.2
        );
    });
  }

  /* ---------------- 1. PROCESS CINEMATIC HERO (GSAP EXPANDING VIDEO + INSIDE SCROLL STEPS) ---------------- */
  const pchHero = document.querySelector(".process-cinematic-hero");
  if (pchHero && window.ScrollTrigger) {
    const pchVideo = pchHero.querySelector(".pch-bg-video");
    const pchVideoWrap = pchHero.querySelector("#pchVideoWrap");
    const pchIntroTeaser = pchHero.querySelector("#pchIntroTeaser");
    const pchMainHeading = pchHero.querySelector("#pchMainHeading");
    const pchCardsFrame = pchHero.querySelector("#pchCardsScrollFrame");
    const pchCardsTrack = pchHero.querySelector("#pchCardsTrack");
    const pchCards = pchHero.querySelectorAll(".pch-card");

    // Ensure video is playing
    if (pchVideo) {
      pchVideo.play().catch(() => {});
    }

    // Play/pause video based on viewport presence
    ScrollTrigger.create({
      trigger: pchHero,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => { if (pchVideo) pchVideo.play().catch(() => {}); },
      onLeave: () => { if (pchVideo) pchVideo.pause(); },
      onEnterBack: () => { if (pchVideo) pchVideo.play().catch(() => {}); },
      onLeaveBack: () => { if (pchVideo) pchVideo.pause(); },
    });

    // Pinned Master Timeline for Intro -> Expansion -> Heading Reveal -> Inside Cards Scrolling
    const processMasterTl = gsap.timeline({
      scrollTrigger: {
        trigger: pchHero,
        start: "top top",
        end: () => {
          const isMobile = window.innerWidth <= 768;
          return `+=${window.innerHeight * (isMobile ? 4.5 : 3.8)}`;
        },
        pin: "#pchPinContainer",
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // 1. Initial teaser text fades out and video expands
    processMasterTl
      .to(pchIntroTeaser, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
      }, 0)
      .to(pchVideoWrap, {
        width: window.innerWidth > 1024 ? "84vw" : "92vw",
        maxWidth: "1400px",
        height: window.innerWidth > 1024 ? "84vh" : "86vh",
        borderRadius: "32px",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.45)",
        duration: 0.7,
        ease: "power2.inOut",
      }, 0.2)

      // 2. Main Heading, Subheading & Top Right 7-Step Architecture Badge appear
      .to(["#pchMainHeading", "#pchStepArchBadge"], {
        opacity: (i, target) => (target.id === "pchStepArchBadge" ? 0.45 : 1),
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0.8)

      // 3. Reveal cards frame inside the video container
      .to(pchCardsFrame, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      }, 1.1);

    // 4. Scroll steps vertically inside the video container frame without overflowing
    if (pchCardsTrack && pchCardsFrame) {
      processMasterTl.to(pchCardsTrack, {
        y: () => {
          const trackHeight = pchCardsTrack.offsetHeight;
          const frameHeight = pchCardsFrame.offsetHeight;
          return -(trackHeight - frameHeight + 40);
        },
        duration: 2.2,
        ease: "none",
      }, 1.3);
    }

    // 5. Video fades away at the end of the steps and transitions into the AI Search & AEO section
    processMasterTl
      .to(pchVideoWrap, {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        ease: "power2.inOut",
      }, 3.6)
      .fromTo(".aeo-services-section", {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 3.8)
      .fromTo(".aeo-feature-card", {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      }, 4.0)
      // Smoothly scroll the entire AEO services section upward so all cards can be fully read
      .to(".aeo-services-section", {
        y: () => {
          const aeoSec = document.querySelector(".aeo-services-section");
          if (!aeoSec) return -400;
          const aeoHeight = aeoSec.scrollHeight || aeoSec.offsetHeight;
          const overflow = aeoHeight - window.innerHeight;
          // Ensure on mobile and desktop every card and bottom CTA is scrolled into full view
          return overflow > 0 ? -(overflow + 100) : -40;
        },
        duration: 2.8,
        ease: "none",
      }, 4.6);
  }

  /* ---------------- WOW.JS INITIALIZATION (FOR FINAL CTA) ---------------- */
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 80,
      mobile: true,
      live: true,
    }).init();
  }



  /* ---------------- ROI & GROWTH DASHBOARD APEXCHARTS (Viewport Triggered) ---------------- */
  const growthSection = document.querySelector(".growth-showcase-section");
  if (growthSection && typeof ApexCharts !== "undefined") {
    let chartsRendered = false;

    const initGrowthCharts = () => {
      if (chartsRendered) return;
      chartsRendered = true;

      // 1. Leads Sparkline
      const leadsSparkEl = document.querySelector("#chart-sparkline-leads");
      if (leadsSparkEl) {
        new ApexCharts(leadsSparkEl, {
          series: [{ name: "Leads", data: [32, 45, 42, 60, 52, 75, 90] }],
          chart: {
            type: "area",
            height: 48,
            sparkline: { enabled: true },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 900,
              animateGradually: { enabled: true, delay: 150 }
            }
          },
          stroke: { curve: "smooth", width: 2 },
          colors: ["#1257A2"],
          fill: {
            type: "gradient",
            gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] }
          },
          tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
        }).render();
      }

      // 2. ROI Sparkline
      const roiSparkEl = document.querySelector("#chart-sparkline-roi");
      if (roiSparkEl) {
        new ApexCharts(roiSparkEl, {
          series: [{ name: "ROI %", data: [180, 240, 220, 310, 340, 390, 430] }],
          chart: {
            type: "area",
            height: 48,
            sparkline: { enabled: true },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1000,
              animateGradually: { enabled: true, delay: 200 }
            }
          },
          stroke: { curve: "smooth", width: 2 },
          colors: ["#10b981"],
          fill: {
            type: "gradient",
            gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] }
          },
          tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
        }).render();
      }

      // 3. Campaign Performance Main Chart
      const mainChartEl = document.querySelector("#chart-campaign-performance");
      if (mainChartEl) {
        new ApexCharts(mainChartEl, {
          series: [
            { name: "Clicks", data: [1200, 1900, 1600, 2800, 2200, 3400, 4100] },
            { name: "Leads", data: [620, 800, 780, 1080, 690, 1250, 1880] },
            { name: "Conversions", data: [210, 340, 390, 380, 320, 490, 950] }
          ],
          chart: {
            type: "area",
            height: 190,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: "inherit",
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1100,
              animateGradually: { enabled: true, delay: 180 },
              dynamicAnimation: { enabled: true, speed: 400 }
            }
          },
          colors: ["#1257A2", "#10b981", "#ff416c"],
          dataLabels: { enabled: false },
          stroke: { curve: "smooth", width: [1.5, 1.5, 1.5], dashArray: [0, 5, 0] },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.25,
              opacityTo: 0.02,
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            labels: { style: { colors: "#71717A", fontSize: "11px" } },
            axisBorder: { show: false },
            axisTicks: { show: false }
          },
          yaxis: { show: false },
          grid: {
            borderColor: "#E4E4E7",
            strokeDashArray: 3,
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            fontSize: "11px",
            fontWeight: 600,
            labels: { colors: "#52525B" },
            markers: { radius: 12 }
          },
          tooltip: {
            theme: "light",
            y: {
              formatter: function (val) {
                return val.toLocaleString();
              }
            }
          }
        }).render();
      }

      // 4. Traffic Growth Bar Chart
      const trafficBarEl = document.querySelector("#chart-traffic-growth");
      if (trafficBarEl) {
        new ApexCharts(trafficBarEl, {
          series: [{ name: "Traffic", data: [45, 62, 58, 79, 86, 95, 112] }],
          chart: {
            type: "bar",
            height: 110,
            toolbar: { show: false },
            sparkline: { enabled: true },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 950,
              animateGradually: { enabled: true, delay: 100 }
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: "45%",
              distributed: false
            }
          },
          colors: ["#1257A2"],
          tooltip: {
            theme: "light",
            y: {
              formatter: function (val) {
                return val + "k visits";
              }
            }
          }
        }).render();
      }
    };

    // Trigger chart animation exactly when scrolled into view
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initGrowthCharts();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(growthSection);
    } else {
      initGrowthCharts();
    }
  }
});