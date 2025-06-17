import { Schema, model } from 'mongoose';

const attemptSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  startTime: { type: Date },
  endTime: { type: Date },
  score: { type: Number, default: 0 },
  responses: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question" },
      selectedOption: { type: String, enum: ['A', 'B', 'C', 'D'] },
      selectedAnswer: { type: String },
      correct_answer:  { type: String, ref: "Question" },
      _id: false
    }
  ]
}, {
  timestamps: true
});

const quizAttemptSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student" },
  studentName: { type: String },
  attempts: [attemptSchema]
}, {
  timestamps: true
});

quizAttemptSchema.index({ studentId: 1 }, { unique: true });
quizAttemptSchema.index({ "attempts.testId": 1 });
quizAttemptSchema.index({ "attempts._id": 1 });

const attemptQuiz = model("QuizAttempt", quizAttemptSchema);

export default attemptQuiz;
