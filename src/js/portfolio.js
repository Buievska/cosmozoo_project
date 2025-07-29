document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Знаходимо елементи на сторінці ---
  const worksContainer = document.getElementById("works-container");
  const loadMoreBtn = document.getElementById("load-more-btn");

  // Перевіряємо, чи існують елементи на сторінці
  if (!worksContainer || !loadMoreBtn) {
    console.error(
      "Необхідні елементи (works-container або load-more-btn) не знайдені."
    );
    return;
  }

  // --- 2. Налаштування ---
  const itemsPerLoad = 6; // Скільки карток завантажувати за раз
  let currentItems = 0; // Лічильник вже завантажених карток

  // --- 3. Функція для створення однієї картки ---
  function createWorkCard(shoot) {
    const link = document.createElement("a");
    link.href = `shoot.html?id=${shoot.id}`;
    link.classList.add("work-card");

    // Перевіряємо, чи існують шляхи для планшета/десктопа
    const tabletSrc = shoot.mainImageTablet
      ? shoot.mainImageTablet.path
      : shoot.mainImageMobile.path;
    const desktopSrc = shoot.mainImageDesktop
      ? shoot.mainImageDesktop.path
      : tabletSrc;

    // Створюємо HTML-структуру з тегом <picture> для адаптивних зображень
    link.innerHTML = `
      <picture>
        <source media="(min-width: 1440px)" srcset="${desktopSrc}">
        <source media="(min-width: 768px)" srcset="${tabletSrc}">
        <img src="${shoot.mainImageMobile.path}" alt="${shoot.title}" loading="lazy">
      </picture>
      <div class="card-text">
          <h3>${shoot.title}</h3>
          <span>View details</span>
      </div>
    `;

    return link;
  }

  // --- 4. Функція для завантаження порції робіт ---
  function loadWorks() {
    const worksToLoad = shoots.slice(currentItems, currentItems + itemsPerLoad);

    worksToLoad.forEach((shoot) => {
      const card = createWorkCard(shoot);
      worksContainer.appendChild(card);
    });

    currentItems += worksToLoad.length;

    // Ховаємо кнопку, якщо більше немає робіт
    if (currentItems >= shoots.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // --- 5. Запуск ---
  // Обробник кліку для кнопки
  loadMoreBtn.addEventListener("click", loadWorks);

  // Завантажуємо першу порцію (6 карток) при завантаженні сторінки
  loadWorks();
});
