import { Receiver } from '../../models/receiver';
import { HttpRequest, HttpResponse } from './../protocols';

export interface UpdateReceiverParams {
  name?: string;
  email?: string;
  phone?: string;
  doc?: string;
  bank?: string;
  branch?: string;
  randomKey?: string;
  status?: string;
}

export interface IUpdateReceiverController {
  handle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<Receiver>>;
}

export interface IUpdateReceiverRepository {
  updateReceiver(id: string, params: UpdateReceiverParams): Promise<Receiver>;
}
