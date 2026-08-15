/* =========================================================
   SITE CONFIG — edit these values to update the whole site
   ========================================================= */
const SITE = {
  name: "English WITH BROHI Sir",
  shortName: "BROHI Sir",
  teacherName: "Saif Jan Brohi",
  whatsappNumber: "923148481324",
  whatsappDefaultMessage: "Assalam-o-Alaikum! I want more information about English WITH BROHI Sir.",
  address: "Update with your academy's address",
  email: "info@englishwithbrohisir.com",
  timing: "5 days a week, 45–60 minutes per class",
};

const NAV_ITEMS = [
  { href: "index.html", label: "🏠 Home" },
  { href: "about.html", label: "👨‍🏫 About" },
  { href: "courses.html", label: "📚 Courses" },
  { href: "fees.html", label: "💰 Fees" },
  { href: "register.html", label: "📝 Register" },
  { href: "resources.html", label: "📖 Resources" },
  { href: "quizzes.html", label: "🧠 Quizzes" },
  { href: "reviews.html", label: "⭐ Reviews" },
];

function waLink(message) {
  const msg = encodeURIComponent(message || SITE.whatsappDefaultMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${msg}`;
}

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const page = currentPage();

  const links = NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" ${item.href === page ? 'aria-current="page"' : ""}>${item.label}</a>`
  ).join("");

  el.innerHTML = `
    <div class="container nav-row">
      <a href="index.html" class="brand">
        <span class="brand-mark">B</span>
        <span>${SITE.shortName}<br><span style="font-family: var(--font-body); font-weight:500; font-size:0.62rem; letter-spacing:0.08em; text-transform:uppercase; color: var(--ink-faint);">English Academy</span></span>
      </a>
      <nav class="nav-links" id="nav-links">${links}</nav>
      <div class="nav-cta">
        <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-outline">📱 WhatsApp</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="color:var(--paper);">
            <span class="brand-mark">B</span>
            <span style="font-family:var(--font-display); font-size:1.15rem;">${SITE.name}</span>
          </div>
          <p style="margin-top:14px; max-width:32ch; color:#9AA4C2; font-size:0.92rem;">
            Grammar and Spoken English tuition built specifically for Classes 6–8 — taught sentence by sentence, mistake by mistake.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="courses.html">Courses</a></li>
            <li><a href="fees.html">Fees</a></li>
            <li><a href="quizzes.html">Online Quizzes</a></li>
            <li><a href="resources.html">Free Resources</a></li>
          </ul>
        </div>
        <div>
          <h4>Academy</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="reviews.html">Student Reviews</a></li>
            <li><a href="register.html">Registration</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>${SITE.address}</li>
            <li>${SITE.timing}</li>
            <li>📱 ${SITE.whatsappNumber.replace(/(\d{2})(\d{3})(\d{7})/, "+$1 $2-$3")}</li>
            <li><a href="${waLink()}" target="_blank" rel="noopener">Chat on WhatsApp →</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
        <span>Built for students who are ready to speak up. 🚀</span>
      </div>
    </div>
  `;
}

function renderWaFloat() {
  const el = document.getElementById("wa-float");
  if (!el) return;
  el.innerHTML = `
    <a href="${waLink()}" target="_blank" rel="noopener" class="wa-float" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.03 3C9.4 3 4 8.4 4 15.03c0 2.24.62 4.4 1.79 6.29L4 29l7.86-1.75a12.9 12.9 0 0 0 4.17.7h.01c6.63 0 12.03-5.4 12.03-12.03C28.06 8.4 22.66 3 16.03 3zm0 22.03c-1.35 0-2.68-.34-3.85-.99l-.28-.16-4.66 1.04 1.02-4.55-.18-.29a9.95 9.95 0 0 1-1.55-5.05c0-5.52 4.5-10.02 10.03-10.02 5.52 0 10.02 4.5 10.02 10.02 0 5.53-4.5 10-10.02 10z"/></svg>
      <span>Chat with us</span>
    </a>
  `;
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderWaFloat();
  initScrollReveal();
});
