/***************************************************
==================== JS INDEX ======================
01. Data Background Set

****************************************************/

(function ($) {
  "use strict";

  /*-----------------------------------
           Set Background Image & Mask   
        -----------------------------------*/
  if (typeof $ !== "undefined") {
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }
  }

  if ($("[data-mask-src]").length > 0) {
    $("[data-mask-src]").each(function () {
      var mask = $(this).attr("data-mask-src");
      $(this).css({
        "mask-image": "url(" + mask + ")",
        "-webkit-mask-image": "url(" + mask + ")",
      });
      $(this).addClass("bg-mask");
      $(this).removeAttr("data-mask-src");
    });
  }

  // ==========================================
  //  Contact Modal & Search Overlay Toggles
  // ==========================================
  // Capture all clicks on elements with the contact drawer trigger class
  $(document).on('click', '.contact-drawer-trigger', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openContactModal();
  });

  // Close modal on overlay click or close button click
  $(document).on('click', '#closeContactModal, #customContactModal', function(e) {
    if (e.target === this || $(this).attr('id') === 'closeContactModal' || $(this).closest('#closeContactModal').length) {
      closeContactModal();
    }
  });

  // Open contact modal
  function openContactModal() {
    // Only work on screens >= 768px (desktop/tablet)
    if (window.innerWidth < 768) {
      return;
    }

    // Close mobile menu/drawer if open
    if ($('.ado-sideinfo').length) {
      $('.ado-sideinfo').removeClass('info-open');
      $('.offcanvas-overlay').removeClass('overlay-open');
    }
    
    $('#customContactModal').addClass('active');
    $('body').addClass('no-scroll');
    
    // Auto-focus first field
    setTimeout(function() {
      $('#modalName').focus();
    }, 350);
  }

  // Close contact modal
  function closeContactModal() {
    $('#customContactModal').removeClass('active');
    $('body').removeClass('no-scroll');
  }

  // Handle static form submit
  $(document).on('submit', '#modalContactForm', function(e) {
    e.preventDefault();
    alert('Thank you! Your request has been received. Our team will contact you shortly.');
    closeContactModal();
    this.reset();
  });

  // Capture all clicks on search toggle buttons
  $(document).on('click', '.search-toggle', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openSearchOverlay();
  });

  // Close search on backdrop or close button click
  $(document).on('click', '#closeSearchOverlay, #customSearchOverlay', function(e) {
    if (e.target === this || $(this).attr('id') === 'closeSearchOverlay' || $(this).closest('#closeSearchOverlay').length) {
      closeSearchOverlay();
    }
  });

  // Open search overlay
  function openSearchOverlay() {
    // Close mobile menu/drawer if open
    if ($('.ado-sideinfo').length) {
      $('.ado-sideinfo').removeClass('info-open');
      $('.offcanvas-overlay').removeClass('overlay-open');
    }

    $('#customSearchOverlay').addClass('active');
    $('body').addClass('no-scroll');

    // Auto-focus search field
    setTimeout(function() {
      $('#customSearchInput').focus();
    }, 350);
  }

  // Close search overlay
  function closeSearchOverlay() {
    $('#customSearchOverlay').removeClass('active');
    $('body').removeClass('no-scroll');
  }

  // Global keypress handlers
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      closeContactModal();
      closeSearchOverlay();
    }
  });

  // Wow js
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  //>> Brand Slider Start <<//
  const brandSlider = new Swiper(".brand-slider", {
    spaceBetween: 30,
    speed: 1300,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1199: {
        slidesPerView: 6,
      },
      991: {
        slidesPerView: 4,
      },
      767: {
        slidesPerView: 4,
      },
      575: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
  });

  //>> Blog Slider Start <<//
  const blogSlider = new Swiper(".blog-slider", {
    spaceBetween: 30,
    speed: 1300,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1199: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: ".blog-area4-wrapper-controls__arrowRight",
      prevEl: ".blog-area4-wrapper-controls__arrowLeft",
    },
  });

  // Testimonial Slider
  var swiper = new Swiper(".testimonial1-slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl:
        ".testimonial-area4__card-items-mentor-items-controls__arrowRight",
      prevEl: ".testimonial-area4__card-items-mentor-items-controls__arrowLeft",
    },
  });

  var swiper = new Swiper(".testimonial1-slider2", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });
