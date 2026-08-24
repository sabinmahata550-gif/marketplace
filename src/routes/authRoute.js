import { Router } from "express";
import authController from "../controllers/authController.js";
import validate from "../middlewares/validationMiddlewares.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

const router = Router();

router.post("/register",validate(registerSchema), authController.registerUser);
router.post("/login",validate(loginSchema), authController.loginUser);


export default router;