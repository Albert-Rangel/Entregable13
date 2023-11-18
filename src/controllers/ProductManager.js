
import productsService from '../services/productsService.js';
const productService = new productsService()

class ProductManager {

  async addProduct(ObjectProduct) {
    try {
      const answer = await productService.addProductviaService(ObjectProduct);
      return answer
    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }
  async getProducts_() {
    try {
      const products = await productService.getProductNpaginviaService();
      return products;

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getProducts(limit, page, sort_, query) {
    try {

      const products = await productService.getProductWpaginviaService(limit, page, sort_, query)

      return products

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getProductById(pid) {
    try {
      const found = await productService.getProductbyIDviaService({ _id: pid });
     
      return found;

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async updateProduct(pid, product) {
    try {

      return await productService.updateProductviaService(pid, product);

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async deleteProduct(pid) {
    try {

      return await productService.deletProductviaService({ _id: pid });

    }
    catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }
}

export default ProductManager;
