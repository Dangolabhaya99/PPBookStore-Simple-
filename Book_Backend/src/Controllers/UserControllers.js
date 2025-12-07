const User = require("../Models/UserModels");
const createUser = async (req, res) => {
    const { name, phone, email, address, role } = req.body;
    const addUser = new User({
        name: name,
        phone: phone,
        email: email,
        address: address,
        role: role
    });
    try {
        const response = await addUser.save();
        if (response) {
            res.status(201).json({ message: "user created Successfully", response })
        }
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", err })
    }
};

module.exports = createUser;