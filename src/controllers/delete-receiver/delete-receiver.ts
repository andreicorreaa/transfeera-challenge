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
  ): Promise<HttpResponse<Receiver[] | string>> {
    try {
      const ids = httpRequest?.body?.ids;

      if (ids.length <= 0) {
        return badRequest('Missing receiver ids');
      }

      const receivers = await Promise.all(
        ids.map(async (id: string): Promise<Receiver> => {
          return await this.deleteReceiverRepository.deleteReceiver(id);
        }),
      );

      return ok<Receiver[]>(receivers);
    } catch (error) {
      return serverError();
    }
  }
}
