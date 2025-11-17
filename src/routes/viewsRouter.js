import { Router } from "express";
import { productMongoDAO } from "../dao/productMongoDAO.js";
import { cartMongoDAO } from "../dao/cartMongoDAO.js";
import  viewsController  from "../controller/views.controller.js";

const router = Router();
const ProductService = new productMongoDAO();
const CartService = new cartMongoDAO(ProductService);

router.get("/products", viewsController.getAllProducts);

router.get("/cart/:cid", viewsController.getProductsFromCartByID);

export default router;
