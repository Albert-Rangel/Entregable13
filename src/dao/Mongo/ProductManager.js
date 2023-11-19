
import productsService from '../../services/productsService.js';
const productService = new productsService()

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

export const getProducts = async (req, res) => {
  try {
    console.log("entro en el get products")
    let limit = 0;
    let page = 0
    let sort_ = null
    let query = null
    let swWeb = false
    if (req.limit != undefined) {

      swWeb = true
      limit = req.limit;
      page = req.page;
      sort_ = req.sort;
      query = req.query;
    } else {

      limit = parseInt(req.query.limit, 10) == 0 || req.query.limit == null ? 20 : parseInt(req.query.limit, 10);
      page = parseInt(req.query.page, 10) == 0 || req.query.page == null ? 1 : parseInt(req.query.page, 10);
      sort_ = req.query.sort;
      query = req.query.query;
    }

    const products = await productService.getProductWpaginviaService(limit, page, sort_, query)

    const isString = (value) => typeof value === 'string';
    if (isString(products)) {

      const arrayAnswer = ManageAnswer(products)
      return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      })
    }

    return swWeb ? products : res.send(products);
  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: `Se ha arrojado una exepcion: error`
    })
  }
}
export const addProduct = async (req, res) => {
  try {
    console.log("entro en addproduct")
    let swWeb = false
    let newproduct = {}
    if (req.body == undefined) {
      console.log("web")
      swWeb = true
      newproduct = req
    } else {
      newproduct = req.body

    }


    console.log("newproduct " + newproduct)

    console.log("swWeb " + swWeb)

    const answer = await productService.addProductviaService(newproduct);
    console.log("answer " + answer)

    const arrayAnswer = ManageAnswer(answer)
    const anwserObject = {
      status: arrayAnswer[0],
      message: arrayAnswer[1]
    }

    return swWeb ? arrayAnswer : res.send(arrayAnswer);

  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: `Se ha arrojado una exepcion: error`
    })
  }
}
export const getProducts_ = async (req, res) => {
  try {
    console.log("entro en no pagination")
    const products = await productService.getProductNpaginviaService();

    const isString = (value) => typeof value === 'string';

    if (isString(products)) {
      const arrayAnswer = ManageAnswer(products)
      const error = {
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      }
      console.log("entro en el error")
      return error
    }
    console.log("no es un string")
    return res.send(products);

  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: `Se ha arrojado una exepcion: error`
    })
  }
}
export const getProductById = async (req, res) => {
  try {
    console.log(req.params)

    const pid = req.params.pid
    const found = await productService.getProductbyIDviaService({ _id: pid });

    const isString = (value) => typeof value === 'string';

    if (isString(found)) {
      const arrayAnswer = ManageAnswer(found)
      const error = {
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      }
      return res.send(error);
    }
    return res.send(found);
  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: `Se ha arrojado una exepcion: error`
    })
  }
}
export const updateProduct = async (req, res) => {
  try {
    let pid = 0
    let swINtern = false
    let updatedproduct = {}

    if (req.params == undefined) {
      swINtern = true
      pid = req.pid;
      updatedproduct.stock = req.stock;

    } else {
      pid = req.params.pid
      updatedproduct = req.body
    }

    let answer = await productService.updateProductviaService(pid, updatedproduct);
    const arrayAnswer = ManageAnswer(answer)
    return swINtern ? answer : res.status(arrayAnswer[0]).send({
      status: arrayAnswer[0],
      message: arrayAnswer[1]
    })
  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: `Se ha arrojado una exepcion: error`
    })
  }
}
export const deleteProduct = async (req, res) => {
  try {
    let pid = 0

    if (req.params == undefined) {
      pid = req
    } else {
      pid = req.params.pid
    }

    let answer = await productService.deletProductviaService({ _id: pid });
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



