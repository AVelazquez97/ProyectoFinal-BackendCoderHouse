import mongoose from 'mongoose';
import { MONGO_URL } from "../config/index.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
