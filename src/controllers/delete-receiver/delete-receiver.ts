import { Receiver } from '../../models/receiver';
import { HttpRequest, HttpResponse } from '../protocols';
import { badRequest, ok, serverError } from './../helpers';
import { IController } from './../protocols';
import { IDeleteReceiverRepository } from './protocols';

export class DeleteReceiverController implements IController {
  constructor(
    private readonly deleteReceiverRepository: IDeleteReceiverRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Receiver | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Missing receiver id');
      }

      const receiver = await this.deleteReceiverRepository.deleteReceiver(id);

      return ok<Receiver>(receiver);
    } catch (error) {
      return serverError();
    }
  }
}
