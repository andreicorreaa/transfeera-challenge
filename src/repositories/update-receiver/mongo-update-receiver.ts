import { ObjectId } from 'mongodb';

import { Receiver } from '../../models/receiver';
import { MongoUser } from '../mongo-protocols';
import {
  IUpdateReceiverRepository,
  UpdateReceiverParams,
} from './../../controllers/update-receiver/protocols';
import { MongoClient } from './../../database/mongo';

// eslint-disable-next-line prettier/prettier
export class MongoUpdateReceiverRepository implements IUpdateReceiverRepository
{
  async updateReceiver(
    id: string,
    params: UpdateReceiverParams,
  ): Promise<Receiver> {
    await MongoClient.db.collection('receivers').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      },
    );

    const receiver = await MongoClient.db
      .collection<MongoUser>('receivers')
      .findOne({ _id: new ObjectId(id) });

    if (!receiver) {
      throw new Error('Receiver not updated');
    }

    const { _id, ...rest } = receiver;

    return { id: _id.toHexString(), ...rest };
  }
}
