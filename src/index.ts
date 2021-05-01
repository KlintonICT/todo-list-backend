import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
dotenv.config();

import indexRouter from './routes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT || 4000}`);
});

module.exports = app;
