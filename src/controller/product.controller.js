class ProductController {
  static getAllProducts = async (req, res) => {
    try {
      const result = await ProductService.getAllProducts(req.query);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getProductById = async (req, res) => {
    try {
      const result = await ProductService.getProductById(req.params.pid);
      if (!result) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static addProduct = async (req, res) => {
    try {
      const result = await ProductService.addProduct(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static getProductById = async (req, res) => {
    try {
      // Verificar si el usuario premium es el dueño del producto
      if (req.user.role === "premium") {
        const result = await ProductService.getProductById(req.params.pid);
        if (product.owner !== req.user._id.toString()) {
          return res.status(403).json({
            error: "Solo puedes modificar tus propios productos",
          });
        }
      }
      const updateProduct = await ProductService.updateProduct(
        req.params.pid,
        req.body
      );
      res.json(updateProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      // Verificar si el usuario premium es el dueño del producto
      if (req.user.role === "premium") {
        const result = await ProductService.getProductById(req.params.pid);
        if (result.owner !== req.user._id.toString()) {
          return res.status(403).json({
            error: "Solo puedes eliminar tus propios productos",
          });
        }
      }
      await ProductService.deleteProduct(req.params.pid);
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

}

export default ProductController;