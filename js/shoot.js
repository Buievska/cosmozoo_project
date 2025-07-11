// === 2. Отримуємо ID з URL ===
const params = new URLSearchParams(window.location.search);
const shootId = params.get("id");

// === 3. Знаходимо потрібну фотосесію ===
const shoot = shoots.find((s) => s.id === shootId);

// === 4. Якщо фотосесія знайдена — вставляємо все ===
if (shoot) {
  // Заголовки
  document.title = shoot.title;
  document.getElementById("shoot-title").textContent = shoot.title;
  document.getElementById("shoot-description").textContent = shoot.description;

  // Головне адаптивне фото
  const imgDesktop = document.getElementById("img-desktop");
  const imgTablet = document.getElementById("img-tablet");
  const imgMobile = document.getElementById("img-mobile");

  // Встановлюємо дані для десктопної версії
  imgDesktop.srcset = shoot.mainImageDesktop.path;
  imgDesktop.width = shoot.mainImageDesktop.width;
  imgDesktop.height = shoot.mainImageDesktop.height;

  // Встановлюємо дані для планшетної версії
  imgTablet.srcset = shoot.mainImageTablet.path;
  imgTablet.width = shoot.mainImageTablet.width;
  imgTablet.height = shoot.mainImageTablet.height;

  // Встановлюємо дані для мобільної версії (для <img>)
  imgMobile.src = shoot.mainImageMobile.path;
  imgMobile.width = shoot.mainImageMobile.width;
  imgMobile.height = shoot.mainImageMobile.height;

  // Галерея з 3 фото
  const galleryContainer = document.getElementById("gallery");

  shoot.extraImages.forEach((imgSet) => {
    const picture = document.createElement("picture");

    const sourceDesktop = document.createElement("source");
    sourceDesktop.media = "(min-width: 1440px)";
    sourceDesktop.srcset = imgSet.desktop.path;
    sourceDesktop.width = imgSet.desktop.width;
    sourceDesktop.height = imgSet.desktop.height;

    const sourceTablet = document.createElement("source");
    sourceTablet.media = "(min-width: 768px)";
    sourceTablet.srcset = imgSet.tablet.path;
    sourceTablet.width = imgSet.tablet.width;
    sourceTablet.height = imgSet.tablet.height;

    const img = document.createElement("img");
    img.src = imgSet.mobile.path;
    img.alt = shoot.title;
    img.classList.add("extra-image");
    img.width = imgSet.mobile.width;
    img.height = imgSet.mobile.height;
    img.loading = "lazy";

    picture.appendChild(sourceDesktop);
    picture.appendChild(sourceTablet);
    picture.appendChild(img);

    galleryContainer.appendChild(picture);
  });
} else {
  // Якщо id неправильний
  document.body.innerHTML = "<h2>Foto not found</h2>";
}
