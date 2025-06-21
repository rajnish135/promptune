import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {

  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    
 await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
  `@cluster0.cfxb1se.mongodb.net/promptDB?retryWrites=true&w=majority&appName=Cluster0`);

    isConnected = true;

    console.log('MongoDB connected')
  } 
  catch (error) {
    console.log(error);
  }

}