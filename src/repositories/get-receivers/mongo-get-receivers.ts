import { Receiver } from '../../models/receiver.js';
import { MongoUser } from '../mongo-protocols.js';
import { IGetReceiversRepository } from './../../controllers/get-receivers/protocols.js';
import { MongoClient } from './../../database/mongo';

export class MongoGetReceiversRepository implements IGetReceiversRepository {
  async getReceivers(): Promise<Receiver[]> {
    const receivers = await MongoClient.db
      .collection<MongoUser>('receivers')
      .find({})
      .toArray();

    return receivers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }

  async getReceiversByField(f: string, value: string): Promise<Receiver[]> {
    const findFilter = new Map();
    findFilter.set(f, value);

    const receivers = await MongoClient.db
      .collection<MongoUser>('receivers')
      .find(findFilter)
      .toArray();

    return receivers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
