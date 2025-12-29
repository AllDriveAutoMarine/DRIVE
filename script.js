document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("show"));
    });
  }

  // Dynamic year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Pricing button behavior (placeholder for real checkout links)
  document.querySelectorAll("button[data-buy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-buy");
      const note = document.getElementById("form-note");
      if (note) {
        note.textContent = `You selected: ${product}. Add a checkout link (Gumroad/Payhip/Stripe) when ready.`;
      } else {
        alert(`You selected: ${product}. Add a checkout link when ready.`);
      }
      // Later: window.location.href = "YOUR_CHECKOUT_LINK";
    });
  });

  // Fake form submit (for now)
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formNote) {
        formNote.textContent = "Message sent (demo). Hook this to email or a form service when ready.";
      } else {
        alert("Message sent (demo).");
      }
      form.reset();
    });
  }
});

