// import {v2 as cloudinary} from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config({ path: "./backend/.env" });

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Validate env (good for production)
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
	console.error("❌ Cloudinary config missing environment variables");
	throw new Error("Cloudinary environment variables not set");
}

// Configure
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true, // forces https CDN urls (recommended)
});

// Passive log (optional)
console.log("☁️ Cloudinary Initialized");

export default cloudinary;
