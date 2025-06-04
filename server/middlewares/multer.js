import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const fileArr = upload.fields([
  { name: "aadharFront", maxCount: 1 },
  { name: "aadharBack", maxCount: 1 },
  {name:"questionimage", maxCount:50},
]);