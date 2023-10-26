import { Router } from 'express';

const router = Router();

// * http://localhost:3000/apiEcomerce/1.0/empresas/
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hola desde la ruto get de empresas' });
});

export default router;
