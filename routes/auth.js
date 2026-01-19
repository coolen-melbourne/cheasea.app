import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../services/token.js';

const router = Router();

//LOGIN qismi
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login Page || MILANA',
    isLogin: true,
    loginError: req.flash('loginError'),
  });
});

router.post('/login', async (req, res) => {
  const { position, password } = req.body;

  if (!position || !password) {
    req.flash('loginError', 'Hammasini to‘ldiring');
    return res.redirect('/login');
  }

  const existUser = await User.findOne({ position });
  if (!existUser) {
    req.flash('loginError', 'User not found');
    return res.redirect('/login');
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    req.flash('loginError', 'Password is wrong');
    return res.redirect('/login');
  }

  // Agar hammasi to‘g‘ri bo‘lsa
  res.redirect('/');
});

//REGISTER qismi
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register Page || MILANA',
    registerError: req.flash('registerError'),
    registerSuccess: req.flash('registerSuccess'),
  });
});

router.post('/register', async (req, res) => {
  const { position, password, confirmPassword, firstName, lastName, number } = req.body;

  if (!position || !password || !confirmPassword) {
    req.flash('registerError', 'Hammasini to‘ldiring');
    return res.redirect('/register');
  }

  if (password !== confirmPassword) {
    req.flash('registerError', 'Parollar mos emas');
    return res.redirect('/register');
  }

  const existUser = await User.findOne({ position });
  if (existUser) {
    req.flash('registerError', 'Bunday user allaqachon mavjud');
    return res.redirect('/register');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    firstName,
    lastName,
    position,
    number,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  };

  const newUser = await User.create(userData);

  // JWT yaratish va cookie-ga set qilish
  const token = generateJWTToken(newUser._id);
  res.cookie('token', token, { httpOnly: true, secure: false }); // dev uchun secure: false
  console.log('JWT token:', token);

  req.flash('registerSuccess', 'Ro‘yxatdan o‘tish muvaffaqiyatli!');
  res.redirect('/login');
});

export default router;
