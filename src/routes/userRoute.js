import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


// Get all users
router.get(
    "/",
    auth,
    userController.getAllUser
);

router.patch(
    "/:id/role",
    auth,
    userController.updateUserRole
);

// Get logged-in user's profile image update
router.patch(
    "/profile",
    auth,
    upload.single("profile"),
    userController.updateProfile
);


// Get user by ID
router.get(
    "/:id",
    auth,
    userController.getById
);


// Update user
router.patch(
    "/:id",
    auth,
    userController.updateUser
);


// Delete user
router.delete(
    "/:id",
    auth,
    userController.deleteUser
);


// Update user role


export default router;