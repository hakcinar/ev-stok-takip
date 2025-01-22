const Product = require('../models/Product');
const House = require('../models/House');
const cloudinary = require('../utils/cloudinary');

const productController = {
    // Ürün ekleme
    create: async (req, res) => {
        try {
            const { name, quantity, unit, houseId } = req.body;

            // Ev kontrolü
            const house = await House.findById(houseId);
            if (!house) {
                return res.status(404).json({ message: 'Ev bulunamadı' });
            }

            // Kullanıcının eve üye olup olmadığı kontrolü
            if (!house.members.includes(req.userId)) {
                return res.status(403).json({ message: 'Bu eve ürün ekleme yetkiniz yok' });
            }

            const product = new Product({
                name,
                quantity,
                unit,
                house: houseId,
                addedBy: req.userId,
                imageUrl: req.file ? req.file.path : null  // Cloudinary URL'i
            });

            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Eve ait ürünleri listele
    getByHouse: async (req, res) => {
        try {
            const { houseId } = req.params;
            
            // Ev kontrolü
            const house = await House.findById(houseId);
            if (!house) {
                return res.status(404).json({ message: 'Ev bulunamadı' });
            }

            // Kullanıcının eve üye olup olmadığı kontrolü
            if (!house.members.includes(req.userId)) {
                return res.status(403).json({ message: 'Bu evin ürünlerini görme yetkiniz yok' });
            }

            // Ürünleri ev bilgisiyle birlikte getir
            const products = await Product.find({ house: houseId })
                .populate('house', 'name')
                .populate('addedBy', 'name');

            res.json({
                house: {
                    id: house._id,
                    name: house.name
                },
                products: products.map(product => ({
                    id: product._id,
                    name: product.name,
                    quantity: product.quantity,
                    unit: product.unit,
                    imageUrl: product.imageUrl,  // Görsel URL'i eklendi
                    addedBy: product.addedBy.name,
                    createdAt: product.createdAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Ürün silme
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Ürün bulunamadı' });
            }

            // Ev kontrolü
            const house = await House.findById(product.house);
            if (!house.members.includes(req.userId)) {
                return res.status(403).json({ message: 'Bu ürünü silme yetkiniz yok' });
            }

            // Eğer ürünün görseli varsa Cloudinary'den de silelim
            if (product.imageUrl) {
                const publicId = product.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`ev-stok-takip/${publicId}`);
            }

            await Product.findByIdAndDelete(id);
            res.json({ message: 'Ürün başarıyla silindi' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Ürün güncelleme
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, quantity, unit } = req.body;
            
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Ürün bulunamadı' });
            }

            // Ev kontrolü
            const house = await House.findById(product.house);
            if (!house.members.includes(req.userId)) {
                return res.status(403).json({ message: 'Bu ürünü güncelleme yetkiniz yok' });
            }

            // Görsel varsa güncelle
            let imageUrl = product.imageUrl;
            if (req.file) {
                // Eski görseli sil
                if (product.imageUrl) {
                    const publicId = product.imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`ev-stok-takip/${publicId}`);
                }
                imageUrl = req.file.path;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    name: name || product.name,
                    quantity: quantity || product.quantity,
                    unit: unit || product.unit,
                    imageUrl
                },
                { new: true }
            ).populate('addedBy', 'name');

            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController; 