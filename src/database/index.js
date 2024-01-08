import mongoose from "mongoose";

// const configOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const connectToDB = async () => {
  // const connectionUrl =
  "mongodb+srv://monjurahmed:yhgEPkCdn8Ntnytu@cluster0.ekjkrns.mongodb.net/";
  const connectionUrl = process.env.MONGODB_URL;

  mongoose
    // .connect(connectionUrl, configOptions)
    .connect(connectionUrl)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
