import { Receiver } from '../../models/receiver';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  IDeleteReceiverController,
  IDeleteReceiverRepository,
} from './protocols';

export class DeleteReceiverController implements IDeleteReceiverController {
  constructor(
    private readonly deleteReceiverRepository: IDeleteReceiverRepository,
  ) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Receiver>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Internal Error',
        };
      }

      const receiver = await this.deleteReceiverRepository.deleteReceiver(id);

      return {
        statusCode: 200,
        body: receiver,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal Error',
      };
    }
  }
}
