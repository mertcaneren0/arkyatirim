# Emlak Admin Paneli

## Son Geliştirmeler (Admin Paneli)

### Admin Giriş Ekranı
- Material UI (MUI) ile modern ve responsive tasarım
- Koyu tema entegrasyonu
- Form validasyonu ve hata mesajları
- Responsive logo ve başlık alanı
- Mobil uyumlu input alanları ve butonlar
- Güvenli token tabanlı kimlik doğrulama

### Admin Dashboard
- Material UI tabanlı modern arayüz
- Responsive tasarım (mobil ve masaüstü uyumlu)
- Üç ana sekme:
  1. İlanlar
  2. İlan Formları
  3. Kariyer Formları

#### İlanlar Sekmesi Özellikleri
- İlan ekleme/düzenleme/silme işlemleri
- Detaylı ilan tablosu (masaüstü görünümü)
  - Başlık, tip, fiyat, metrekare, konum, adres, açıklama, özellikler
  - Şehir ve ilçe ayrı satırlarda gösterim
  - Özel alanlar (ada, parsel, pafta) kırmızı renkte vurgulama
- Mobil uyumlu kart görünümü
- Çoklu resim yükleme desteği
- Dinamik form alanları (mülk tipine göre)

#### İlan Formu Özellikleri
- Mülk tipine göre dinamik alanlar:
  - Daire/İşyeri: Kat, ısıtma tipi, mutfak tipi, otopark, eşya durumu, site durumu
  - Arsa/Tarla: Ada, parsel, pafta numaraları
- Çoklu resim yükleme
- Form validasyonu
- Responsive tasarım

#### Genel Özellikler
- Token tabanlı güvenli kimlik doğrulama
- Oturum yönetimi
- Responsive tasarım
- Koyu tema
- Modern ve kullanıcı dostu arayüz
- Hata yönetimi ve bildirimler

## Teknik Detaylar
- Frontend: React (Vite) + Material UI
- Backend: Node.js (Express) + MongoDB
- API: RESTful
- Kimlik Doğrulama: JWT
- Resim Yükleme: Multer
- Form Yönetimi: React Hook Form
- Bildirimler: React Hot Toast

## Kurulum
```bash
# Projeyi klonlayın
git clone [repo-url]

# Backend kurulumu
cd server
npm install
# .env dosyasını oluşturun (örnek: .env.example dosyasını kopyalayın)
cp .env.example .env
# .env dosyasını düzenleyin
npm run dev

# Frontend kurulumu
cd ../client
npm install
npm run dev
```

## Gerekli Çevre Değişkenleri
Backend için `.env` dosyasında aşağıdaki değişkenleri tanımlayın:
```env
# Örnek .env yapısı (gerçek değerleri kullanmayın)
PORT=5001
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secret_key
```

## Güvenlik Notları
- `.env` dosyasını asla GitHub'a pushlamayın
- JWT secret key'i güçlü ve benzersiz olmalı
- MongoDB URI'yi production ortamında güvenli bir şekilde yapılandırın
- Upload dizinini `.gitignore`'a ekleyin
- Hassas bilgileri (API anahtarları, şifreler vb.) environment variables olarak saklayın

## Sonraki Adımlar
- [ ] Kullanıcı yönetimi (admin ekleme/silme)
- [ ] İlan istatistikleri
- [ ] Toplu ilan işlemleri
- [ ] Gelişmiş filtreleme ve arama
- [ ] Resim optimizasyonu
- [ ] Loglama sistemi 