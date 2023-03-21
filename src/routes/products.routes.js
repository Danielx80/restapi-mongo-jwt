import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken, isAdmin, isModerator } from "../middlewares/index";

const router = Router();

router.post("/", [verifyToken, isModerator], productsCtrl.createProduct);
router.get("/", productsCtrl.getProducts);
router.get("/:productId", productsCtrl.getProductById);
router.put(
  "/:productId",
  [verifyToken, isAdmin],
  productsCtrl.updateProductById
);
router.delete(
  "/:productId",
  [verifyToken, isAdmin],
  productsCtrl.deleteProductById
);

// Antes de ponerle authenticacion a las rutas
// router.post("/",  productsCtrl.createProduct);
// router.get("/", productsCtrl.getProducts);
// router.get("/:productId", productsCtrl.getProductById);
// router.put("/:productId", productsCtrl.updateProductById);
// router.delete("/:productId", productsCtrl.deleteProductById);

export default router;
