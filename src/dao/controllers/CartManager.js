import CartsRepository from '../../repository/cartRepository.js'
const cartsRepository = new CartsRepository()

export const getCartById = async (req, res, next) => {
  try {
    const cid = req.params.cid
    const CartById = await cartsRepository.getCartbyID(cid)
    const isString = (value) => typeof value === 'string';

    if (isString(CartById)) {
        const arrayAnswer = ManageAnswer(CartById)
        return res.status(arrayAnswer[0]).send({
            status: arrayAnswer[0],
            message: arrayAnswer[1]
        })
    }

    return res.send(CartById);

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const getProductsinCartById = async (req, res, next) => {
  try {
    const cid = req.params.cid

    const cartObject = await cartsRepository.getProductsinCartbyID(cid)

    const isString = (value) => typeof value === 'string';
    if (isString(cartObject)) {
        const arrayAnswer = ManageAnswer(cartObject)
        return res.status(arrayAnswer[0]).send({
            status: arrayAnswer[0],
            message: arrayAnswer[1]
        })
    }
    return res.send(cartObject);

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const getCarts = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const allCarts = await cartsRepository.getcarts();
    const isString = (value) => typeof value === 'string';
    if (isString(allCarts)) {
        const arrayAnswer = ManageAnswer(allCarts)
        return res.status(arrayAnswer[0]).send({
            status: arrayAnswer[0],
            message: arrayAnswer[1]
        })
    }
    if (limit) {

        return res.send(allCarts.slice(0, limit));
    }
    return res.send(allCarts.sort((a, b) => a.id - b.id));

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const addCartasync = async (req, res, next) => {

  try {
    const answer = await cartsRepository.addCart()
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const addCartProducts = async (req, res, next) => {

  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const answer = await cartsRepository.addCartProducts(pid, cid)
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const deleteCartProduct = async (req, res, next) =>{
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const answer =  await cartsRepository.deleteCartProduct(pid, cid)
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })
  }
  catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const deleteCart = async (req, res, next) => {
  try {
    const cid = req.params.cid
    const answer =  await cartsRepository.deleteCart({ _id: cid })
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })
  }
  catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const deleteAllCartProducts = async (req, res, next) => {
  try {
    const cid = req.params.cid
    const answer = await cartsRepository.deleteAllCartProducts(cid)
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })
  }
  catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const updateCartProductQuantity = async (req, res, next) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    let quantity_ = req.body
    const answer = await cartsRepository.updateProductQuantity(pid, cid, quantity_)
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })
  }
  catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const updateCartProducts = async (req, res, next) => {
  try {
    const cid = req.params.cid
    let products = req.body
    const answer = await cartsRepository.updateCartProducst(cid, products)
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
    })
  }
  catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}

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



