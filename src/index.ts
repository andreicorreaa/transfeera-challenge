import express from 'express';

import { receiverRouter } from './modules/receiver/receiverRouter.js';

const server = express();

server.use(express.json());

server.use('/receiver', receiverRouter);

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3333, () => {
  console.log('Server started on port 3333');
});
