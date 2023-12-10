
import { logger } from '../../utils/logger.js';
import usersService from '../../services/usersService.js';

const UserService = new usersService()

function ManageAnswer(answer) {
  const arrayAnswer = []
  if (answer) {
    const splitString = answer.split("|");
    switch (splitString[0]) {
      case "E01":
        arrayAnswer.push(400)
        arrayAnswer.push(splitString[1])
        return arrayAnswer
        break;
      case "E02":
        arrayAnswer.push(404)
        arrayAnswer.push(splitString[1])
        return arrayAnswer
        break;
      case "SUC":
        arrayAnswer.push(200)
        arrayAnswer.push(splitString[1])
        return arrayAnswer
        break;
      case "ERR":
      default:
        arrayAnswer.push(500)
        arrayAnswer.push(splitString[1])
        return arrayAnswer
        break;
    }
  }
}
export const changeRol = async (req, res) => {
  try {
    var uid = req.params.uid

    let answer = await UserService.changeRol(uid)

    const arrayAnswer = ManageAnswer(answer)

    
    req.session.user.role = arrayAnswer[1]


    res.redirect("/products")

  } catch (error) {
    logger.error("Error en UsertManager/changeRol: " + error)
    return res.status(500).send({
      status: "500",
      message: `Error occured in UsertManager in changeRol`
    })
  }
}





