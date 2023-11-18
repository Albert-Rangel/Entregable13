
import ProductsRepository from '../../repository/productsRepository.js';
export const productRepository = new ProductsRepository()


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

export const addProduct = async (req, res, next) => {
  try {
    let newproduct = req.body
    const { title, description, price, thumbnail, code, stock, status, category } = newproduct;
    const answer = await productRepository.addProduct(title, description, price, thumbnail, code, stock, status, category);

    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
      status: arrayAnswer[0],
      message: arrayAnswer[1]
    })

    // return answer
  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}
export const getProducts_ = async (req, res, next) => {
  try {
    const products = await productRepository.getProductNpagin();

    const isString = (value) => typeof value === 'string';
    if (isString(products)) {
      const arrayAnswer = ManageAnswer(products)
      return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      })
    }

    return res.send({ productObject: products });


    // return products;

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}

export const getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) == 0 || req.query.limit == null ? 10 : parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10) == 0 || req.query.page == null ? 1 : parseInt(req.query.page, 10);
    const sort_ = req.query.sort;
    const query = req.query.query;

    const products = await productRepository.getProductWpagin(limit, page, sort_, query)

    const isString = (value) => typeof value === 'string';
    if (isString(products)) {
      const arrayAnswer = ManageAnswer(products)
      return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      })
    }

    return res.send({ productObject: products.docs });

    // return products

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const pid = req.params.pid
    const found = await productRepository.getProductbyID({ _id: pid });

    const isString = (value) => typeof value === 'string';
    if (isString(found)) {
      const arrayAnswer = ManageAnswer(found)
      return res.status(arrayAnswer[0]).send({
        status: arrayAnswer[0],
        message: arrayAnswer[1]
      })
    }
    return res.send(found);

  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const pid = req.params.pid
    let updatedproduct = req.body;
    const answer = await productRepository.updateProduct(pid, updatedproduct);
    const arrayAnswer = ManageAnswer(answer)
    return res.status(arrayAnswer[0]).send({
      status: arrayAnswer[0],
      message: arrayAnswer[1]
    })
  } catch (error) {
    return `ERR|Error generico. Descripcion :${error}`
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const pid = req.params.pid
    const answer = await productRepository.deletProduct({ _id: pid });
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





