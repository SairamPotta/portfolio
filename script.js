// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dynamic copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// Calculate duration from a start date (YYYY-MM) to today
function calcDuration(startStr) {
  const [startYear, startMonth] = startStr.split("-").map(Number);
  const now = new Date();
  let years = now.getFullYear() - startYear;
  let months = now.getMonth() + 1 - startMonth; // getMonth() is 0-based

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "Less than a month";
}

// Inject calculated durations for all "Present" spans
document.querySelectorAll(".calc-duration[data-start]").forEach((el) => {
  el.textContent = calcDuration(el.dataset.start);
});

// Scroll reveal animation using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Stagger reveal for article cards
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const articles = entry.target.querySelectorAll("article");
        articles.forEach((article, i) => {
          setTimeout(() => {
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
          }, i * 60);
        });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".article-container").forEach((container) => {
  container.querySelectorAll("article").forEach((article) => {
    article.style.opacity = "0";
    article.style.transform = "translateY(16px)";
    article.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  });
  cardObserver.observe(container);
});