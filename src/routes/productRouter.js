import { Router } from "express";
import { auth } from "../middleware/auth.js";
import ProductController from "../controller/product.controller.js";

const router = Router();

// GET /api/products - Accesible para todos
router.get("/", ProductController.getAllProducts);// Usando el controlador

// GET /api/products/:pid - Accesible para todos
router.get("/:pid", ProductController.getProductById);// Usando el controlador

// POST /api/products - Solo admin y premium
router.post("/", auth(["admin", "premium"]), ProductController.addProduct);// Usando el controlador

// PUT /api/products/:pid - Solo admin y premium (dueño del producto)
router.put("/:pid", auth(["admin", "premium"]), ProductController.getProductById);// Usando el controlador

// DELETE /api/products/:pid - Solo admin y premium (dueño del producto)
router.delete("/:pid", auth(["admin", "premium"]), ProductController.deleteProduct);// Usando el controlador

export default router;
