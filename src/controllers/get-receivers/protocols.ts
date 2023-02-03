import { Receiver } from './../../models/receiver.js';

export interface IGetReceiversRepository {
  getReceivers(page: number): Promise<Receiver[]>;
  getReceiversByField(
    field: string,
    value: string,
    page: number,
  ): Promise<Receiver[]>;
}
