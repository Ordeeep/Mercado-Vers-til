const User = require('../models/User')

const createUser = async (request, response) => {
    const { name, age, approved } = request.body;
    const user = {
        name,
        age,
        approved,
    };
    try {
        await User.create(user);
        response.status(201).json({ msg: 'Pessoa inserida' });
    } catch (error) {
        response.status(500).json({ error: error });
    }
};

module.exports = {
    createUser,
};