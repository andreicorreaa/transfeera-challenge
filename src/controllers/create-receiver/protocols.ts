import { Receiver } from '../../models/receiver';

export interface CreateReceiverParams {
  name: string;
  doc: string;
  bank: string;
  branch: string;
  status: number;
}

export interface ICreateReceiverRepository {
  createReceiver(params: CreateReceiverParams): Promise<Receiver>;
}
