import { HttpResponse } from '../protocols.js';
import { Receiver } from './../../models/receiver.js';

export interface IGetReceiversController {
  handle(): Promise<HttpResponse<Receiver[]>>;
}

export interface IGetReceiversRepository {
  getReceivers(): Promise<Receiver[]>;
}
