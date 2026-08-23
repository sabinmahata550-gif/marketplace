import productControllr from "../controllers/productControllr.js";
import express from "express";
import auth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", auth, productControllr.createProduct);
router.get("/", productControllr.getAllProduct);

router.patch("/:id", auth,productControllr.updateProduct);

router.delete("/:id", auth,productControllr.deleteProduct);

export default router;