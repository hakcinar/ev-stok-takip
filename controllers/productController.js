const Product = require('../models/Product');
const House = require('../models/House');

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
                addedBy: req.userId
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
                .populate('house', 'name')  // Evin sadece name alanını al
                .populate('addedBy', 'name'); // Ekleyen kullanıcının sadece name alanını al

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
                    addedBy: product.addedBy.name,
                    createdAt: product.createdAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController; 