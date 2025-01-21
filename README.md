# Ev Stok Takip Uygulaması

Aile bireyleri için ev içi gıda ve temel ihtiyaç malzemelerinin stok takibini yapabilen mobil uygulama.

## Özellikler
- Ev oluşturma ve yönetme
- Aile üyelerini davet etme
- Ürün ekleme ve stok takibi
- Ürün tüketim kaydı
- Gerçek zamanlı stok güncelleme
- Alışveriş listesi oluşturma

## 1. Planlama Aşaması
1.1. Veritabanı Şeması
   - Kullanıcılar
   - Evler
   - Ev Üyelikleri
   - Ürünler
   - Stok Hareketleri

1.2. Kullanıcı Rolleri
   - Ev Sahibi
   - Ev Üyesi

1.3. API Endpoints Planlaması

## 2. Backend Geliştirme (Node.js & Express.js)
2.1. Temel Kurulum
   - Express.js projesi oluşturma
   - MongoDB bağlantısı
   - Middleware yapılandırması

2.2. Kullanıcı İşlemleri
   - Kayıt
   - Giriş
   - Profil yönetimi

2.3. Ev Yönetimi
   - Ev oluşturma
   - Üye davet etme
   - Üye yönetimi

2.4. Ürün Yönetimi
   - Ürün ekleme
   - Stok güncelleme
   - Ürün silme

## 3. Frontend Geliştirme (React Native)
3.1. Proje Kurulumu
   - React Native projesi oluşturma
   - Navigation yapısı
   - State management (Redux/Context)

3.2. Ekranlar
   - Giriş/Kayıt
   - Ana Sayfa
   - Ev Detay
   - Ürün Listesi
   - Ürün Detay
   - Profil
   - Ayarlar

3.3. Bileşenler
   - Ürün Kartı
   - Stok Güncelleme Modalı
   - Üye Davet Formu
   - Alışveriş Listesi

## 4. Veritabanı Şeması
4.1. Kullanıcı Modeli
   - Ad Soyad
   - E-posta
   - Şifre
   - Profil Bilgileri

4.2. Ev Modeli
   - İsim
   - Adres
   - Ev Sahibi
   - Üyeler

4.3. Ürün Modeli
   - İsim
   - Miktar
   - Birim
   - Kategori
   - Ev ID
   - Ekleyen Kullanıcı

4.4. Stok Hareket Modeli
   - Ürün ID
   - İşlem Tipi (Ekleme/Çıkarma)
   - Miktar
   - Tarih
   - Kullanıcı ID

## 5. API Endpoints
5.1. Kullanıcı Routes
5.2. Ev Routes
5.3. Ürün Routes
5.4. Stok Routes

## 6. Güvenlik
6.1. JWT Implementasyonu
6.2. Input Validasyonu
6.3. Yetkilendirme Kontrolleri

## 7. Test ve Deployment
7.1. API Testleri
7.2. Uygulama Testleri
7.3. App Store ve Play Store Hazırlığı

## Kurulum
