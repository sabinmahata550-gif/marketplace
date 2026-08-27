import dotenv from "dotenv";
dotenv.config();

const config = {
    mongo_uri: process.env.MONGO_URI || "",
    port: process.env.PORT || "",
    jwt_secret: process.env.JWT_SECRET || "",
    cloud_name: process.env.CLOUD_NAME || "",
    cloud_api_key: process.env.CLOUD_API_KEY || "",
    cloud_api_secret: process.env.CLOUD_API_SECRET || "",
}

export default config;