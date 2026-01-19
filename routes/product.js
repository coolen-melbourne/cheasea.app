import { Router } from 'express';

const router = Router();

// ROUTES
router.get('/', (req, res) => {
  res.render('homePage');
  token: true;
});

router.get('/kroy', (req, res) => {
  res.render('kroy', { title: 'Kroy page || MILANA' });
  isKroy: true;
});

router.get('/aksessuar', (req, res) => {
  res.render('aksessuar', { title: 'Aksessuar Page || MILANA' });
});

router.get('/1sex', (req, res) => {
  res.render('1sex', { title: '1-sex page || MILANA' });
  isTikuv: true;
});

router.get('/2sex', (req, res) => {
  res.render('2sex', { title: '2-sex page || MILANA' });
});

router.get('/3sex', (req, res) => {
  res.render('3sex', { title: '3-sex page || MILANA' });
});

router.get('/nazoratchi', (req, res) => {
  res.render('nazoratchi', { title: 'Control page || MILANA' });
});

router.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin Page || MILANA' });
});

export default router;
