const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');
const userRole = require('../../config/userRoles');
module.exports = async (req,res)=>{
    try {
        const Cafe = dataBase.getModel('Cafe');

        const {admin} = userRole;

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const { name: nameFromToken} = tokenVerificator(token, secret);
        if (nameFromToken !== admin) throw new Error('You are not admin');

        const cafes = await Cafe.findAll({});
        if (!cafes)throw new Error('No cafes exist');
        res.json({
            success:true,
            message: cafes
        });

    }catch (e) {
        console.log(e);
        res.json({
           success: false,
           message: e.message
        });

    }
};
