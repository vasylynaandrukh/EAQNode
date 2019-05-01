const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');

module.exports = async (req, res)=>{
    try {
        const Drink = dataBase.getModel('Drink');


        const drinkForDelete = req.params.name;


        if (!drinkForDelete)throw  new Error('No drink');

       const token =  req.get('Authorization');

       if (!token) throw new Error('No token');

       const { id:cId}= tokenVerificator(token, secret);

       const isRegisteredCafe = await Drink.findOne({
            where:{
                cafe_id: cId
            }
       });
       if (!isRegisteredCafe) throw new Error('Cafe is not registered cafe!');

           await Drink.destroy({
               where:{
                   name: drinkForDelete,
                   cafe_id: cId
               }
           });


        res.json({
            success:true,
            message: `Drink ${drinkForDelete} successfully deleted`
        });

    }catch (e) {
        console.log(e);
        res.json({
            success:false,
            message: e.message
        });
    }
};


