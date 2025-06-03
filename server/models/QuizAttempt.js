import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String, required: true },
  collegeId: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  score: { type: Number, default: 0 },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedAnswer: String,
    },
  ],
});

export default mongoose.model("QuizAttempt", quizAttemptSchema);
