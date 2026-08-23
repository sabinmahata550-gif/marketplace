import mongoose from "mongoose";
import config from "./config.js";
const connetDB = async () => {
    try {
        await mongoose.connect(config.mongo_uri);
        console.log("database connect successfull.");
    } catch (erro) {
        console.log("database connect failed.", erro);
    }
}

export default connetDB;