
const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get("id");

const wallpaper = WALLPAPERS.find(item => item.id === wallpaperId);

const detail = document.getElementById("detail");
const similarSection = document.getElementById("similar-section");
const similarGrid = document.getElementById("similar-grid");

if (!wallpaper) {
  detail.innerHTML = `
    <h2>Wallpaper not found</h2>
    <p>Go back to the gallery and choose a wallpaper.</p>
  `;
} else {
  detail.innerHTML = `
    <div class="wallpaper-detail">
      <img class="main-image" src="${wallpaper.image}" alt="${wallpaper.title}">

      <div class="wallpaper-info">
        <p class="category">${wallpaper.category}</p>
        <h1>${wallpaper.title}</h1>
        <p>Resolution: ${wallpaper.resolution}</p>

        <div class="tags">
          ${wallpaper.tags.map(tag => `<span>#${tag}</span>`).join(" ")}
        </div>

        <a class="download-btn" href="${wallpaper.image}" download>
          Download Wallpaper
        </a>
      </div>
    </div>
  `;

  const similar = WALLPAPERS.filter(item =>
    item.id !== wallpaper.id &&
    item.category === wallpaper.category
  );

  if (similar.length > 0) {
    similarSection.hidden = false;

    similarGrid.innerHTML = similar.map(item => `
      <a class="similar-card" href="wallpaper.html?id=${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title}</p>
      </a>
    `).join("");
  }
}
