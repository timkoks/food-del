import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://shtokaloandrii04:SBsR1dELNWdC3vZM@cluster0.pfgzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-del'
    )
    .then(() => console.log('DB Connected'));
};
