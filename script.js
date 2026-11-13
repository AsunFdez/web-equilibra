const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  const closeMenu = (restoreFocus = false) => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navLinks.classList.remove("is-open");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

const periods = {
  current: {
    balance: "+1.284,50",
    change: "↗ 12,8%",
    income: "2.250,00 €",
    expenses: "965,50 €",
    caption: "Junio · una vista de ejemplo",
    bars: [47, 72, 58, 86, 67],
  },
  previous: {
    balance: "+1.138,60",
    change: "↗ 8,4%",
    income: "2.180,00 €",
    expenses: "1.041,40 €",
    caption: "Mayo · una vista de ejemplo",
    bars: [59, 43, 79, 63, 52],
  },
};

const periodButtons = document.querySelectorAll(".period-button");
const periodCaption = document.querySelector("#period-caption");
const demoBalance = document.querySelector("#demo-balance");
const demoChange = document.querySelector("#demo-change");
const demoIncome = document.querySelector("#demo-income");
const demoExpenses = document.querySelector("#demo-expenses");
const demoBars = document.querySelectorAll(".demo-bars .bar");

periodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const period = periods[button.dataset.period];
    if (!period) return;

    periodButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    demoBalance.innerHTML = `${period.balance} <small>€</small>`;
    demoChange.textContent = period.change;
    demoIncome.textContent = period.income;
    demoExpenses.textContent = period.expenses;
    periodCaption.textContent = period.caption;
    demoBars.forEach((bar, index) => {
      bar.style.height = `${period.bars[index]}%`;
    });
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".feature-card, .philosophy-content, .demo-panel, .wellbeing-copy")
    .forEach((element) => revealObserver.observe(element));
}
