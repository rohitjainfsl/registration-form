const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getPNGUrl = (publicId: string) => {
  if (!cloudName) return "";
  const cleanId = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_png/${cleanId}`;
};

export const getPublicIdFromUrl = (url: string) => {
  if (!url.includes("/upload/")) return null;
  const parts = url.split("/upload/")[1];
  return parts.split(".")[0];
};
