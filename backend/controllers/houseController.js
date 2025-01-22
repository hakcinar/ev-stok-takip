const House = require('../models/House');

const houseController = {
    // Ev oluşturma
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const house = new House({
                name,
                owner: req.userId,  // Auth middleware'den gelen kullanıcı ID'si
                members: [req.userId] // Oluşturan kişi otomatik üye olur
            });
            await house.save();
            res.status(201).json(house);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Kullanıcının evlerini listele
    getMyHouses: async (req, res) => {
        try {
            const houses = await House.find({
                $or: [
                    { owner: req.userId },
                    { members: req.userId }
                ]
            });
            res.json(houses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Eve üye ekleme
    addMember: async (req, res) => {
        try {
            const { houseId, userId } = req.body;
            const house = await House.findById(houseId);
            
            if (!house) {
                return res.status(404).json({ message: 'Ev bulunamadı' });
            }

            if (house.owner.toString() !== req.userId) {
                return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
            }

            if (house.members.includes(userId)) {
                return res.status(400).json({ message: 'Kullanıcı zaten üye' });
            }

            house.members.push(userId);
            await house.save();
            res.json(house);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = houseController; 