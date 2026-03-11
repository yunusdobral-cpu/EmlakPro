// Admin paneli mantığı

document.addEventListener('DOMContentLoaded', () => {
  initSampleData();
  renderAdminTable();
});

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  const ilanlar = getIlanlar();

  if (ilanlar.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--text-light); padding: 2rem;">Henüz ilan bulunmuyor.</td></tr>';
    return;
  }

  tbody.innerHTML = ilanlar.map(ilan => `
    <tr>
      <td>${ilan.baslik}</td>
      <td><span class="card-tag ${ilan.tur === 'satilik' ? 'tag-satilik' : 'tag-kiralik'}">${ilan.tur === 'satilik' ? 'Satılık' : 'Kiralık'}</span></td>
      <td>${formatFiyat(ilan.fiyat)}</td>
      <td>${ilan.konum}</td>
      <td class="actions">
        <button class="btn btn-secondary" onclick="editIlan('${ilan.id}')">Düzenle</button>
        <button class="btn btn-danger" onclick="confirmDelete('${ilan.id}')">Sil</button>
      </td>
    </tr>
  `).join('');
}

function saveIlanForm() {
  const editId = document.getElementById('editId').value;
  const resimlerText = document.getElementById('resimler').value.trim();

  const ilanData = {
    baslik: document.getElementById('baslik').value.trim(),
    tur: document.getElementById('tur').value,
    fiyat: parseInt(document.getElementById('fiyat').value) || 0,
    konum: document.getElementById('konum').value.trim(),
    metrekare: parseInt(document.getElementById('metrekare').value) || 0,
    odaSayisi: document.getElementById('odaSayisi').value.trim(),
    kat: parseInt(document.getElementById('kat').value) || 0,
    isinma: document.getElementById('isinma').value.trim(),
    aciklama: document.getElementById('aciklama').value.trim(),
    resimler: resimlerText ? resimlerText.split('\n').map(u => u.trim()).filter(Boolean) : []
  };

  if (!ilanData.baslik || !ilanData.fiyat || !ilanData.konum) {
    alert('Lütfen başlık, fiyat ve konum alanlarını doldurun.');
    return;
  }

  if (editId) {
    updateIlan(editId, ilanData);
  } else {
    addIlan(ilanData);
  }

  resetForm();
  renderAdminTable();
}

function editIlan(id) {
  const ilan = getIlanById(id);
  if (!ilan) return;

  document.getElementById('editId').value = ilan.id;
  document.getElementById('baslik').value = ilan.baslik;
  document.getElementById('tur').value = ilan.tur;
  document.getElementById('fiyat').value = ilan.fiyat;
  document.getElementById('konum').value = ilan.konum;
  document.getElementById('metrekare').value = ilan.metrekare;
  document.getElementById('odaSayisi').value = ilan.odaSayisi;
  document.getElementById('kat').value = ilan.kat;
  document.getElementById('isinma').value = ilan.isinma;
  document.getElementById('aciklama').value = ilan.aciklama;
  document.getElementById('resimler').value = (ilan.resimler || []).join('\n');
  document.getElementById('formTitle').textContent = 'İlanı Düzenle';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confirmDelete(id) {
  if (confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
    deleteIlan(id);
    renderAdminTable();
  }
}

function resetForm() {
  document.getElementById('editId').value = '';
  document.getElementById('baslik').value = '';
  document.getElementById('tur').value = 'satilik';
  document.getElementById('fiyat').value = '';
  document.getElementById('konum').value = '';
  document.getElementById('metrekare').value = '';
  document.getElementById('odaSayisi').value = '';
  document.getElementById('kat').value = '';
  document.getElementById('isinma').value = '';
  document.getElementById('aciklama').value = '';
  document.getElementById('resimler').value = '';
  document.getElementById('formTitle').textContent = 'Yeni İlan Ekle';
}
