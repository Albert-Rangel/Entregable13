
import { userModel } from '../dao/models/user.model.js';
import { productsModel } from '../dao/models/products.model.js';
import { logger } from '../utils/logger.js';

export default class usersService {

    async changeRol(uid) {
        try {


            var newRol = ""
            const user = await userModel.find({ _id: uid });
            const role = user[0].role

            if (role === "User" || role === "user") {

                newRol = "Premium"
                await userModel.updateOne(
                    { "_id": uid },
                    { $set: { role: "Premium" } }
                )

            } else if (role === "Premium" || role === "premium") {

                newRol = "User"
                await userModel.updateOne(
                    { "_id": uid },
                    { $set: { role: "User" } }
                )
            }

            return `SUC|` + newRol
        } catch (error) {
            logger.error("Error en UseressService/changeRol: " + error)
            return `ERR|Error generico. Descripcion :${error}`
        }
    }

    async verifyProductPermission(uid, pid) {
        try {
            //obtener el email y el role del usuario logeado
            
            const user = await userModel.find({ _id: uid });
            const role = user[0].role

            const emailuser = user[0].email

            //Si es premium validar que ese email sea el mismo email del producto
            if (role === "Premium" || role === "premium") {
                const product = await productsModel.find({ _id: pid });
                const emailproduct = product[0].owner

                if(emailproduct != emailuser) return false
            }

            //retornar true or false
            return true
        } catch (error) {
            logger.error("Error en UseressService/changeRol: " + error)
            return false
        }
    }

}