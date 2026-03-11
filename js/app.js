// Ana sayfa & ilan listesi mantığı

let showOnlyFavorites = false;
let currentSort = 'newest';
let debounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  initSampleData();

  // Event listeners
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const filterOdaSayisi = document.getElementById('filterOdaSayisi');
  const btnFiltrele = document.getElementById('btnFiltrele');
  const btnTemizle = document.getElementById('btnTemizle');
  const btnFavoriler = document.getElementById('btnFavoriler');

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => applyFiltersAndRender(), 300);
  });

  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    applyFiltersAndRender();
  });

  filterOdaSayisi.addEventListener('change', () => applyFiltersAndRender());
  btnFiltrele.addEventListener('click', () => applyFiltersAndRender());
  btnTemizle.addEventListener('click', () => resetFilters());
  btnFavoriler.addEventListener('click', () => toggleFavoritesFilter());

  applyFiltersAndRender();
});

function applyFiltersAndRender() {
  let ilanlar = getIlanlar();

  // 1. Text search
  const searchVal = document.getElementById('searchInput').value.toLocaleLowerCase('tr-TR').trim();
  if (searchVal) {
    ilanlar = ilanlar.filter(i =>
      i.baslik.toLocaleLowerCase('tr-TR').includes(searchVal) ||
      i.konum.toLocaleLowerCase('tr-TR').includes(searchVal)
    );
  }

  // 2. Type filter
  const tur = document.getElementById('filterTur').value;
  if (tur) {
    ilanlar = ilanlar.filter(i => i.tur === tur);
  }

  // 3. Price range
  const minFiyat = parseInt(document.getElementById('filterMinFiyat').value) || 0;
  const maxFiyat = parseInt(document.getElementById('filterMaxFiyat').value) || Infinity;
  ilanlar = ilanlar.filter(i => i.fiyat >= minFiyat && i.fiyat <= maxFiyat);

  // 4. Room count
  const odaSayisi = document.getElementById('filterOdaSayisi').value;
  if (odaSayisi) {
    ilanlar = ilanlar.filter(i => i.odaSayisi === odaSayisi);
  }

  // 5. Favorites only
  if (showOnlyFavorites) {
    ilanlar = ilanlar.filter(i => isFavori(i.id));
  }

  // 6. Sort
  switch (currentSort) {
    case 'newest':
      ilanlar.sort((a, b) => b.tarih.localeCompare(a.tarih));
      break;
    case 'price_asc':
      ilanlar.sort((a, b) => a.fiyat - b.fiyat);
      break;
    case 'price_desc':
      ilanlar.sort((a, b) => b.fiyat - a.fiyat);
      break;
    case 'm2':
      ilanlar.sort((a, b) => b.metrekare - a.metrekare);
      break;
  }

  // 7. Update results count
  document.getElementById('resultsCount').textContent = `${ilanlar.length} ilan bulundu`;

  // 8. Render
  renderProperties(ilanlar);
}

function renderProperties(ilanlar) {
  const grid = document.getElementById('propertyGrid');

  if (ilanlar.length === 0) {
    grid.innerHTML = '<div class="no-results">Aradığınız kriterlere uygun ilan bulunamadı.</div>';
    return;
  }

  grid.innerHTML = ilanlar.map((ilan, index) => {
    const favActive = isFavori(ilan.id) ? 'fav-active' : '';
    return `
    <article class="property-card fade-in" style="animation-delay: ${index * 0.05}s" onclick="window.location.href='ilan-detay.html?id=${ilan.id}'">
      <div class="card-img-wrapper">
        <img class="card-img" src="${ilan.resimler[0] || ''}" alt="${ilan.baslik}" onerror="this.src='https://via.placeholder.com/400x220?text=Foto%C4%9Fraf+Yok'">
        <button class="fav-btn ${favActive}" onclick="event.stopPropagation(); toggleFavorite('${ilan.id}')">&#9829;</button>
      </div>
      <div class="card-body">
        <span class="card-tag ${ilan.tur === 'satilik' ? 'tag-satilik' : 'tag-kiralik'}">
          ${ilan.tur === 'satilik' ? 'Satılık' : 'Kiralık'}
        </span>
        <h3 class="card-title">${ilan.baslik}</h3>
        <p class="card-location">${ilan.konum}</p>
        <div class="card-features">
          <span>${ilan.odaSayisi}</span>
          <span>${ilan.metrekare} m²</span>
          <span>Kat ${ilan.kat}</span>
        </div>
        <div class="card-price">
          ${formatFiyat(ilan.fiyat)}
          ${ilan.tur === 'kiralik' ? '<small>/ay</small>' : ''}
        </div>
      </div>
    </article>
  `;
  }).join('');
}

function toggleFavorite(id) {
  toggleFavori(id);
  applyFiltersAndRender();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterTur').value = '';
  document.getElementById('filterMinFiyat').value = '';
  document.getElementById('filterMaxFiyat').value = '';
  document.getElementById('filterOdaSayisi').value = '';
  document.getElementById('sortSelect').value = 'newest';
  currentSort = 'newest';
  showOnlyFavorites = false;
  document.getElementById('btnFavoriler').classList.remove('active');
  applyFiltersAndRender();
}

function toggleFavoritesFilter() {
  showOnlyFavorites = !showOnlyFavorites;
  document.getElementById('btnFavoriler').classList.toggle('active', showOnlyFavorites);
  applyFiltersAndRender();
}
