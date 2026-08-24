import productControllr from "../controllers/productControllr.js";
import express from "express";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validationMiddlewares.js";
import { createProductSchema } from "../validators/productValidators.js";
const router = express.Router();

router.post("/", auth,validate(createProductSchema), productControllr.createProduct);
router.get("/", productControllr.getAllProduct);

router.patch("/:id", auth,productControllr.updateProduct);

router.delete("/:id", auth,productControllr.deleteProduct);

export default router;