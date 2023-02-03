import { ok, serverError } from '../helpers';
import { Receiver } from './../../models/receiver';
import { badRequest } from './../helpers';
import { HttpRequest, HttpResponse, IController } from './../protocols';
import { IGetReceiversRepository } from './protocols.js';

export class GetReceiversController implements IController {
  constructor(
    private readonly getReceiversRepository: IGetReceiversRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Receiver[] | string>> {
    try {
      const receivers = await this.getReceiversRepository.getReceivers(
        httpRequest.query?.page ? (httpRequest.query?.page as number) : 1,
      );

      return ok<Receiver[]>(receivers);
    } catch (error) {
      return serverError();
    }
  }

  async getByField(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Receiver[] | string>> {
    try {
      const validatorFields = ['name', 'status', 'keyType', 'key'];

      const isValidField = validatorFields.find(
        (el) => el == httpRequest.params?.field,
      );

      if (!isValidField) return badRequest('Field is invalid');

      const receivers = await this.getReceiversRepository.getReceiversByField(
        httpRequest.params?.field,
        httpRequest.params?.value,
        httpRequest.query?.page ? (httpRequest.query?.page as number) : 1,
      );

      return ok<Receiver[]>(receivers);
    } catch (error) {
      return serverError();
    }
  }
}
