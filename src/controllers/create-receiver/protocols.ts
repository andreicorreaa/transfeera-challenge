import { Receiver } from '../../models/receiver';
export interface CreateReceiverParams {
  name: string;
  doc: string;
  email: string;
  phone: string;
  bank: string;
  branch: string;
  key: string;
  keyType: string;
  status: string;
}

export interface ICreateReceiverRepository {
  createReceiver(params: CreateReceiverParams): Promise<Receiver>;
}
