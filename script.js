/* =====================================================
   PENGATURAN KONTAK — GANTI DI SINI SAJA
   Semua link kontak di website otomatis ikut berubah.
   ===================================================== */
const CONFIG = {
  whatsapp: "6281776480328",          // format: 62 + nomor tanpa 0 di depan
  email: "maditiyafirmansyah657@gmail.com",
  instagram: "ditts_k1a"              // tanpa tanda @
};

/* ---------- 1. Isi link kontak dari CONFIG ---------- */
(function setupContacts() {
  const waLink = "https://wa.me/" + CONFIG.whatsapp;
  const set = (id, href, text) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    if (text) el.textContent = text;
  };
  set("waButton", waLink + "?text=" + encodeURIComponent("Halo Adit, saya melihat portofolio Anda."));
  set("waText", waLink, "+" + CONFIG.whatsapp);
  set("mailText", "mailto:" + CONFIG.email, CONFIG.email);
  set("igText", "https://instagram.com/" + CONFIG.instagram, "@" + CONFIG.instagram);
})();

/* ---------- 2. Animasi loading ---------- */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 600);
});

/* ---------- 3. Navbar: efek scroll, menu HP, menu aktif ---------- */
const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const toTop = document.getElementById("toTop");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});
navLinks.forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.querySelector("i").className = "fa-solid fa-bars";
}));

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 500);

  let current = "beranda";
  sections.forEach(sec => { if (y >= sec.offsetTop - 120) current = sec.id; });
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 4. Tombol kembali ke atas ---------- */
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 5. Animasi saat digulir + progress bar ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    const bar = entry.target.querySelector(".bar span");
    if (bar) bar.style.width = bar.dataset.level + "%";
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- 6. Jendela detail proyek / pembesar foto ---------- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
let lastFocus = null;

function openModal(btn) {
  lastFocus = btn;
  modalImg.src = btn.dataset.img;
  modalImg.alt = btn.dataset.open;
  modalTitle.textContent = btn.dataset.open;
  modalDesc.textContent = btn.dataset.desc;
  modalDesc.parentElement.classList.toggle("empty", !btn.dataset.desc);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
document.querySelectorAll("[data-open]").forEach(btn => btn.addEventListener("click", () => openModal(btn)));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* ---------- 7. Form kontak -> membuka WhatsApp ---------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fName").value.trim();
  const msg = document.getElementById("fMsg").value.trim();
  const err = document.getElementById("formError");
  if (!name || !msg) { err.textContent = "Isi nama dan pesan terlebih dahulu."; return; }
  err.textContent = "";
  const text = "Halo Adit, saya " + name + ". " + msg;
  window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  e.target.reset();
});
