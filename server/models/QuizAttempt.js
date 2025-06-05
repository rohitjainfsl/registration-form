import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  score: { type: Number, default: 0 },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOption: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
      selectedAnswer: { type: String, required: true },
      _id: false // Disable _id for responses subdocuments to keep them simple
    },
  ],
}, {
  timestamps: true // Add timestamps to track when attempts are created/updated
});

const quizAttemptSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
  studentName: { type: String, required: true },
  collegeId: { type: String },
  attempts: [attemptSchema],
}, {
  timestamps: true // Add timestamps to track when quiz attempts are created/updated
});

// Add indexes for better query performance
quizAttemptSchema.index({ studentId: 1 });
quizAttemptSchema.index({ "attempts.testId": 1 });
quizAttemptSchema.index({ "attempts._id": 1 });

export default mongoose.model("QuizAttempt", quizAttemptSchema);