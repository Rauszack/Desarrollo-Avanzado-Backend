import { Router } from "express";
import { productDBManager } from "../dao/productDBManager.js";
import { cartDBManager } from "../dao/cartDBManager.js";
import  viewsController  from "../controller/views.controller.js";

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

router.get("/products", viewsController.getAllProducts);

router.get("/cart/:cid", viewsController.getProductsFromCartByID);

export default router;
