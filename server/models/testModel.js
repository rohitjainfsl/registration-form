import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    text: { type: String },
    fileUrl: { type: String },
  },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true },
  codeSnippet: { type: String },
});


const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    numQuestions: { type: Number, required: true },
    duration: { type: Number, required: true },
    questions: [questionSchema],
    released: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Test', testSchema);
