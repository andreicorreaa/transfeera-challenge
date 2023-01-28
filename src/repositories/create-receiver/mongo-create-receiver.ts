import { Receiver } from '../../models/receiver';
import {
  CreateReceiverParams,
  ICreateReceiverRepository,
} from './../../controllers/create-receiver/protocols';
import { MongoClient } from './../../database/mongo';

export class MongoCreateReceiver implements ICreateReceiverRepository {
  async createReceiver(params: CreateReceiverParams): Promise<Receiver> {
    const { insertedId } = await MongoClient.db
      .collection('receivers')
      .insertOne(params);

    const receiver = await MongoClient.db
      .collection<Omit<Receiver, 'id'>>('receivers')
      .findOne({ _id: insertedId });

    if (!receiver) {
      throw new Error('Receiver not created');
    }

    const { _id, ...rest } = receiver;

    return { id: _id.toHexString(), ...rest };
  }
}
