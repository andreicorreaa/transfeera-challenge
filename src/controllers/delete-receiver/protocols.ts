import { Receiver } from './../../models/receiver';

export interface IDeleteReceiverRepository {
  deleteReceiver(id: string): Promise<Receiver>;
}
