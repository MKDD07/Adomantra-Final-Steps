/**
 * industries-list.js — Dynamically renders industries cards with filters and pagination
 * Replicates the exact style and behavior of blog.js but for industries.html.
 */

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.blog-section-5__wrap');
  if (!grid) return;

  const ITEMS_PER_PAGE = 6;
  let currentCategory = 'All';
  let currentPage = 1;

  const allIndustries = [
    {
      title: "Hospitals & Healthcare",
      slug: "healthcare",
      category: "Healthcare",
      imageQuery: "modern hospital doctors medical center",
      date: "2026",
      tagline: "Patient Growth",
      url: "industries-details.html?industry=healthcare"
    },
    {
      title: "Automobile",
      slug: "automobile",
      category: "Automotive",
      imageQuery: "modern sports car showroom",
      date: "2026",
      tagline: "Lead Flow",
      url: "industries-details.html?industry=automobile"
    },
    {
      title: "Real Estate",
      slug: "real-estate",
      category: "Real Estate",
      imageQuery: "luxury apartment building property",
      date: "2026",
      tagline: "Property Leads",
      url: "industries-details.html?industry=real-estate"
    },
    {
      title: "Travel & Hospitality",
      slug: "travel-hospitality",
      category: "Hospitality",
      imageQuery: "beach resort hotel vacation",
      date: "2026",
      tagline: "Direct Booking",
      url: "industries-details.html?industry=travel-hospitality"
    },
    {
      title: "FMCG & FMCD",
      slug: "fmcg-fmcd",
      category: "FMCG",
      imageQuery: "supermarket grocery shopping basket",
      date: "2026",
      tagline: "Branding",
      url: "industries-details.html?industry=fmcg-fmcd"
    },
    {
      title: "Education",
      slug: "education",
      category: "Education",
      imageQuery: "university college campus students classroom",
      date: "2026",
      tagline: "Student Enrollment",
      url: "industries-details.html?industry=education"
    },
    {
      title: "E-Commerce",
      slug: "ecommerce",
      category: "E-Commerce",
      imageQuery: "online shopping e-commerce delivery box package",
      date: "2026",
      tagline: "ROAS Growth",
      url: "industries-details.html?industry=ecommerce"
    },
    {
      title: "Banking & Financial Services",
      slug: "banking-service",
      category: "Finance",
      imageQuery: "modern bank interior office advisor",
      date: "2026",
      tagline: "Acquisition",
      url: "industries-details.html?industry=banking-service"
    },
    {
      title: "Information Technology",
      slug: "information-technology",
      category: "Technology",
      imageQuery: "datacenter servers software developers code",
      date: "2026",
      tagline: "B2B Leads",
      url: "industries-details.html?industry=information-technology"
    },
    {
      title: "Security Services",
      slug: "security-service",
      category: "Services",
      imageQuery: "security guard officer home safety monitoring",
      date: "2026",
      tagline: "Asset Protection",
      url: "industries-details.html?industry=security-service"
    }
  ];

  let filteredIndustries = [...allIndustries];

  renderFilters();
  renderGrid();

  function renderFilters() {
    const filterContainer = document.getElementById('category-filter-buttons');
    if (!filterContainer) return;

    // Count categories
    const counts = {};
    allIndustries.forEach(ind => {
      const cat = ind.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const categories = ['All', ...Object.keys(counts)];

    filterContainer.innerHTML = categories.map(cat => {
      const isActive = cat === currentCategory;
      const countLabel = cat === 'All' ? allIndustries.length : (counts[cat] || 0);
      return `
        <button class="filter-btn rr-btn-filter ${isActive ? 'active' : ''}" 
                style="background: ${isActive ? 'var(--primary-color)' : '#f4f4f4'}; 
                       color: ${isActive ? '#fff' : '#101010'}; 
                       border: none; 
                       padding: 8px 18px; 
                       border-radius: 30px; 
                       
                       font-size: 14px; 
                       cursor: pointer; 
                       transition: all 0.3s;
                       margin: 4px;"
                data-category="${cat}">
          ${cat} (${countLabel})
        </button>
      `;
    }).join('');

    // Attach click events
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        currentCategory = this.getAttribute('data-category');
        currentPage = 1;

        if (currentCategory === 'All') {
          filteredIndustries = [...allIndustries];
        } else {
          filteredIndustries = allIndustries.filter(ind => ind.category === currentCategory);
        }

        renderFilters();
        renderGrid();
      });
    });
  }

  function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredIndustries.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let buttonsHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      buttonsHTML += `
        <button class="page-btn ${isActive ? 'active' : ''}"
                style="background: ${isActive ? 'var(--primary-color)' : '#f4f4f4'}; 
                       color: ${isActive ? '#fff' : '#101010'}; 
                       border: none; 
                       width: 40px; 
                       height: 40px; 
                       border-radius: 50%; 
                       
                       font-size: 14px; 
                       cursor: pointer; 
                       transition: all 0.3s;
                       margin: 0 4px;"
                data-page="${i}">
          ${i}
        </button>
      `;
    }

    paginationContainer.innerHTML = buttonsHTML;

    // Attach pagination events
    paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        currentPage = parseInt(this.getAttribute('data-page'));
        renderGrid();

        // Smooth scroll to top of grid
        const gridTop = document.querySelector('.blog-section-5__area');
        if (gridTop) {
          gridTop.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function renderGrid() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filteredIndustries.slice(startIndex, endIndex);

    if (paginated.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center py-5">No industries found in this category.</div>';
      renderPagination();
      return;
    }

    grid.innerHTML = paginated.map((ind, index) => {
      return `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="${0.1 * (index % 3)}s">
            <div class="features-card blog-section-5__item h-100 fl f-col p-3">
                <span class="pr px-2 py-3 w-auto" style="font-size: 14px; color: var(--primary-color); font-weight: 500;">
                    ${ind.date} // ${ind.tagline}
                </span>
                <h3 class="blog-section-5__title original-black" style="font-size: 24px; font-weight: 300; line-height: 1.1; margin-bottom: 20px; flex-grow: 0;">
                    <a href="${ind.url}">${ind.title}</a>
                </h3>
                <div class="blog-thumb-wrap" style="flex-grow: 1; overflow: hidden; border-radius: 24px; aspect-ratio: 1/1;">
                    <a href="${ind.url}" style="display: block; width: 100%; height: 100%;">
                        <img data-pexels="${ind.imageQuery}" alt="${ind.title}" loading="lazy" 
                             style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease;"
                             onmouseover="this.style.transform='scale(1.05)'"
                             onmouseout="this.style.transform='scale(1)'">
                    </a>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-4">
                    <div class="blog-section-5__meta">
                        <span class="tag" style="background: #f4f4f4; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-family: Poppins;">${ind.category}</span>
                    </div>
                    <div class="blog-section-5__icon">
                        <a href="${ind.url}" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: var(--primary-color); color: white; border-radius: 50%;">
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      `;
    }).join('');

    renderPagination();

    // Scan for Pexels images dynamically
    if (window.PexelsLoader && typeof window.PexelsLoader.scan === 'function') {
      window.PexelsLoader.scan(grid);
    }

    // Re-init wow animations
    if (typeof WOW === 'function') {
      new WOW().init();
    }
  }
});
