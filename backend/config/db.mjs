
import dotenv from 'dotenv';
import sequelize from './sequelize.mjs';
dotenv.config();


const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

export default  connectDB ;
