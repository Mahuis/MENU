(function () {
  "use strict";

  /* ===============================
   * Header scroll effect
   * =============================== */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    ) return;

    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /* ===============================
   * Mobile nav toggle
   * =============================== */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  document.querySelectorAll("#navmenu a").forEach(link => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  /* ===============================
   * Preloader
   * =============================== */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /* ===============================
   * Scroll top button
   * =============================== */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }

  scrollTop?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* ===============================
   * AOS init
   * =============================== */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  }

  window.addEventListener("load", aosInit);

  /* ===============================
   * Isotope Menu + Buttons
   * =============================== */
window.addEventListener("load", () => {
  const isotopeContainer = document.querySelector(".isotope-container");
  if (!isotopeContainer) return;

  imagesLoaded(isotopeContainer, () => {
    const iso = new Isotope(isotopeContainer, {
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });

    const filterButtons = document.querySelectorAll(".menu-filters .menu-btn");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn =>
          btn.classList.remove("filter-active")
        );

        button.classList.add("filter-active");

        const filterValue = button.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });

        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      });
    });

    /* ===== AQUI EMPIEZA LO NUEVO ===== */

    const headerButtons = document.querySelectorAll(
      '.btn-get-started[data-filter]'
    );

    headerButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });

        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      });
    });

    /* ===== AQUI TERMINA LO NUEVO ===== */

  });
});

  /* ===============================
   * Scrollspy
   * =============================== */
  const navLinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;

  // Página Parrillada
  if (path.includes("parrillada.html")) {
    filtrarPorClase("filter-parrillada");
  }

  // Página Congelados
  if (path.includes("congelados.html")) {
    filtrarPorClase("filter-congelados");
  }

});

function filtrarPorClase(claseVisible) {
  const items = document.querySelectorAll(".menu-item");

  if (!items.length) return;

  items.forEach(item => {
    if (item.classList.contains(claseVisible)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}


/* ===============================
 * Nav Active Link Automático
 * =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll("#navmenu a");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");

    // Limpiar active previo
    link.classList.remove("active");

    // index.html o raíz
    if (
      (currentPath === "" || currentPath === "index.html") &&
      linkPath.includes("index.html")
    ) {
      link.classList.add("active");
    }

    // parrillada.html
    if (linkPath === "parrillada.html" && currentPath === "parrillada.html") {
      link.classList.add("active");
    }

    // congelados.html
    if (linkPath === "congelados.html" && currentPath === "congelados.html") {
      link.classList.add("active");
    }
  });
});

/* ===============================
   Modal Galería Congelados (Swipe + Flechas)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".nav-arrow.prev");
  const nextBtn = document.querySelector(".nav-arrow.next");

  const images = Array.from(
    document.querySelectorAll(".congelado-item img")
  );

  if (!modal || !modalImg || !images.length) return;

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
  }

  function showPrev() {
    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  closeBtn.addEventListener("click", closeModal);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  /* Swipe (mobile) */
  let startX = 0;

  modalImg.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  modalImg.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) showNext();
    if (diff < -50) showPrev();
  });

  /* Teclado */
  document.addEventListener("keydown", e => {
    if (modal.style.display !== "flex") return;

    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeModal();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.querySelector(".back-to-top");

  if (!backToTop) return;

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTop);

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


})();

window.addEventListener("DOMContentLoaded", () => {

  const combos = document.querySelectorAll(
    ".menu-item.filter-familiares:not(.no-papas)"
  );

  combos.forEach(item => {
    const nombre = item.querySelector(".menu-content a");
    if (!nombre) return;

    // Evitar duplicados
    if (item.querySelector(".incluye-papas")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "menu-texto";

    const texto = document.createElement("div");
    texto.className = "incluye-papas";
    texto.textContent = "Incluye papas fritas";

    nombre.parentNode.insertBefore(wrapper, nombre);
    wrapper.appendChild(nombre);
    wrapper.appendChild(texto);
  });

});



