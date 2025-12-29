document.addEventListener("DOMContentLoaded", () => {
  // Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Sidebar elements
  const toggle = document.getElementById("nav-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("sidebar-close");
  const overlay = document.getElementById("overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-links a");

  function openSidebar() {
    if (!sidebar || !overlay || !toggle) return;
    sidebar.classList.add("show");
    overlay.classList.add("show");
    sidebar.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar || !overlay || !toggle) return;
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    sidebar.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggle) toggle.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // Smooth scroll for sidebar links + close
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      closeSidebar();
    });
  });

  // Highlight current section in sidebar
  if ("IntersectionObserver" in window) {
    const map = new Map();
    sidebarLinks.forEach((a) => map.set(a.dataset.sectionId, a));

    const sections = Array.from(document.querySelectorAll("section[id]"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const a = map.get(id);
          if (!a) return;
          map.forEach((link) => link.classList.remove("active"));
          a.classList.add("active");
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => obs.observe(s));
  }
});
          