// Testimonial Slider
var swiper = new Swiper(".testimonial4-slider", {
  loop: true,
  slidesPerView: 1.1,
  spaceBetween: 16,
  autoplay: false,
  navigation: {
    nextEl: ".testimonial-nav-next",
    prevEl: ".testimonial-nav-prev",
  },
  breakpoints: {
    // Tablets
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    // Laptops
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    }
  },
});
  const clientsSwiper = new Swiper(".clients-line7__slider", {
    loop: true,
    speed: 600,
    autoplay: { delay: 1800, disableOnInteraction: false },
    allowTouchMove: true,
    slidesPerView: 2.8, // mobile baseline
    spaceBetween: 32,
    breakpoints: {
      480: { slidesPerView: 4, spaceBetween: 40 },
      768: { slidesPerView: 6, spaceBetween: 56 },
      992: { slidesPerView: 8, spaceBetween: 64 },
      1200: { slidesPerView: 10, spaceBetween: 72 },
    },
  });

  // Masirul
  /* ---------------------------
    Price range input (DEFENSIVE)
    This was causing: Cannot read properties of null (reading 'addEventListener')
 ---------------------------- */
  (function initPriceRange() {
    var range = document.getElementById("priceRange");
    var output = document.getElementById("priceOutput");

    if (!range && !output) {
      // Neither exists — nothing to do
      return;
    }

    if (!range) {
      console.warn('priceRange input not found (expected id="priceRange").');
      return;
    }
    if (!output) {
      console.warn(
        'priceOutput element not found (expected id="priceOutput").'
      );
      return;
    }

    // Safe to attach listener
    range.addEventListener("input", function () {
      output.value = "Price: $0 — $" + range.value;
    });
  })();

  /* ---------------------------
     Quantity (DEFENSIVE)
  ---------------------------- */
  (function initQuantityControls() {
    var qtyInput = document.getElementById("quantity");
    var inc = document.getElementById("increase");
    var dec = document.getElementById("decrease");

    if (!qtyInput) {
      // Not an error: maybe cart markup isn't on this page
      // console.info('No #quantity input found on this page.');
      return;
    }

    // Ensure numeric default
    if (!qtyInput.value) qtyInput.value = "1";

    if (inc) {
      inc.addEventListener("click", function () {
        var v = parseInt(qtyInput.value || "0", 10) || 0;
        qtyInput.value = v + 1;
        qtyInput.dispatchEvent(new Event("input"));
      });
    } else {
      // optional: console.warn('Increase button (#increase) not found.');
    }

    if (dec) {
      dec.addEventListener("click", function () {
        var v = parseInt(qtyInput.value || "0", 10) || 0;
        if (v > 1) {
          qtyInput.value = v - 1;
          qtyInput.dispatchEvent(new Event("input"));
        }
      });
    }
  })();

  // Cart calculations (corrected & defensive)
  // Helper: format as currency
  // Change the currency symbol or locale formatting if you want (e.g. useIntl.NumberFormat).
  function money(n) {
    var num = Number(n || 0);
    if (isNaN(num)) num = 0;
    // returns e.g. $12.34 — change '$' to '৳' for BDT or use Intl.NumberFormat for localized output
    return "$" + num.toFixed(2);
  }

  var $cartBody = $(".cart-page__body");
  var $subtotalEl = $("#cart-subtotal");
  var $shippingEl = $("#cart-shipping");
  var $totalEl = $("#cart-total");
  var $updateBtn = $(".cart-page__update-btn");
  var $couponInput = $(".cart-page__coupon-input");
  var $couponBtn = $(".cart-page__coupon-btn");
  var $couponMsg = $(".cart-page__coupon-msg");
  var $checkoutBtn = $("#proceed-checkout");

  var SHIPPING = 8.0;
  var coupon = null;
  var appliedDiscount = 0;

  var COUPONS = {
    SAVE10: { type: "percent", value: 10 },
    FLAT5: { type: "flat", value: 5 },
  };


  function parseUnitPrice(raw) {
    // Accept numbers or strings like "12.34" or "1,234.56"
    if (raw === null || raw === undefined) return 0;
    var s = String(raw).replace(/,/g, "").trim();
    var v = parseFloat(s);
    return isNaN(v) ? 0 : v;
  }


  function recalcRow($row) {
    var unit = parseUnitPrice($row.data("unit-price"));
    var $qtyInput = $row.find(".cart-page__qty-input");
    var qty = parseInt($qtyInput.val(), 10);
    if (isNaN(qty) || qty < 1) {
      qty = 1;
      $qtyInput.val(1);
    }
    var total = unit * qty;
    var $totalCell = $row.find(".cart-page__total");
    if ($totalCell.length) $totalCell.text(money(total));
    return total;
  }

  function recalcAll() {
    if ($cartBody.length === 0) return;

    var subtotal = 0;
    $cartBody.find(".cart-page__item").each(function () {
      subtotal += recalcRow($(this));
    });

    appliedDiscount = 0;
    if (coupon) {
      if (coupon.type === "percent") {
        appliedDiscount = subtotal * (coupon.value / 100);
      } else if (coupon.type === "flat") {
        appliedDiscount = coupon.value;
      }
    }

    // Prevent discount from exceeding subtotal
    appliedDiscount = Math.min(appliedDiscount, subtotal);

    var subtotalAfter = Math.max(0, subtotal - appliedDiscount);
    var shipping = subtotalAfter > 0 ? SHIPPING : 0;
    var total = subtotalAfter + shipping;

    if ($subtotalEl.length) $subtotalEl.text(money(subtotalAfter));
    if ($shippingEl.length) $shippingEl.text(money(shipping));
    if ($totalEl.length) $totalEl.text(money(total));

    if ($couponMsg.length) {
      if (coupon && appliedDiscount > 0) {
        $couponMsg.text(
          'Coupon "' +
          coupon.code +
          '" applied: -' +
          money(appliedDiscount) +
          "."
        );
      } else if (coupon && appliedDiscount === 0) {
        // coupon was found but no discount (e.g., subtotal 0)
        $couponMsg.text(
          'Coupon "' + coupon.code + '" applied but discount is 0.'
        );
      } else {
        $couponMsg.text("");
      }
    }
  }

  // Event delegation for cart controls (robust if items added dynamically)
  if ($cartBody.length) {
    $cartBody.on("click", function (e) {
      var $t = $(e.target);

      // minus
      var $minus = $t.closest(".cart-page__qty-btn--minus");
      if ($minus.length) {
        var $row = $minus.closest(".cart-page__item");
        var $input = $row.find(".cart-page__qty-input");
        var v = parseInt($input.val() || "1", 10);
        $input.val(Math.max(1, v - 1)).trigger("input");
        recalcAll();
        return;
      }

      // plus
      var $plus = $t.closest(".cart-page__qty-btn--plus");
      if ($plus.length) {
        var $rowp = $plus.closest(".cart-page__item");
        var $inputp = $rowp.find(".cart-page__qty-input");
        var vp = parseInt($inputp.val() || "1", 10);
        $inputp.val(Math.max(1, vp + 1)).trigger("input");
        recalcAll();
        return;
      }

      // remove
      var $remove = $t.closest(".cart-page__remove");
      if ($remove.length) {
        var $rowr = $remove.closest(".cart-page__item");
        $rowr.remove();
        recalcAll();
        return;
      }
    });

    // typed qty
    $cartBody.on("input", ".cart-page__qty-input", function () {
      var $input = $(this);
      var val = $input.val();
      if (val === "") return;
      var n = parseInt(val, 10);
      if (isNaN(n) || n < 1) $input.val(1);
      recalcAll();
    });
  }

  // update cart button
  if ($updateBtn.length) {
    $updateBtn.on("click", function () {
      recalcAll();
      var $btn = $(this);
      var original = $btn.text();
      $btn.text("Updated");
      setTimeout(function () {
        $btn.text(original);
      }, 800);
    });
  }

  // coupon
  if ($couponBtn.length) {
    $couponBtn.on("click", function () {
      var code = ($couponInput.val() || "").trim().toUpperCase();
      if (!code) {
        if ($couponMsg.length) $couponMsg.text("Please enter a coupon code.");
        return;
      }
      if (COUPONS.hasOwnProperty(code)) {
        coupon = $.extend({ code: code }, COUPONS[code]);
        recalcAll();
      } else {
        coupon = null;
        if ($couponMsg.length) $couponMsg.text("Invalid coupon code.");
        recalcAll();
      }
    });
  }

  if ($checkoutBtn.length) {
    $checkoutBtn.on("click", function () {
      window.location.href = "/checkout";
    });
  }

  // initial calc (only if cart body exists)
  if ($cartBody.length) recalcAll();

  // =======================
  //  Testimonial Slider
  // =======================

  // Define hasSwiper BEFORE using it
  var hasSwiper = typeof Swiper !== "undefined";
  if (!hasSwiper) {
    console.warn(
      "Swiper is not loaded. Include swiper-bundle.min.js before main.js."
    );
  }

  // Testimonial slider (only init if both Swiper present and element exists)
  if (hasSwiper && document.querySelector(".testimonial-area8__active")) {
    try {
      new Swiper(".testimonial-area8__active", {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 12 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 2, spaceBetween: 24 },
        },
      });
    } catch (err) {
      console.error("Error initializing testimonial slider:", err);
    }
  }

  if (document.querySelector(".project-section-3__active")) {
    var swiper = new Swiper(".project-section-3__active", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: false,
      autoplay: true,
      centerMode: true,
      speed: 400,
      pagination: {
        el: ".project-section-3__pagination",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }

  if (document.querySelector(".project-section-3__active")) {
    var swiper = new Swiper(".project-section-3__active", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: false,
      autoplay: true,
      centerMode: true,
      speed: 400,
      pagination: {
        el: ".project-section-3__pagination",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }

  if (document.querySelector(".testimonial-section-3__active")) {
    var swiper = new Swiper(".testimonial-section-3__active", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: false,
      autoplay: true,
      centerMode: true,
      speed: 400,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }

  if (document.querySelector(".team-3__active")) {
    var swiper = new Swiper(".team-3__active", {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: true,
      centerMode: true,
      speed: 400,
      breakpoints: {
        320: {
          slidesPerView: 1,
          centeredSlides: false,
        },
        767: {
          slidesPerView: 1,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });
  }

  /* === testimonial-5__active (index 05) === */
  if ($(".testimonial-5__active").length > 0) {
    var design_showcase = new Swiper(".testimonial-5__active", {
      loop: true,
      speed: 2000,
      // autoplay: {
      //   delay: 2500,
      // },
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      navigation: {
        prevEl: ".testimonial-5__swiper-button-prev",
        nextEl: ".testimonial-5__swiper-button-next",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      },
    });
  }

  // odometer js
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Check if there are any odometer elements
    const odometers = document.querySelectorAll(".odometer");
    if (odometers.length > 0) {
      odometers.forEach((el) => {
        const count = el.getAttribute("data-count");

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%", // when element enters 90% viewport height
          once: true, // trigger only once
          onEnter: () => {
            el.innerHTML = count; // this change triggers odometer animation
          },
        });
      });
    }
  } else {
    console.warn(
      "GSAP or ScrollTrigger not found. Odometer animation skipped."
    );
  }

  // brand - section - 5
  if (document.querySelector(".brand-section-5__active")) {
    document.addEventListener("DOMContentLoaded", function () {
      const swiper = new Swiper(".brand-section-5__active", {
        slidesPerView: "6",
        spaceBetween: 20,
        centeredSlides: false,
        speed: 3500,
        loop: true,
        freeMode: false,
        allowTouchMove: false,
        autoplay: {
          delay: 1,
        },
        breakpoints: {
          320: {
            spaceBetween: 20,
            slidesPerView: "3",
          },
          576: {
            spaceBetween: 20,
            slidesPerView: "4",
          },
          767: {
            spaceBetween: 20,
            slidesPerView: "4",
          },
          992: {
            spaceBetween: 20,
          },
          1200: {
            spaceBetween: 20,
          },
        },
      });
    });
  }

  // accordion js
  document.querySelectorAll(".accordion-item").forEach((item) => {
    let number = item.querySelector(".accordion-number");
    let collapse = item.querySelector(".accordion-collapse");

    collapse.addEventListener("shown.bs.collapse", function () {
      number.style.display = "block";
    });

    collapse.addEventListener("hidden.bs.collapse", function () {
      number.style.display = "none";
    });
  });

  // Make sure GSAP and ScrollTrigger are loaded
  gsap.registerPlugin(ScrollTrigger);

  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  if (document.querySelector(".brand-slide__active")) {
    new Swiper(".brand-slide__active", {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 3000,
      loop: true,
      allowTouchMove: false,
      autoplay: { delay: 1 },
    });
  }

  if (document.querySelector(".footer-text-slide__active")) {
    new Swiper(".footer-text-slide__active", {
      slidesPerView: "auto",
      speed: 8000,
      loop: true,
      allowTouchMove: false,
      autoplay: { delay: 1 },
    });
  }

  if (document.querySelector(".text-slide__active")) {
    new Swiper(".text-slide__active", {
      slidesPerView: "auto",
      speed: 9000,
      loop: true,
      allowTouchMove: false,
      autoplay: { delay: 1 },
    });
  }

  //testimonial-4-active rana
  var testimonial_3_active = new Swiper(".hero-slider-active", {
    slidesPerView: 2,
    spaceBetween: 50,
    loop: true,
    autoplay: true,
    speed: 600,
    navigation: {
      nextEl: ".rr-button-next",
      prevEl: ".rr-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1400: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  });

  if (document.querySelectorAll(".milestone-2__active").length > 0) {
    var milestone_2_active = new Swiper(".milestone-2__active", {
      slidesPerView: 1.25,
      spaceBetween: 20,
      speed: 2000,
      loop: true,
      autoplay: true,
      speed: 600,
      watchSlidesProgress: true,
      navigation: {
        prevEl: ".milestone-2-prev",
        nextEl: ".milestone-2-next",
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1201: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // testimonial 3 active rana
  if (document.querySelectorAll(".expertise-2-active").length > 0) {
    var expertise_activee = new Swiper(".expertise-2-active", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 27,
      speed: 2000,
      autoplay: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1201: {
          slidesPerView: 3,
        },
        1367: {
          slidesPerView: 4,
        },
      },
    });
  }

  // blog-active Swiper
  if (document.querySelectorAll(".blog-active").length > 0) {
    var blog_active = new Swiper(".blog-active", {
      loop: true,
      slidesPerView: 1.2,
      spaceBetween: 16,
      speed: 800,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: "#blog-prev",
        nextEl: "#blog-next",
      },
      pagination: {
        el: ".blog__wrapper .swiper-pagination",
        type: "progressbar",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  // Team Horizontal Scroller Swiper
  if (document.querySelectorAll(".ado-hscroll-swiper").length > 0) {
    var adoHScrollSwiper = new Swiper(".ado-hscroll-swiper", {
      spaceBetween: 20,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        0: { slidesPerView: 1.2 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
        1400: { slidesPerView: 6 },
      },
    });

    adoHScrollSwiper.on("progress", function (s, progress) {
      var hint = document.getElementById("ado-hscroll-hint");
      if (hint) {
        hint.style.opacity = Math.max(0, 1 - progress * 4);
      }
    });
  }

  // Brands Mobile Swiper (<768px)
  if (document.querySelectorAll(".brands-mobile-swiper").length > 0) {
    const brandsMobileSwiper = new Swiper(".brands-mobile-swiper", {
      spaceBetween: 14,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 2.2 },
        480: { slidesPerView: 3.2 },
        576: { slidesPerView: 4.2 },
      },
    });
  }

  //>> Brand Slider Start <<//
  const brandSlider1 = new Swiper(".brand-slider", {
    spaceBetween: 30,
    speed: 1300,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1199: {
        slidesPerView: 6,
      },
      991: {
        slidesPerView: 4,
      },
      767: {
        slidesPerView: 4,
      },
      575: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
  });

  const brandSlider6 = new Swiper(".brand-slider6", {
    spaceBetween: 30,
    speed: 500,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1199: {
        slidesPerView: 7,
      },
      991: {
        slidesPerView: 5,
      },
      767: {
        slidesPerView: 4,
      },
      575: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
  });
  const brandSlider7 = new Swiper(".brand-slider7", {
    spaceBetween: 30,
    speed: 700,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      reverseDirection: true,
    },

    breakpoints: {
      1199: {
        slidesPerView: 7,
      },
      991: {
        slidesPerView: 5,
      },
      767: {
        slidesPerView: 4,
      },
      575: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
  });

  //>> Blog Slider Start <<//
  const blogSlider1 = new Swiper(".blog-slider", {
    spaceBetween: 30,
    speed: 1300,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1440: {
        slidesPerView: 2,
      },
      1199: {
        slidesPerView: 1,
      },
      991: {
        slidesPerView: 1,
      },
      767: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: ".blog-area4-wrapper-controls__arrowRight",
      prevEl: ".blog-area4-wrapper-controls__arrowLeft",
    },
  });

  // testimonials-section rana
  if ($(".pin-area-3").length > 0) {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      return gsap.to(".pin-element_3", {
        scrollTrigger: {
          trigger: ".pin-area-3",
          scrub: 1,
          start: "top top",
          end: "bottom bottom",
          pin: ".pin-element_3",
          pinSpacing: false,
          markers: false,
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }

  if ($(".Projects-area-10").length > 0) {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(".Projects-area-10", {
        opacity: 1,
        scrollTrigger: {
          trigger: ".Projects-area-10",
          start: "top top",
          end: "bottom 100%",
          scrub: 1,
          pin: ".Projects__content",
          pinSpacing: false,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(".recent-work-2__box", {
        scrollTrigger: {
          trigger: ".Projects-area-10",
          start: "top top",
          end: "bottom 100%",
          scrub: 1,
          pin: ".recent-work-2__box",
          pinSpacing: false,
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }

  if (document.querySelector(".Projects-area-10") && window.innerWidth > 768) {
    const projectArea = document.querySelector(".Projects-area-10");
    const steps = document.querySelectorAll(".Projects__content ul li");
    const stepCount = steps.length;

    const fill = document.querySelector(".Projects-area-10__fill");
    const current = document.getElementById("Projects-area-10__current");
    const total = document.getElementById("Projects-area-10__total");

    if (total) total.textContent = String(stepCount).padStart(2, "0");

    ScrollTrigger.create({
      trigger: projectArea,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: ({ progress }) => {
        const step = Math.min(
          stepCount,
          Math.max(1, Math.floor(progress * (stepCount - 1)) + 1)
        );
        const width = (step / stepCount) * 100;

        if (fill) fill.style.width = `${width}%`;
        if (current) current.textContent = String(step).padStart(2, "0");

        steps.forEach((li, index) => {
          li.classList.toggle("active", index + 1 === step);
        });
      },
    });
  }



  // Img zoom
  // Guard: run only if gsap + ScrollTrigger are loaded
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not found. Animation skipped.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const zoomThumb = document.querySelector(".zoom-thumb");
  const zoomPin = document.querySelector(".zoom-pin");

  if (!zoomThumb) return;

  if (!zoomPin) {
    console.warn(
      "Element '.zoom-pin' not found. ScrollTrigger will still be created but the trigger selector might be incorrect."
    );
    // optional: return; // uncomment to bail out if zoom-pin is required
  }

  // Responsive ScrollTrigger animations (mutually exclusive ranges)
  ScrollTrigger.matchMedia({
    // 1921px and up
    "(min-width: 1921px)": function () {
      gsap.to(zoomThumb, {
        scrollTrigger: {
          trigger: ".zoom-pin",
          start: "top 70%",
          end: "bottom -20%",
          scrub: true,
          // markers: true, // enable while tuning
        },
        x: "-90%",
        y: "100%",
        scale: 6,
        width: "3840px",
        height: "220px",
        borderRadius: "0px",
        paddingLeft: "0px",
        ease: "power1.out",
      });
    },

    // Between 1396px and 1920px (inclusive)
    "(min-width: 1396px) and (max-width: 1920px)": function () {
      gsap.to(zoomThumb, {
        scrollTrigger: {
          trigger: ".zoom-pin",
          start: "top 70%",
          end: "bottom -10%",
          scrub: true,
          // markers: true,
        },
        x: "-110%",
        y: "305%",
        scale: 4,
        width: "1920px",
        height: "205px",
        borderRadius: "0px",
        paddingLeft: "0px",
        ease: "power1.out",
      });
    },

    // 1395px and below — disable animation / reset styles
    "(max-width: 1439px)": function () {
      // Remove any GSAP-applied inline styles so element falls back to CSS
      gsap.set(zoomThumb, { clearProps: "all" });
      // If you want to do a small fallback animation instead of disabling, add it here
    },
  });

  // Centralized Swiper Progressbar Slider
  function initSwiperProgressbar() {
    var swiperEl = document.querySelector(".swiper-progressbar");
    if (typeof Swiper !== "undefined" && swiperEl && !swiperEl.swiper) {
      new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: swiperEl.querySelector('.next-2') || '.swiper-progressbar .next-2',
          prevEl: swiperEl.querySelector('.prev-2') || '.swiper-progressbar .prev-2',
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 30
          }
        }
      });
    }
  }

  $(function() {
    initSwiperProgressbar();
  });
  $(window).on('load', function () {
    initSwiperProgressbar();
  });

  // FAQ accordion toggle using event delegation
  $(document).on('click', '.ado-faq-trigger', function () {
    var $trigger = $(this);
    var $item = $trigger.closest('.ado-faq-item');
    $item.toggleClass('active');
    var $icon = $trigger.find('.ado-faq-icon');
    if ($icon.length) {
      $icon.text($item.hasClass('active') ? '\u2212' : '+');
    }
  });

  // Service Accordion Toggle (Pure JS/jQuery, no GSAP dependency)
  $(document).on('click', '#dynamic-project-grid .project-area7__card-header', function () {
    var $card = $(this).closest('.project-area7__card');
    var $body = $card.find('.project-area7__card-body');
    var $icon = $(this).find('.accordion-toggle-btn i');
    var $section = $(this).closest('.category-section');

    if ($card.hasClass('active')) {
      $card.removeClass('active');
      $body.css('max-height', '0px');
      $icon.removeClass('fa-xmark').addClass('fa-plus');
    } else {
      // Close sibling cards in the same category section
      $section.find('.project-area7__card.active').each(function() {
        $(this).removeClass('active');
        $(this).find('.project-area7__card-body').css('max-height', '0px');
        $(this).find('.accordion-toggle-btn i').removeClass('fa-xmark').addClass('fa-plus');
      });

      $card.addClass('active');
      $body.css('max-height', $body[0].scrollHeight + 'px');
      $icon.removeClass('fa-plus').addClass('fa-xmark');
    }
  });

  // Sticky FAQ Form Card logic using GSAP ScrollTrigger
  $(function () {
    function initFaqStickyForm() {
      var section   = document.querySelector('.ado-faq-section');
      var formCol   = document.querySelector('#faq-accordion')?.closest('.grc')?.querySelector('.grc-4');
      var faqCol    = document.querySelector('#faq-accordion');

      if (!formCol || !faqCol || !section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      // Remove any CSS sticky so GSAP owns the pinning
      formCol.classList.remove('pst');
      formCol.style.position = '';
      formCol.style.top      = '';

      // Give the form col an id for easy targeting
      formCol.id = 'faq-form-col';

      // Pin the form for the entire section — from when FAQ enters view
      // until the very bottom of the .ado-faq-section leaves the viewport
      ScrollTrigger.create({
        trigger       : faqCol,
        endTrigger    : section,          // end is governed by the full section
        start         : 'top 120px',      // pin starts when FAQ top is 120px from top
        end           : 'bottom bottom',  // release only when section bottom hits viewport bottom
        pin           : formCol,
        pinSpacing    : false,
        anticipatePin : 1,
        invalidateOnRefresh: true,
      });
    }

    initFaqStickyForm();
  });

  // Mobile-only Brands Swiper (< 768px)
  $(function () {
    var brandSwiperInstances = [];

    function checkBrandsSwiper() {
      var isMobile = window.innerWidth < 768;
      var $containers = $('.brands-grid-container');

      if ($containers.length === 0 || typeof Swiper === 'undefined') return;

      if (isMobile) {
        $containers.each(function (index, el) {
          var $el = $(el);
          if (!$el.hasClass('swiper-initialized')) {
            $el.addClass('swiper');
            
            // Wrap direct .brand-card in .swiper-wrapper and .swiper-slide if not already done
            if ($el.find('> .swiper-wrapper').length === 0) {
              var $cards = $el.children('.brand-card');
              $cards.wrapAll('<div class="swiper-wrapper"></div>');
              $el.find('.brand-card').wrap('<div class="swiper-slide"></div>');
              $el.append('<div class="swiper-pagination"></div>');
            }

            var swiper = new Swiper(el, {
              slidesPerView: 2.2,
              spaceBetween: 12,
              loop: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                el: $el.find('.swiper-pagination')[0],
                clickable: true,
              },
              breakpoints: {
                480: {
                  slidesPerView: 3.2,
                  spaceBetween: 15,
                }
              }
            });
            brandSwiperInstances.push(swiper);
          }
        });
      } else {
        // Desktop / Tablet (>= 768px): Destroy swipers if initialized
        brandSwiperInstances.forEach(function (sw) {
          if (sw && typeof sw.destroy === 'function') {
            sw.destroy(true, true);
          }
        });
        brandSwiperInstances = [];
        
        $containers.each(function (index, el) {
          var $el = $(el);
          $el.removeClass('swiper swiper-initialized swiper-horizontal');
          if ($el.find('> .swiper-wrapper').length > 0) {
            var $cards = $el.find('.brand-card');
            $el.find('.swiper-wrapper').replaceWith($cards);
            $el.find('.swiper-pagination').remove();
          }
        });
      }
    }

    checkBrandsSwiper();
    var resizeTimer;
    $(window).on('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkBrandsSwiper, 150);
    });
  });
  // ============================================================
  // Career Page — Job Table Accordion  (#jobTableBody)
  // ============================================================
  $(document).ready(function () {

    var $tbody = $('#jobTableBody');
    if (!$tbody.length) return;

    // ── 1. EXPAND / COLLAPSE a job-row ───────────────────────
    $tbody.on('click', '.job-row', function (e) {

      var $row     = $(this);
      var $detail  = $($row.data('target'));   // the detail <tr>
      var $content = $detail.find('.detail-content');

      if ($row.hasClass('expanded')) {
        /* --- Collapse this row --- */
        $row.removeClass('expanded');
        $content.stop(true, true).slideUp(300, function () {
          $detail[0].style.display = 'none';
        });

      } else {
        /* --- Close any currently open row first --- */
        $tbody.find('.job-row.expanded').each(function () {
          var $openRow    = $(this);
          var $openDetail = $($openRow.data('target'));
          $openRow.removeClass('expanded');
          $openDetail.find('.detail-content').stop(true, true).slideUp(250, function () {
            $openDetail[0].style.display = 'none';
          });
        });

        /* --- Open this row --- */
        $row.addClass('expanded');
        $detail[0].style.display = 'table-row';   // must be table-row, NOT block
        $content.hide().slideDown(350);
      }
    });

    // ── 2. "Apply Now" button → toggle its parent job-row ────
    $tbody.on('click', '.btn-details', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).closest('.job-row').trigger('click');
    });

    // ── 3. "Proceed to Form" → scroll to application section ─
    $tbody.on('click', '.btn-apply-now', function (e) {
      e.stopPropagation();
      var title = $(this).data('title');
      if (title) {
        var $sel = $('#selectJobTitle');
        if ($sel.length) {
          $sel.val(title);
          if ($.fn.niceSelect) $sel.niceSelect('update');
        }
      }
      var $form = $('#applicationFormSection');
      if ($form.length) {
        $('html, body').animate({ scrollTop: $form.offset().top - 120 }, 800);
      }
    });

  }); // end document.ready — Job Accordion



  // ==========================================
  //  Dynamic .about-us-spacing padding-top
  //  = header height + 30px
  // ==========================================
  function updateAboutUsSpacing() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var headerHeight = header.getBoundingClientRect().height;
    if (headerHeight <= 0) return; // layout not ready yet, skip
    var paddingTop = headerHeight + 30;
    document.querySelectorAll('.about-us-spacing').forEach(function (el) {
      el.style.paddingTop = paddingTop + 'px';
    });
  }

  // Retry until the header has a real painted height
  function applyAboutUsSpacingWhenReady() {
    var header = document.querySelector('.site-header');
    if (header && header.getBoundingClientRect().height > 0) {
      updateAboutUsSpacing();
    } else {
      requestAnimationFrame(applyAboutUsSpacingWhenReady);
    }
  }

  // Start as soon as DOM is parsed
  document.addEventListener('DOMContentLoaded', applyAboutUsSpacingWhenReady);

  // Also fire on full load to catch any late layout shifts
  window.addEventListener('load', updateAboutUsSpacing);

  // Update on resize (debounced)
  var _aboutUsResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(_aboutUsResizeTimer);
    _aboutUsResizeTimer = setTimeout(updateAboutUsSpacing, 100);
  });

})(jQuery);

