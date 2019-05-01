const dataBase = require('../../dataBase').getInstance();
const tokenVerify = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');
const userRoles = require('../../config/userRoles');
module.exports = async (req, res) => {
    try {
        const Cafe = dataBase.getModel('Cafe');

        const nameCafeForDelete = req.params.name;
        if (!nameCafeForDelete) throw  new Error('No cafe for delete ');

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {admin} = userRoles;

        const {name: nameFromToken} = tokenVerify(token, secret);
        if (nameFromToken !==admin) throw new Error('You are not admin');
               await Cafe.destroy({
                where: {
                    name
                }
            });

        res.json({
            success: true,
            message: `Cafe ${name} successfully deleted`
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};


