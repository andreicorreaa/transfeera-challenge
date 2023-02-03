import { Receiver } from './../../models/receiver.js';

export interface IGetReceiversRepository {
  getReceivers(): Promise<Receiver[]>;
  getReceiversByStatus(status: string): Promise<Receiver[]>;
}
