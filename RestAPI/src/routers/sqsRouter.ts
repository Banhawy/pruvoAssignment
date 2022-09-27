import { Request, Response, Router } from 'express';
import { SendSQSMessage } from '../controllers/sqsController';

const router = Router()

router.get('/', (req: Request, res: Response) => {
    SendSQSMessage({
        amount: 90.10,
        fromCurrency: 'USD',
        toCurrency: 'EGP',
        email: 'dummy@email.com'
    })
    res.send('Express + TypeScript Server!');
  });

export default router