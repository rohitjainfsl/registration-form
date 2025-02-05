import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  try {
    await mongoose.connect(
<<<<<<< HEAD
      // `mongodb+srv://${dheerajjangid013}:${dheeraj}@cluster0.tgir6dc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
=======
      // `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.tgir6dc.mongodb.net/`
>>>>>>> 7d0b635275a05ef6739b741179014bdb03585497
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
}
// console.log(process.env.MONGO_PASSWORD)
// console.log(process.env.MONGO_USERNAME)
export default connectToDB;
