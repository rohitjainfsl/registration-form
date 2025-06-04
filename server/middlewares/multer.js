import multer from "multer";
const storage = multer.memoryStorage();
export const fileArr = multer({ storage: storage }).any();  
