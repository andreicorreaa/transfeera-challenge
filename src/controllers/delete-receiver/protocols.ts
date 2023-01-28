import { Receiver } from './../../models/receiver';
import { HttpRequest, HttpResponse } from './../protocols';

export interface IDeleteReceiverRepository {
  deleteReceiver(id: string): Promise<Receiver>;
}

export interface IDeleteReceiverController {
  handle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<Receiver>>;
}
