const shoots = [
  {
    id: "tea",
    title: "Tea & Tatami",
    thumbnail: "../img/shoot/tea-main-mobile.jpg",
  },
  {
    id: "ocean",
    title: "Ocean Calm",
    thumbnail: "../img/shoot/ocean-thumb.jpg",
  },
  {
    id: "studio",
    title: "Studio Vibe",
    thumbnail: "../img/shoot/studio-thumb.jpg",
  },
  {
    id: "city",
    title: "City Lights",
    thumbnail: "../img/shoot/city-thumb.jpg",
  },
  // додай ще за потреби
];

const gallery = document.getElementById("portfolio-gallery");
const loadMoreBtn = document.getElementById("load-more");

let visibleCount = 0;
const batchSize = 2; // скільки показувати за раз

function renderShoots() {
  const nextItems = shoots.slice(visibleCount, visibleCount + batchSize);
  nextItems.forEach((shoot) => {
    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.innerHTML = `
          <img src="${shoot.thumbnail}" alt="${shoot.title}" class="portfolio-thumb" />
          <h3>${shoot.title}</h3>
          <a href="shoot.html?id=${shoot.id}" class="portfolio-btn">View Details</a>
        `;
    gallery.appendChild(card);
  });
  visibleCount += batchSize;
  if (visibleCount >= shoots.length) {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", renderShoots);

// показати перші роботи одразу
renderShoots();
