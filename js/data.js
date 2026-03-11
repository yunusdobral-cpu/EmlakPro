// localStorage CRUD işlemleri & örnek veri

const STORAGE_KEY = 'gayrimenkul_ilanlar';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function getIlanlar() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveIlanlar(ilanlar) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ilanlar));
}

function getIlanById(id) {
  return getIlanlar().find(ilan => ilan.id === id);
}

function addIlan(ilan) {
  const ilanlar = getIlanlar();
  ilan.id = generateId();
  ilan.tarih = new Date().toISOString().split('T')[0];
  ilanlar.push(ilan);
  saveIlanlar(ilanlar);
  return ilan;
}

function updateIlan(id, updated) {
  const ilanlar = getIlanlar();
  const index = ilanlar.findIndex(i => i.id === id);
  if (index === -1) return null;
  ilanlar[index] = { ...ilanlar[index], ...updated };
  saveIlanlar(ilanlar);
  return ilanlar[index];
}

function deleteIlan(id) {
  const ilanlar = getIlanlar().filter(i => i.id !== id);
  saveIlanlar(ilanlar);
}

function initSampleData() {
  if (getIlanlar().length > 0) return;

  const samples = [
    {
      id: generateId(),
      baslik: '3+1 Deniz Manzaralı Daire',
      tur: 'satilik',
      fiyat: 3500000,
      konum: 'İstanbul, Kadıköy',
      metrekare: 120,
      odaSayisi: '3+1',
      kat: 5,
      isinma: 'Doğalgaz',
      aciklama: 'Kadıköy merkezde, deniz manzaralı, yeni tadilatlı 3+1 daire. Metro ve İDO\'ya yürüme mesafesinde. Açık mutfak, geniş salon, ebeveyn banyosu mevcut.',
      resimler: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800'
      ],
      tarih: '2026-03-10'
    },
    {
      id: generateId(),
      baslik: '2+1 Kiralık Residence',
      tur: 'kiralik',
      fiyat: 25000,
      konum: 'İstanbul, Beşiktaş',
      metrekare: 85,
      odaSayisi: '2+1',
      kat: 12,
      isinma: 'Merkezi',
      aciklama: 'Beşiktaş\'ta residence projede kiralık 2+1 daire. Havuz, spor salonu, otopark dahil. Eşyalı veya eşyasız kiralık seçeneği mevcuttur.',
      resimler: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'
      ],
      tarih: '2026-03-09'
    },
    {
      id: generateId(),
      baslik: '4+1 Müstakil Villa',
      tur: 'satilik',
      fiyat: 12000000,
      konum: 'İstanbul, Sarıyer',
      metrekare: 280,
      odaSayisi: '4+1',
      kat: 3,
      isinma: 'Yerden Isıtma',
      aciklama: 'Sarıyer\'de ormana yakın, özel havuzlu müstakil villa. 3 katlı, 4 yatak odalı, geniş bahçeli. Akıllı ev sistemi mevcut.',
      resimler: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      ],
      tarih: '2026-03-08'
    },
    {
      id: generateId(),
      baslik: '1+1 Stüdyo Daire',
      tur: 'kiralik',
      fiyat: 15000,
      konum: 'İstanbul, Şişli',
      metrekare: 55,
      odaSayisi: '1+1',
      kat: 8,
      isinma: 'Kombi',
      aciklama: 'Şişli merkezde, metroya yakın, yeni binada 1+1 stüdyo daire. Öğrenci ve çalışanlar için ideal. Asansörlü, güvenlikli bina.',
      resimler: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'
      ],
      tarih: '2026-03-07'
    },
    {
      id: generateId(),
      baslik: '5+2 Boğaz Manzaralı Penthouse',
      tur: 'satilik',
      fiyat: 28000000,
      konum: 'İstanbul, Üsküdar',
      metrekare: 350,
      odaSayisi: '5+2',
      kat: 15,
      isinma: 'Merkezi',
      aciklama: 'Üsküdar\'da boğaz manzaralı lüks penthouse. Özel teras, jakuzi, şömine. Kapalı otopark ve 24 saat güvenlik.',
      resimler: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
      ],
      tarih: '2026-03-06'
    },
    {
      id: generateId(),
      baslik: '3+1 Site İçi Daire',
      tur: 'kiralik',
      fiyat: 20000,
      konum: 'İstanbul, Ataşehir',
      metrekare: 110,
      odaSayisi: '3+1',
      kat: 6,
      isinma: 'Doğalgaz',
      aciklama: 'Ataşehir\'de güvenlikli site içinde 3+1 kiralık daire. Çocuk parkı, yüzme havuzu, fitness salonu mevcut. AVM\'ye yürüme mesafesinde.',
      resimler: [
        'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
      ],
      tarih: '2026-03-05'
    }
  ];

  saveIlanlar(samples);
}

// Favoriler CRUD
const FAV_KEY = 'eciyasemlak_favoriler';

function getFavoriler() {
  const data = localStorage.getItem(FAV_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFavoriler(favoriler) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favoriler));
}

function toggleFavori(id) {
  const favoriler = getFavoriler();
  const index = favoriler.indexOf(id);
  if (index > -1) {
    favoriler.splice(index, 1);
    saveFavoriler(favoriler);
    return false;
  } else {
    favoriler.push(id);
    saveFavoriler(favoriler);
    return true;
  }
}

function isFavori(id) {
  return getFavoriler().includes(id);
}

function formatFiyat(fiyat) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(fiyat);
}
