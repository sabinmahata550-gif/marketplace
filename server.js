import express from "express"
import connetDB from "./src/config/db.js"
import config from "./src/config/config.js";
import authRoutes from "./src/routes/authRoute.js";
import prodctRoutes from "./src/routes/productRoute.js";
import multer from "multer";
import connectCloudinary from "./src/config/cloudinary.js";
import userRoute from "./src/routes/userRoute.js";
const upload = multer({ storage: multer.memoryStorage() })

const app = express()

connetDB();
connectCloudinary()
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/products", upload.array("image", 5), prodctRoutes)
app.use("/api/users",userRoute);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})