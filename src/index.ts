import { config } from 'dotenv';
import express from 'express';

import { receiverRouter } from './modules/receiver/receiverRouter.js';

config();

const app = express();

app.use(express.json());

app.use('/receiver', receiverRouter);

app.get('/', (req, res) => {
  res.send('Transfeera');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server started on port' + port);
});
