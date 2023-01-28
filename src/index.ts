import { config } from 'dotenv';
import express from 'express';

import { CreateReceiverController } from './controllers/create-receiver/create-receiver';
import { GetReceiversController } from './controllers/get-receivers/get-receivers';
import { MongoClient } from './database/mongo';
import { MongoCreateReceiverRepository } from './repositories/create-receiver/mongo-create-receiver';
import { MongoGetReceiversRepository } from './repositories/get-receivers/mongo-get-receivers';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get('/', (req, res) => {
    res.send('Transfeera');
  });

  app.get('/receivers', async (req, res) => {
    const mongoGetReceiversRepository = new MongoGetReceiversRepository();

    const getReceiversController = new GetReceiversController(
      mongoGetReceiversRepository,
    );

    const { body, statusCode } = await getReceiversController.handle();

    res.status(statusCode).send(body);
  });

  app.post('/receivers', async (req, res) => {
    const mongoCreateReceiverRepository = new MongoCreateReceiverRepository();

    const createReceiverController = new CreateReceiverController(
      mongoCreateReceiverRepository,
    );

    const { body, statusCode } = await createReceiverController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
};

main();
