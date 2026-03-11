// İlan detay sayfası mantığı

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const ilan = getIlanById(id);
  const container = document.getElementById('detailContent');

  if (!ilan) {
    container.innerHTML = `
      <a href="index.html" class="detail-back">&#8592; Ana Sayfaya Dön</a>
      <div class="no-results">İlan bulunamadı.</div>
    `;
    return;
  }

  document.title = `${ilan.baslik} — EmlakPro`;

  const thumbsHtml = ilan.resimler.map((url, i) => `
    <img src="${url}" alt="Fotoğraf ${i + 1}" class="${i === 0 ? 'active' : ''}" onclick="changeMainImage(this, '${url}')">
  `).join('');

  container.innerHTML = `
    <a href="index.html" class="detail-back">&#8592; İlanlara Dön</a>

    <div class="gallery">
      <img class="gallery-main" id="mainImage" src="${ilan.resimler[0] || ''}" alt="${ilan.baslik}" onerror="this.src='https://via.placeholder.com/900x450?text=Foto%C4%9Fraf+Yok'">
      ${ilan.resimler.length > 1 ? `<div class="gallery-thumbs">${thumbsHtml}</div>` : ''}
    </div>

    <div class="detail-header">
      <div>
        <span class="card-tag ${ilan.tur === 'satilik' ? 'tag-satilik' : 'tag-kiralik'}">
          ${ilan.tur === 'satilik' ? 'Satılık' : 'Kiralık'}
        </span>
        <h1>${ilan.baslik}</h1>
        <p style="color: var(--text-light); margin-top: 0.25rem;">${ilan.konum}</p>
        <button class="fav-btn-detail ${isFavori(ilan.id) ? 'fav-active' : ''}" onclick="toggleDetailFavorite('${ilan.id}')">
          &#9829; ${isFavori(ilan.id) ? 'Favorilerde' : 'Favorilere Ekle'}
        </button>
      </div>
      <div class="detail-price">
        ${formatFiyat(ilan.fiyat)}
        <small>${ilan.tur === 'kiralik' ? 'aylık' : ''}</small>
      </div>
    </div>

    <div class="detail-info">
      <div class="info-item">
        <span class="info-label">Oda Sayısı</span>
        <span class="info-value">${ilan.odaSayisi}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Metrekare</span>
        <span class="info-value">${ilan.metrekare} m²</span>
      </div>
      <div class="info-item">
        <span class="info-label">Kat</span>
        <span class="info-value">${ilan.kat}. Kat</span>
      </div>
      <div class="info-item">
        <span class="info-label">Isınma</span>
        <span class="info-value">${ilan.isinma}</span>
      </div>
      <div class="info-item">
        <span class="info-label">İlan Türü</span>
        <span class="info-value">${ilan.tur === 'satilik' ? 'Satılık' : 'Kiralık'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">İlan Tarihi</span>
        <span class="info-value">${ilan.tarih}</span>
      </div>
    </div>

    <div class="detail-description">
      <h2>Açıklama</h2>
      <p>${ilan.aciklama}</p>
    </div>

    <div class="contact-buttons">
      <a href="https://wa.me/902125550000?text=${encodeURIComponent('Merhaba, ' + ilan.baslik + ' ilanı hakkında bilgi almak istiyorum.')}" target="_blank" class="btn btn-whatsapp">WhatsApp ile İletişim</a>
      <a href="tel:+902125550000" class="btn btn-phone">Telefon ile Ara</a>
    </div>
  `;
});

function toggleDetailFavorite(id) {
  const added = toggleFavori(id);
  const btn = document.querySelector('.fav-btn-detail');
  btn.classList.toggle('fav-active', added);
  btn.innerHTML = `&#9829; ${added ? 'Favorilerde' : 'Favorilere Ekle'}`;
}

function changeMainImage(thumb, url) {
  document.getElementById('mainImage').src = url;
  document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
  thumb.classList.add('active');
}
