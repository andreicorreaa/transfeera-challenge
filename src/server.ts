import { config } from 'dotenv';
import express from 'express';

import { CreateReceiverController } from './controllers/create-receiver/create-receiver';
import { DeleteReceiverController } from './controllers/delete-receiver/delete-receiver';
import { GetReceiversController } from './controllers/get-receivers/get-receivers';
import { UpdateReceiverController } from './controllers/update-receiver/update-receiver';
import { MongoCreateReceiverRepository } from './repositories/create-receiver/mongo-create-receiver';
import { MongoDeleteReceiverRepository } from './repositories/delete-receiver/mongo-delete-receiver';
import { MongoGetReceiversRepository } from './repositories/get-receivers/mongo-get-receivers';
import { MongoUpdateReceiverRepository } from './repositories/update-receiver/mongo-update-receiver';

config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Transfeera' });
});

app.get('/receivers', async (req, res) => {
  const mongoGetReceiversRepository = new MongoGetReceiversRepository();

  const getReceiversController = new GetReceiversController(
    mongoGetReceiversRepository,
  );

  const { body, statusCode } = await getReceiversController.handle({
    query: req.query,
  });

  res.status(statusCode).send(body);
});

app.get('/receivers/:field/:value', async (req, res) => {
  const mongoGetReceiversRepository = new MongoGetReceiversRepository();

  const getReceiversController = new GetReceiversController(
    mongoGetReceiversRepository,
  );

  const { body, statusCode } = await getReceiversController.getByField({
    params: req.params,
    query: req.query,
  });

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

app.patch('/receivers/:id', async (req, res) => {
  const mongoUpdateReceiverRepository = new MongoUpdateReceiverRepository();

  const updateReceiverController = new UpdateReceiverController(
    mongoUpdateReceiverRepository,
  );

  const { body, statusCode } = await updateReceiverController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.delete('/receivers', async (req, res) => {
  const mongoDeleteReceiverRepository = new MongoDeleteReceiverRepository();

  const deleteReceiverController = new DeleteReceiverController(
    mongoDeleteReceiverRepository,
  );

  const { body, statusCode } = await deleteReceiverController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { app };
