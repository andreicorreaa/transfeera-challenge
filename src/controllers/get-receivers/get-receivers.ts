import { ok, serverError } from '../helpers';
import { Receiver } from './../../models/receiver';
import { HttpRequest, HttpResponse, IController } from './../protocols';
import { IGetReceiversRepository } from './protocols.js';

export class GetReceiversController implements IController {
  constructor(
    private readonly getReceiversRepository: IGetReceiversRepository,
  ) {}

  async handle(): Promise<HttpResponse<Receiver[] | string>> {
    try {
      const receivers = await this.getReceiversRepository.getReceivers();

      return ok<Receiver[]>(receivers);
    } catch (error) {
      return serverError();
    }
  }

  async getByStatus(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Receiver[] | string>> {
    try {
      const receivers = await this.getReceiversRepository.getReceiversByStatus(
        httpRequest.params?.status,
      );

      return ok<Receiver[]>(receivers);
    } catch (error) {
      return serverError();
    }
  }
}
