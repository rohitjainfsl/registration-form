import { v2 as cloudinary } from "cloudinary";

export async function cloudinaryUpload(images) {
  const results = [];
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  for (let i = 0; i < images.length; i++) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(images[0].buffer);
    });
    results.push(result);
  }
  return results.length > 0 ? results : null;

 
}
