import { Receiver } from '../../models/receiver.js';
import { IGetReceiversRepository } from './../../controllers/get-receivers/protocols.js';
import { MongoClient } from './../../database/mongo';

export class MongoGetReceiversRepository implements IGetReceiversRepository {
  async getReceivers(): Promise<Receiver[]> {
    const receivers = await MongoClient.db
      .collection<Omit<Receiver, 'id'>>('receivers')
      .find({})
      .toArray();

    return receivers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
