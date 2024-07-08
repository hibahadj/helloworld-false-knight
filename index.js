import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';

import characterRoutes from './routes/characters.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const { connect, connection } = mongoose;
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
