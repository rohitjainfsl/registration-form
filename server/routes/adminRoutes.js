import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, updateTestReleaseStatus } from '../controllers/testController.js';
import { fileArr } from '../middlewares/multer.js';

const router = express.Router();

router.post('/create',
  fileArr,
  createTest
);
router.get('/test/:id', getTestById);
router.get('/allTests', getAllTests);
router.put('/update', updateTest )
router.put("/update/:id", updateTestReleaseStatus);

export default router;
