/**
 * Universal Pexels Image Loader
 * ─────────────────────────────
 * Drop this once on any page. It auto-loads images for every element
 * that carries the  data-pexels  or  data-target  attribute.
 *
 * Usage (HTML):
 *   <img  data-pexels="CTV advertising"  />
 *   <img  data-target="startup office"  data-target-quality="high" />
 *   <div  data-pexels="dark abstract background"  data-pexels-mode="bg" />
 *   <img  data-pexels="portrait business person"  data-pexels-random />
 *
 * Attributes:
 *   data-pexels / data-target          {string}   Search query  (required)
 *   data-pexels-mode                   {string}   "img" (default) | "bg"  – inject as <img> src or CSS background-image
 *   data-pexels-random                 {boolean}  Present = pick a random result from the first 15 photos
 *   data-pexels-size / data-target-size {string}   Pexels photo size key: original | large | large2x | medium | small | portrait | landscape | tiny
 *   data-pexels-quality /              {string}   "high" (DPR 2x) | "full" (DPR 3x) – requests higher resolution image from CDN
 *   data-target-quality
 *
 * Config (override before the script runs, or edit below):
 *   window.PEXELS_KEY    = 'your_api_key';
 *   window.PEXELS_FALLBACK = 'path/to/fallback.jpg';
 */

