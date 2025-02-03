
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



//"name": "George Orwell",
 // "bio":"George Orwell was an English novelist, essayist, journalist, and critic. He is best known for his novels 1984 and Animal Farm, which critique totalitarian regimes and explore themes of oppression and government control..."
 