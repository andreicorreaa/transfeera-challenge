import { Receiver } from '../../models/receiver.js';
import { MongoUser } from '../mongo-protocols.js';
import { IGetReceiversRepository } from './../../controllers/get-receivers/protocols.js';
import { MongoClient } from './../../database/mongo';

export class MongoGetReceiversRepository implements IGetReceiversRepository {
  async getReceivers(page: number): Promise<Receiver[]> {
    const limit = 10;
    const skip = limit * (page - 1);
    const receivers = await MongoClient.db
      .collection<MongoUser>('receivers')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    return receivers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }

  async getReceiversByField(
    f: string,
    value: string,
    page: number,
  ): Promise<Receiver[]> {
    const limit = 10;
    const skip = limit * (page - 1);
    const findFilter = new Map();
    findFilter.set(f, value);

    const receivers = await MongoClient.db
      .collection<MongoUser>('receivers')
      .find(findFilter)
      .skip(skip)
      .limit(limit)
      .toArray();

    return receivers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
