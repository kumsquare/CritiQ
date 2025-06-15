import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.mjs';
import authorRoutes from './routes/authorRoutes.mjs';
import bookRoutes from './routes/bookRoutes.mjs';
import favouriteRoutes from './routes/favouriteRoutes.mjs';
import reviewRoutes from './routes/reviewRoutes.mjs';
import  connectDB  from './config/db.mjs';
import sequelize from './config/sequelize.mjs';
import cors from 'cors';
import './model/users.mjs';
import './model/authors.mjs';
import './model/books.mjs';
import './model/favourites.mjs';
import './model/reviews.mjs';
import './model/assosiation.mjs';
import initializeModels from './model/index.mjs'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({ origin: "*" }));
 
// Connect to database
connectDB();

// Initialize models
initializeModels();


// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/reviews', reviewRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});



const startServer = async () => {
  try {
    // Log the sequelize instance to check its type
    console.log(sequelize.constructor.name);  // Should print "Sequelize"
    
    // Check if authenticate is available
    if (sequelize.authenticate) {
      await sequelize.authenticate();  // Test connection
      console.log('Database connected successfully');
    } else {
      console.error('authenticate() method is not available on sequelize');
    }

    await sequelize.sync({ force: false });  // Sync models with DB
    console.log('Database synchronized');

    // Your server logic to start the server goes here
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();

app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});