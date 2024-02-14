import { Router } from "express";
import { GetAllproductItems, deleteProduct, getProductById, productPost, updateProduct } from "../../controller/HomeController/productsController.js";
import { upload } from "../../middleware/categoryUpload.js";
const productRouter = Router();

productRouter.post('/products', upload.single('img'), productPost);
productRouter.get('/products', GetAllproductItems);
productRouter.get('/products/:id', getProductById);
productRouter.delete('/products/:id', deleteProduct);
productRouter.put('/products/:id', upload.single('img'), updateProduct);

export default productRouter;