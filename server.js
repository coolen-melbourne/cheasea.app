import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import ProductsRoutes from './routes/product.js';
import Autroutes from './routes/auth.js';

// dirname olish
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dotenv
dotenv.config();

// Express app
const app = express();

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Husancha', resave: false, saveUninitialized: true }));
// HANDLEBARS TO‘G‘RI SOZLASH
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// STATIC PAPKA
app.use(express.static(path.join(__dirname, 'public')));

//connect-flash
app.use(flash());

// ROUTES
app.use(ProductsRoutes);
app.use(Autroutes);

// MONGOOSE CONNECT (Mongoose 7+ style, options olib tashlandi)
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // options yo‘q
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();
