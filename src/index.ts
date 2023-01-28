import { config } from 'dotenv';
import express from 'express';

import { GetReceiversController } from './controllers/get-receivers/get-receivers.js';
import { MongoGetReceiversRepository } from './repositories/get-receivers/mongo-get-receivers.js';

//import { receiverRouter } from './modules/receiver/receiverRouter.js';

config();

const app = express();

//app.use(express.json());

//app.use('/receiver', receiverRouter);

app.get('/', (req, res) => {
  res.send('Transfeera');
});

app.get('/receivers', async (req, res) => {
  const mongoGetReceiversRepository = new MongoGetReceiversRepository();

  const getReceiversController = new GetReceiversController(
    mongoGetReceiversRepository,
  );

  const response = await getReceiversController.handle();

  res.send(response.body).status(response.statusCode);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server started on port' + port);
});
