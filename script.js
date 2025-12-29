document.addEventListener("DOMContentLoaded", () => {
  // Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Menu elements
  const navToggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("app-menu");
  const closeBtn = document.getElementById("app-menu-close");
  const backdrop = document.getElementById("backdrop");
  const menuLinks = document.getElementById("app-menu-links");

  function openMenu() {
    if (!menu || !backdrop || !navToggle) return;
    menu.classList.add("show");
    backdrop.classList.add("show");
    menu.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menu || !backdrop || !navToggle) return;
    menu.classList.remove("show");
    backdrop.classList.remove("show");
    menu.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Smooth scroll for internal links + close menu after click
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    // close menu when clicking any menu link or footer buttons
    closeMenu();
  });

  // Highlight current section in menu
  if (menuLinks && "IntersectionObserver" in window) {
    const linkMap = new Map();
    menuLinks.querySelectorAll("a").forEach((a) => linkMap.set(a.dataset.sectionId, a));

    const sections = Array.from(document.querySelectorAll("section[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const link = linkMap.get(id);
          if (!link) return;
          linkMap.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s));
  }
});
