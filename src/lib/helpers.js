const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // El numero indica las veces que se debe cifrar,
    //entre mayor sea el número mas segura será el cifrado pero tomará mas tiempo y recursos
    const hash = await bcrypt.hash(password, salt);
    
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;
    