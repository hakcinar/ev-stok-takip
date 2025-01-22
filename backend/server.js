// En üste ekleyin
require('dotenv').config();

// Gerekli modüllerin import edilmesi
const express = require('express');          // Web framework
const mongoose = require('mongoose');        // MongoDB için ORM
const cors = require('cors');               // Cross-Origin isteklerine izin vermek için

// Express uygulamasının oluşturulması
const app = express();

// Middleware'lerin tanımlanması
app.use(cors());                            // CORS politikasını aktif eder
app.use(express.json());                    // JSON formatındaki istekleri işlemek için

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log('MongoDB\'ye başarıyla bağlandı');
}).catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
});

// Test amaçlı basit bir route
app.get('/', (req, res) => {
    res.json({ message: 'Ev Stok Takip API çalışıyor' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const houseRoutes = require('./routes/houseRoutes');
const productRoutes = require('./routes/productRoutes');

// Route prefix'leri
app.use('/api/auth', authRoutes);     // /api/auth/*
app.use('/api/houses', houseRoutes);   // /api/houses/*
app.use('/api/products', productRoutes); // /api/products/*

// Statik dosyalar için
app.use('/uploads', express.static('uploads'));

// Sunucunun başlatılması
const PORT = process.env.PORT || 5000;       // Port numarası .env'den veya varsayılan 5000
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});