(function () {
  'use strict';

  // Inject skeleton animation style
  (function injectSkeletonCSS() {
    var style = document.createElement('style');
    style.id = 'pexels-skeleton-css';
    style.innerHTML = `
      @keyframes pexels-shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .pexels-skeleton {
        position: relative !important;
        background: linear-gradient(90deg, #f3f4f6 25%, #ffffff 50%, #f3f4f6 75%) !important;
        background-size: 200% 100% !important;
        animation: pexels-shimmer 1.6s infinite linear !important;
      }
      .pexels-skeleton > * {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    if (document.head) {
      document.head.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.head.appendChild(style);
      });
    }
  })();

  /* ── CONFIG ─────────────────────────────────────────────── */
  var API_KEY = window.PEXELS_KEY || 'y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi';
  var FALLBACK = window.PEXELS_FALLBACK || 'assets/images/service/services-card/service_0001.jpg';
  var DB_NAME = 'PexelsCache';
  var DB_VER = 1;
  var STORE = 'blobs';
  var ATTR = 'data-pexels';
  var LOADED = 'data-pexels-done';

  /* ── INDEXEDDB CACHE ─────────────────────────────────────── */
  var _db = null;

  function openDB() {
    return new Promise(function (resolve) {
      if (_db) { resolve(_db); return; }
      if (!window.indexedDB) { resolve(null); return; }
      var req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function (e) {
        e.target.result.createObjectStore(STORE);
      };
      req.onsuccess = function (e) { _db = e.target.result; resolve(_db); };
      req.onerror   = function ()  { resolve(null); };
    });
  }

  function cacheGet(key) {
    return openDB().then(function (db) {
      if (!db) return null;
      return new Promise(function (resolve) {
        var tx  = db.transaction(STORE, 'readonly');
        var req = tx.objectStore(STORE).get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror   = function () { resolve(null); };
      });
    });
  }

  function cacheSet(key, blob) {
    return openDB().then(function (db) {
      if (!db) return;
      var tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(blob, key);
    });
  }

  function blobUrl(blob) {
    try { return URL.createObjectURL(blob); } catch (e) { return null; }
  }

  /* ── ADJUST URL QUALITY ───────────────────────────────────── */
  function adjustUrlQuality(url, quality, srcs, size) {
    if (!url) return url;
    if (quality !== 'full' && quality !== 'high') return url;

    var dprVal = (quality === 'full') ? '3' : '2';

    // Upgrade base resolution for non-cropped sizes if we want full/high quality
    if (srcs && size !== 'portrait' && size !== 'landscape' && size !== 'tiny') {
      if (quality === 'full') {
        url = srcs.large2x || srcs.original || url;
      } else if (quality === 'high') {
        url = srcs.large || url;
      }
    }

    if (url.indexOf('?') !== -1) {
      // Set or update the device pixel ratio parameter
      if (url.indexOf('dpr=') !== -1) {
        url = url.replace(/dpr=[^&]*/, 'dpr=' + dprVal);
      } else {
        url = url + '&dpr=' + dprVal;
      }
      // Scale up height and width parameters to double/triple the quality
      url = url.replace(/w=(\d+)/g, function(match, w) {
        return 'w=' + (parseInt(w, 10) * parseInt(dprVal, 10));
      });
      url = url.replace(/h=(\d+)/g, function(match, h) {
        return 'h=' + (parseInt(h, 10) * parseInt(dprVal, 10));
      });
    } else {
      url = url + '?auto=compress&cs=tinysrgb&dpr=' + dprVal;
    }
    return url;
  }

  /* ── FETCH ONE IMAGE ─────────────────────────────────────── */
  function fetchImage(query, randomize, size, quality) {
    var cacheKey = 'pexels|' + query + '|' + (randomize ? '1' : '0') + '|' + (size || 'large') + '|' + (quality || '');

    return cacheGet(cacheKey).then(function (blob) {
      if (blob) return blobUrl(blob) || FALLBACK;

      var perPage = randomize ? 15 : 1;
      var apiUrl  = 'https://api.pexels.com/v1/search?query='
                  + encodeURIComponent(query)
                  + '&per_page=' + perPage;

      return fetch(apiUrl, { headers: { Authorization: API_KEY } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.photos || !data.photos.length) return FALLBACK;
          var photo = randomize
            ? data.photos[Math.floor(Math.random() * data.photos.length)]
            : data.photos[0];
          
          var imageUrl = photo.src[size || 'large'] || photo.src.large;

          if (quality) {
            imageUrl = adjustUrlQuality(imageUrl, quality, photo.src, size);
          }

          return fetch(imageUrl)
            .then(function (r) { return r.blob(); })
            .then(function (blob) {
              cacheSet(cacheKey, blob);
              return blobUrl(blob) || imageUrl;
            })
            .catch(function () { return imageUrl; });
        })
        .catch(function () { return FALLBACK; });
    });
  }

  /* ── APPLY TO ONE ELEMENT ────────────────────────────────── */
  function applyElement(el) {
    if (el.hasAttribute(LOADED)) return;
    el.setAttribute(LOADED, 'pending');
    el.classList.add('pexels-skeleton');

    var mode     = el.getAttribute('data-pexels-mode')   || (el.tagName === 'IMG' ? 'img' : 'bg');

    // Clear existing background image or src so the skeleton is visible during fetch
    if (mode === 'bg') {
      el.style.backgroundImage = 'none';
    } else {
      el.src = '';
    }

    var query    = el.getAttribute('data-target') || el.getAttribute('data-pexels') || el.getAttribute('data-pexels-query') || el.getAttribute(ATTR);
    if (!query)  { 
      el.classList.remove('pexels-skeleton');
      el.setAttribute(LOADED, 'skip'); 
      return; 
    }

    var randomize = el.hasAttribute('data-pexels-random') || el.hasAttribute('data-target-random') || el.hasAttribute('data-pexels-query-random');
    var size     = el.getAttribute('data-pexels-size')   || el.getAttribute('data-target-size')   || 'large';
    var quality  = el.getAttribute('data-pexels-quality')|| el.getAttribute('data-target-quality')|| '';

    fetchImage(query, randomize, size, quality).then(function (url) {
      el.classList.remove('pexels-skeleton');
      if (!url) { el.setAttribute(LOADED, 'fallback'); return; }

      if (mode === 'bg') {
        el.style.backgroundImage    = 'url(' + url + ')';
        el.style.backgroundSize     = el.style.backgroundSize     || 'cover';
        el.style.backgroundPosition = el.style.backgroundPosition || 'center';
      } else {
        el.src = url;
      }
      el.setAttribute(LOADED, 'done');
    });
  }

  /* ── SCAN THE PAGE ───────────────────────────────────────── */
  function scan(root) {
    var rootEl = root || document;
    var selectors = [
      'img[data-target]:not([' + LOADED + '])',
      '[data-pexels]:not([' + LOADED + '])',
      '[data-pexels-query]:not([' + LOADED + '])',
      '[data-pexels-mode][data-target]:not([' + LOADED + '])'
    ];
    var els = Array.prototype.slice.call(rootEl.querySelectorAll(selectors.join(',')));
    
    // Scan for any service_0001.jpg fallback image elements and tag them
    var fallbacks = rootEl.querySelectorAll('img[src*="service_0001.jpg"]:not([' + LOADED + '])');
    Array.prototype.forEach.call(fallbacks, function (el) {
      if (!el.hasAttribute('data-pexels') && !el.hasAttribute('data-target') && !el.hasAttribute('data-pexels-query')) {
        var query = el.getAttribute('alt') || 'digital advertising technology';
        if (query === 'image') query = 'digital advertising technology';
        el.setAttribute('data-target', query);
        els.push(el);
      }
    });

    Array.prototype.forEach.call(els, applyElement);
  }

  /* ── MUTATION OBSERVER (handles dynamic/ajax content) ──── */
  function observe() {
    if (!window.MutationObserver) return;
    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.hasAttribute && node.hasAttribute(ATTR)) applyElement(node);
          scan(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ── BOOT ────────────────────────────────────────────────── */
  function init() {
    scan();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── PUBLIC API (optional programmatic use) ─────────────── */
  window.PexelsLoader = {
    /**
     * Manually trigger a scan – call after injecting new HTML.
     * @param {Element} [root]  – subtree to scan (defaults to document)
     */
    scan: scan,

    /**
     * Fetch a single image URL imperatively.
     * @param {string} Query
     * @param {boolean} [randomize=false]
     * @param {string}  [size='large']
     * @param {string}  [quality='']
     * @returns {Promise<string>}
     */
    fetch: fetchImage
  };

}());
(function () {

  /* Card size + rotation class cycling patterns */
  var SIZES = ['ado-hs-card--lg', 'ado-hs-card--sm', 'ado-hs-card--xl', 'ado-hs-card--md', 'ado-hs-card--lg', 'ado-hs-card--md', 'ado-hs-card--sm', 'ado-hs-card--xl', 'ado-hs-card--md', 'ado-hs-card--lg', 'ado-hs-card--sm', 'ado-hs-card--md'];
  var ROTS = ['ado-hs-card--r1', 'ado-hs-card--r2', 'ado-hs-card--r3', 'ado-hs-card--r4', 'ado-hs-card--r5', 'ado-hs-card--r6'];

  var FALLBACK = 'assets/images/inner/team/team-thumb1_2.jpg';

  var LABELS = (typeof ADOMANTRA_TEAM !== 'undefined' && ADOMANTRA_TEAM.length)
    ? ADOMANTRA_TEAM
    : [
      { name: 'Rahul Sharma', role: 'Performance Marketing' },
      { name: 'Priya Nair', role: 'Creative Director' },
      { name: 'Amit Verma', role: 'SEO Strategist' },
      { name: 'Sneha Kapoor', role: 'Programmatic Manager' },
      { name: 'Karan Mehta', role: 'Data Analytics Lead' },
      { name: 'Ananya Singh', role: 'Social Media Manager' },
      { name: 'Vikram Joshi', role: 'PPC Specialist' },
      { name: 'Divya Rajan', role: 'Email & CRM Lead' },
      { name: 'Rohan Gupta', role: 'CTV Ad Manager' },
      { name: 'Meera Pillai', role: 'Brand Strategy' },
      { name: 'Arjun Khanna', role: 'Local SEO Expert' },
      { name: 'Pooja Sharma', role: 'Content Manager' }
    ];

  var QUERIES = [
    'digital marketing team collaboration',
    'creative agency brainstorming meeting',
    'data analytics marketing dashboard',
    'programmatic advertising office team',
    'social media strategy planning session',
    'performance marketing workspace modern',
    'branding agency creative discussion',
    'SEO strategy planning team meeting',
    'advertising agency office environment',
    'digital media buying professionals working',
    'content strategy brainstorming session',
    'modern marketing team collaboration'
  ];

  function buildCard(label, idx, isSwiper) {

    var sizeClass = SIZES[idx % SIZES.length];
    var rotClass = ROTS[idx % ROTS.length];

    var card = document.createElement('div');
    card.className = (isSwiper ? 'swiper-slide ' : '') + 'ado-hs-card ' + sizeClass + ' ' + rotClass;
    card.style.animationDelay = (idx * 0.06) + 's';

    var img = document.createElement('img');

    img.className = 'ado-hs-card__img';

    /* IMPORTANT:
       We ONLY set data-pexels → your universal loader handles everything */
    img.setAttribute('data-pexels', QUERIES[idx % QUERIES.length]);
    img.setAttribute('data-pexels-random', '');

    /* fallback until loader replaces it */
    img.src = FALLBACK;

    img.alt = label.name || 'Adomantra Team';
    img.loading = 'lazy';

    card.appendChild(img);

    /* Premium Overlay: Name and Role */
    var overlay = document.createElement('div');
    overlay.className = 'ado-hs-card__overlay';

    var role = document.createElement('p');
    role.className = 'ado-hs-card__role';
    role.textContent = label.role || '';

    var name = document.createElement('h4');
    name.className = 'ado-hs-card__name';
    name.textContent = label.name || '';

    overlay.appendChild(role);
    overlay.appendChild(name);
    card.appendChild(overlay);

    return card;
  }

  function initGSAP(track) {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(function () { initGSAP(track); }, 800);
      return;
    }

    var section = document.getElementById('ado-hscroll-section');
    var dist = track.scrollWidth - window.innerWidth;
    if (dist <= 0) return;

    gsap.to(track, {
      x: -dist,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 10%',
        end: '+=' + Math.round(dist * 0.9),
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var hint = document.getElementById('ado-hscroll-hint');
          if (hint) hint.style.opacity = Math.max(0, 1 - self.progress * 4);
        }
      }
    });
  }

function initSwiperScroll() {
  if (typeof Swiper === 'undefined') {
    setTimeout(initSwiperScroll, 200);
    return;
  }

  if (window.adoHScrollSwiper) {
    window.adoHScrollSwiper.destroy(true, true);
  }

  window.adoHScrollSwiper = new Swiper('.ado-hscroll-swiper', {
    spaceBetween: 20,
    grabCursor: true,

    mousewheel: {
      forceToAxis: true,
    },

    pagination: {
      el: '.hscroll-pagination',
      clickable: true,
    },

    breakpoints: {
      // Mobile
      0: {
        slidesPerView: 1.2,
      },
      // Small tablets
      576: {
        slidesPerView: 2,
      },
      // Tablets
      768: {
        slidesPerView: 3,
      },
      // Small laptops
      992: {
        slidesPerView: 4,
      },
      // Desktops
      1200: {
        slidesPerView: 5,
      },
      // Large screens (>1400px)
      1400: {
        slidesPerView: 6,
      }
    }
  });

  window.adoHScrollSwiper.on('progress', function (s, progress) {
    var hint = document.getElementById('ado-hscroll-hint');
    if (hint) {
      hint.style.opacity = Math.max(0, 1 - progress * 4);
    }
  });
}

  function init() {

    var track = document.getElementById('ado-hscroll-track');
    if (!track) return;

    var section = document.getElementById('ado-hscroll-section');
    var isSwiper = section && section.classList.contains('is-swiper');

    track.innerHTML = '';

    var total = Math.max(LABELS.length, 12);

    for (var i = 0; i < total; i++) {
      track.appendChild(buildCard(LABELS[i % LABELS.length], i, isSwiper));
    }

    requestAnimationFrame(function () {
      if (isSwiper) {
        initSwiperScroll();
      } else {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        initGSAP(track);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

async function initIndexBlog() {
  var wrapper = document.getElementById('index-blog-swiper-wrapper');
  if (!wrapper) return;

  /* ── Helpers ─────────────────────────────────────────────── */
  function formatDate(iso) {
    if (!iso) return '';
    try {
      var d = new Date(iso);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return ''; }
  }

  function buildSlide(article, imgSrc, index) {
    var W = 406, H = 592;
    var externalHref = article.url || '#';
    var detailHref   = 'blog-details.html?id=' + (article.id || (index + 1));
    var excerpt      = (article.content && article.content.introduction)
      ? article.content.introduction.substring(0, 120) + '...'
      : (article.seo && article.seo.description ? article.seo.description.substring(0, 120) + '...' : '');
    var pubDate = formatDate(article.publishedAtRaw || '') || (article.year ? String(article.year) : '');

    var badgeText = '';
    if (article.seo && article.seo.tags && article.seo.tags.length > 0) {
      badgeText = article.seo.tags[0];
    } else if (article.category) {
      badgeText = article.category;
    }
    var badgeHTML = badgeText ? '<span class="blog__media-badge">' + badgeText + '</span>' : '';

    return '<div class="swiper-slide">' +
      '<div class="blog__item">' +
      '<div class="blog__media w-100 ovh">' +
      badgeHTML +
      '<a href="' + externalHref + '" target="_blank" rel="noopener">' +
      '<img data-speed="0.9" src="' + imgSrc + '" alt="' + article.title.replace(/"/g, '&quot;') + '" ' +
      'width="' + W + '" height="' + H + '" loading="lazy" style="width:' + W + 'px;min-width:' + W + 'px;max-width:' + W + 'px;height:' + H + 'px;min-height:' + H + 'px;max-height:' + H + 'px;object-fit:cover;">' +
      '</a>' +
      '</div>' +
      '<div class="blog__content">' +
      '<div class="blog__top">' +
      '<span>' + pubDate + '</span>' +
      '<h2 class="title"><a href="' + externalHref + '" target="_blank" rel="noopener">' + article.title + '</a></h2>' +
      (excerpt ? '<p class="decs">' + excerpt + '</p>' : '') +
      '</div>' +
      '<div class="blog__bottom">' +
      '<a href="' + detailHref + '">Read the Full Article</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }


  /* ── Load news data ──────────────────────────────────────── */
  var newsData;
  try {
    newsData = await fetchAdomantraNews();
  } catch (e) {
    console.warn('[IndexBlog] fetchAdomantraNews failed:', e);
    return;
  }

  var blogs = (newsData && newsData.blogs) ? newsData.blogs.slice(0, 8) : [];
  if (!blogs.length) return;

  /* ── Fetch portrait thumbnails via PexelsLoader.fetch() ── */
  var thumbs = await Promise.all(
    blogs.map(function (article) {
      var query = article.title.split(' ').slice(0, 4).join(' ') + ' blog article';
      return PexelsLoader.fetch(query, true, 'portrait');
    })
  );

  /* ── Inject slides ───────────────────────────────────────── */
  wrapper.innerHTML = blogs.map(function (article, i) {
    return buildSlide(article, thumbs[i], i);
  }).join('');

  /* ── Refresh / init Swiper ───────────────────────────────── */
  if (!window.Swiper) return;

  var swiperEl = document.getElementById('index-blog-swiper');
  if (swiperEl && swiperEl.swiper) {
    swiperEl.swiper.update();
  } else {
    new Swiper('#index-blog-swiper', {
      slidesPerView: 1,
      spaceBetween:  30,
      loop:          true,
      pagination: {
        el:        '.blog .swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768:  { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }
}