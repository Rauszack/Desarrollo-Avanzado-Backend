import { productMongoDAO } from "../dao/productMongoDAO.js"

class ProductsService{
    constructor(productRepository, ){
        this.productsRepository=productRepository
    }

    async getProducts(filtro={}){
        return await this.productsRepository.getProducts(filtro)
    }

    async createProduct(product){
        return await this.productsRepository.createProduct(product)
    }

}

export const ProductService=new ProductsService(new productMongoDAO)