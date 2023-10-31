import express, { Request, Response } from 'express';
import cors from 'cors';
import { setTimeout } from 'node:timers/promises';
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.post('/isthiscat', async (req: Request, res: Response) => {
  await setTimeout(60000);
  if (Math.random() > 0.3) {
    res.json({ isCat: true });
  } else {
    res.json({ isCat: false });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});