import { Receiver } from '../../models/receiver';
import { MongoUser } from '../mongo-protocols';
import {
  CreateReceiverParams,
  ICreateReceiverRepository,
} from './../../controllers/create-receiver/protocols';
import { MongoClient } from './../../database/mongo';

// eslint-disable-next-line prettier/prettier
export class MongoCreateReceiverRepository implements ICreateReceiverRepository
{
  async createReceiver(params: CreateReceiverParams): Promise<Receiver> {
    const { insertedId } = await MongoClient.db
      .collection('receivers')
      .insertOne(params);

    const receiver = await MongoClient.db
      .collection<MongoUser>('receivers')
      .findOne({ _id: insertedId });

    if (!receiver) {
      throw new Error('Receiver not created');
    }

    const { _id, ...rest } = receiver;

    return { id: _id.toHexString(), ...rest };
  }
}
