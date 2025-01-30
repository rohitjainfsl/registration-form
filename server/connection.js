import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.tgir6dc.mongodb.net/`
      // `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
}
// console.log(process.env.MONGO_PASSWORD)
// console.log(process.env.MONGO_USERNAME)
export default connectToDB;
