import { Receiver } from '../../models/receiver';
import { HttpResponse, HttpRequest } from './../protocols';
import {
  CreateReceiverParams,
  ICreateReceiverController,
  ICreateReceiverRepository,
} from './protocols';
export class CreateReceiverController implements ICreateReceiverController {
  constructor(
    private readonly createReceiverRepository: ICreateReceiverRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateReceiverParams>,
  ): Promise<HttpResponse<Receiver>> {
    const validatorFields = ['name', 'doc', 'bank', 'branch', 'status'];

    for (const field of validatorFields) {
      if (!httpRequest?.body?.[field as keyof CreateReceiverParams]?.length) {
        return {
          statusCode: 400,
          body: `Field ${field} is required`,
        };
      }
    }

    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: 'No body in request',
        };
      }

      const receiver = await this.createReceiverRepository.createReceiver(
        httpRequest.body,
      );

      return {
        statusCode: 201,
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
