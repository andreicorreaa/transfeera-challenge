import { Receiver } from '../../models/receiver.js';
import { IGetReceiversRepository } from './../../controllers/get-receivers/protocols.js';

export class MongoGetReceiversRepository implements IGetReceiversRepository {
  async getReceivers(): Promise<Receiver[]> {
    return [
      {
        name: 'Andrei',
        doc: '460.412.838-35',
        bank: 'Caixa',
        branch: '0000-1',
        status: 1,
      },
    ];
  }
}
