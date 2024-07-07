import express from 'express';
import { connect, connection } from 'mongoose';
import morgan from 'morgan';
import { json } from 'body-parser';
require('dotenv').config();

import characterRoutes from './routes/characters';

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(json());

app.use('/api/characters', characterRoutes);

app.use((req, res, next) => {
  const error = new Error('error 404 | Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

// Connect to our database (Mongodb)
connect(process.env.MONGODB_URI);

connection.once('open', () => {
  console.log('Connected to the database MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
