import { Receiver } from '../../models/receiver';
import { HttpResponse, HttpRequest } from './../protocols';

export interface ICreateReceiverController {
  handle(
    HttpRequest: HttpRequest<CreateReceiverParams>,
  ): Promise<HttpResponse<Receiver>>;
}
export interface CreateReceiverParams {
  name: string;
  doc: string;
  email: string;
  phone: string;
  bank: string;
  branch: string;
  randomKey: string;
  status: string;
}

export interface ICreateReceiverRepository {
  createReceiver(params: CreateReceiverParams): Promise<Receiver>;
}
