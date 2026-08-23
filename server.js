import express from "express"
import connetDB from "./src/config/db.js"
import config from "./src/config/config.js";
import authRoutes from "./src/routes/authRoute.js";
const app = express()

connetDB();
app.use(express.json());
app.use("/api/auth",authRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})