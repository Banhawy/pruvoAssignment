import { Request, Response, Router } from 'express';
import { SendSQSMessage } from '../controllers/sqsController';

const router = Router()

router.get('/', (req: Request, res: Response) => {
    SendSQSMessage({
        value: 90.10,
        from: 'USD',
        to: 'EGP'
    })
    res.send('Express + TypeScript Server!');
  });

export default router