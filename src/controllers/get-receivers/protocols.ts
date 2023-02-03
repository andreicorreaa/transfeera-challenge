import { Receiver } from './../../models/receiver.js';

export interface IGetReceiversRepository {
  getReceivers(): Promise<Receiver[]>;
  getReceiversByField(field: string, value: string): Promise<Receiver[]>;
}
