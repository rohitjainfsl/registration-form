import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
}
export default connectToDB;
