import { Router } from "express";
import { productMongoDAO } from "../dao/productMongoDAO.js";
import { cartMongoDAO } from "../dao/cartMongoDAO.js";
import CartController from "../controller/cart.controller.js";

const router = Router();
const ProductService = new productMongoDAO();
const CartService = new cartMongoDAO(ProductService);

router.get("/:cid", CartController.getProductsFromCartByID);// Usando el controlador

router.post("/", CartController.createCart);// Usando el controlador

router.post("/:cid/product/:pid", CartController.addProductByID);// Usando el controlador

router.delete("/:cid/product/:pid", CartController.deleteProductByID);// Usando el controlador

router.put("/:cid", CartController.updateAllProducts);// Usando el controlador

router.put("/:cid/product/:pid", CartController.updateProductByID);// Usando el controlador

router.delete("/:cid", CartController.deleteAllProducts);// Usando el controlador

export default router;
