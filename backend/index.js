const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

// ⬇️ Handle JSON requests
app.use(express.json({ limit: '50mb' }));  
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
const registerRoutes = require('./routes/registerRoutes');
app.use('/api/registers', registerRoutes);

// MongoDB connection + start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000, () => console.log('✅ Server running on port 4000')))
  .catch(err => console.log('❌ DB connection error:', err));
