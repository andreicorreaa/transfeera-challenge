import { ObjectId } from 'mongodb';

import { Receiver } from '../../models/receiver';
import { MongoUser } from '../mongo-protocols';
import { IDeleteReceiverRepository } from './../../controllers/delete-receiver/protocols';
import { MongoClient } from './../../database/mongo';

// eslint-disable-next-line prettier/prettier
export class MongoDeleteReceiverRepository implements IDeleteReceiverRepository {
  async deleteReceiver(id: string): Promise<Receiver> {
    const receiver = await MongoClient.db
      .collection<MongoUser>('receivers')
      .findOne({ _id: new ObjectId(id) });

    if (!receiver) {
      throw new Error('Receiver not found');
    }

    const { deletedCount } = await MongoClient.db
      .collection('receivers')
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error('Receiver not deleted');
    }

    const { _id, ...rest } = receiver;

    return { id: _id.toHexString(), ...rest };
  }
}
