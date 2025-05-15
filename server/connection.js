import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.log(error);
  }
}
// console.log(process.env.MONGO_PASSWORD)
// console.log(process.env.MONGO_USERNAME)
export default connectToDB;


// import mongoose from "mongoose";
// import "dotenv/config";

// async function connectToDB() {
//   try {
//     const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.tgir6dc.mongodb.net/fsl?retryWrites=true&w=majority&appName=Cluster0`;
//     await mongoose.connect(uri);
//     console.log("MongoDB connected successfully.");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }

// export default connectToDB;
