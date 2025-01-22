const multer = require('multer');
const path = require('path');

// Dosya depolama ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // uploads klasörüne kaydet
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // benzersiz isim
    }
});

// Dosya filtresi
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {  // sadece resim dosyaları
        cb(null, true);
    } else {
        cb(new Error('Sadece resim yüklenebilir!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // max 5MB
    }
});

module.exports = upload; 