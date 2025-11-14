import { Router } from 'express';
import { productDBManager } from '../dao/productDBManager.js';
import { uploader } from '../utils/multerUtil.js';
import { auth } from '../middleware/auth.js';

const router = Router();
const ProductService = new productDBManager();

// GET /api/products - Accesible para todos
router.get('/', async (req, res) => {
    try {
        const result = await ProductService.getAllProducts(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET /api/products/:pid - Accesible para todos
router.get('/:pid', async (req, res) => {
    try {
        const result = await ProductService.getProductById(req.params.pid);
        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST /api/products - Solo admin y premium
router.post('/', auth(['admin', 'premium']), async (req, res) => {
    try {
        const result = await ProductService.addProduct(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// PUT /api/products/:pid - Solo admin y premium (dueño del producto)
router.put('/:pid', auth(['admin', 'premium']), async (req, res) => {
    try {
        // Verificar si el usuario premium es el dueño del producto
        if (req.user.role === 'premium') {
            const result = await ProductService.getProductById(req.params.pid);
            if (product.owner !== req.user._id.toString()) {
                return res.status(403).json({ 
                    error: 'Solo puedes modificar tus propios productos' 
                });
            }}
        const updatedProduct = await ProductService.updateProduct(req.params.pid, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// DELETE /api/products/:pid - Solo admin y premium (dueño del producto)
router.delete('/:pid', auth(['admin', 'premium']), async (req, res) => {
    try {
        // Verificar si el usuario premium es el dueño del producto
        if (req.user.role === 'premium') {
            const result = await ProductService.getProductById(req.params.pid);
            if (result.owner !== req.user._id.toString()) {
                return res.status(403).json({ 
                    error: 'Solo puedes eliminar tus propios productos' 
                });
            }
        }

        await ProductService.deleteProduct(req.params.pid);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.path);
        });
    }

    try {
        const result = await ProductService.createProduct(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:pid', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await ProductService.updateProduct(req.params.pid, req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:pid', async (req, res) => {

    try {
        const result = await ProductService.deleteProduct(req.params.pid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;