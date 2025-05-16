import { Cloudinary } from "@cloudinary/url-gen";
import { format } from "@cloudinary/url-gen/actions/delivery";

const cld = new Cloudinary({
  cloud: {
    // cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
    cloudName: `ddadanczt`,
  },
});

export const getPNGUrl = (publicId) => {
  const img = cld.image(publicId);
  img.delivery(format("png"));
  return img.toURL();
};

export const getPublicIdFromUrl = (url) => {
  if (!url.includes("/upload/")) return null;
  const parts = url.split("/upload/")[1];
  return parts.split(".")[0]; 
};
