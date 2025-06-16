import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, updateTestReleaseStatus, deleteTest, CopyTest, getTestScores , TestScoreDetails, releaseResultsByMailchimp} from '../controllers/testController.js';
import { fileArr } from '../middlewares/multer.js';
import authMiddleware from '../middlewares/authJWT.js';

const router = express.Router();

router.post('/create',fileArr,createTest);
router.get('/test/:id',authMiddleware("adminToken"), getTestById);
router.get('/allTests', authMiddleware("adminToken", "studentToken"),getAllTests);
router.put('/update',authMiddleware("adminToken"), updateTest )
router.put("/update/:id", authMiddleware("adminToken"),updateTestReleaseStatus);
router.delete("/delete/:id",authMiddleware("adminToken"), deleteTest)
router.post('/copyTest', authMiddleware("adminToken"), CopyTest);
router.get("/testscore/:testId", authMiddleware("adminToken"), getTestScores);
router.get("/scoreDetails/:studentId/:testId", TestScoreDetails);
router.post("/releaseResult/:testId", releaseResultsByMailchimp);




export default router;
