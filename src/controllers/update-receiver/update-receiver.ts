import { Receiver } from '../../models/receiver';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  IUpdateReceiverController,
  UpdateReceiverParams,
  IUpdateReceiverRepository,
} from './protocols';

export class UpdateReceiverController implements IUpdateReceiverController {
  constructor(
    private readonly updateReceiverRepository: IUpdateReceiverRepository,
  ) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Receiver>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 500,
          body: 'Missing receiver id',
        };
      }

      const fieldsAllowedUpdate: (keyof UpdateReceiverParams)[] = [
        'name',
        'doc',
        'email',
        'phone',
        'bank',
        'branch',
        'randomKey',
        'status',
      ];
      const fieldNotAllowedUpdate = Object.keys(body).some(
        (key) =>
          !fieldsAllowedUpdate.includes(key as keyof UpdateReceiverParams),
      );

      if (fieldNotAllowedUpdate) {
        return {
          statusCode: 400,
          body: 'Some field is not allowed',
        };
      }

      const receiver = await this.updateReceiverRepository.updateReceiver(
        id,
        body,
      );

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
