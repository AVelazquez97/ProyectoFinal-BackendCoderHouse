import { Router } from 'express';

const router = Router();

/* ----------------------------- Orders router ---------------------------- */
router.get('/', (req, res) => {
  res.render('chat');
});

router.get('/:email', (req, res) => {
  res.render('chatEmail');
});

export default router;