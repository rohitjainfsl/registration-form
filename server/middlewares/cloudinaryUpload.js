import { v2 as cloudinary } from "cloudinary";

export async function cloudinaryUpload(images) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  //   console.log(images);
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
    console.log(result);
  }
  return Object.keys(result).length > 0 ? result : null;

  // Upload an image
  //   const uploadResult = await cloudinary.uploader
  //     .upload(
  //       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
  //       {
  //         public_id: "shoes",
  //       }
  //     )
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   console.log(uploadResult);
}
