class ProductsRepository{
    constructor(dao){
        this.productsDAO=new dao()
    }

    async getProducts(filtro={}){
        return await this.productsDAO.get(filtro)
    }

    async getProductById(id){
        return await this.productsDAO.getBy({_id:id})
    }

    async createProduct(product){
        return await this.productsDAO.save(product)
    }
}

export default ProductsRepository;