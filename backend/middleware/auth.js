const jwt = require('jsonwebtoken');    // JSON Web Token kütüphanesi import ediliyor

// Auth middleware fonksiyonu
const auth = (req, res, next) => {
    try {
        // İstek header'ından Authorization token'ı alınıyor
        // "Bearer " prefix'i kaldırılıyor (örn: "Bearer eyJhbGciOiJ...")
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Token'ın geçerliliği kontrol ediliyor
        // JWT_SECRET ile token decode ediliyor
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Decode edilen token'dan kullanıcı ID'si alınıp
        // request nesnesine ekleniyor (sonraki middleware'lerde kullanılabilir)
        req.userId = decoded.id;
        
        // Bir sonraki middleware'e geçiş
        next();
        
    } catch (error) {
        // Token geçersizse veya yoksa 401 hatası döndürülüyor
        res.status(401).json({ message: 'Lütfen giriş yapın' });
    }
};

module.exports = auth;    // Middleware'i dışa aktarıyoruz