import validator from 'validator';

import { Receiver } from '../../models/receiver';
import { badRequest, created, serverError } from './../helpers';
import { HttpResponse, HttpRequest, IController } from './../protocols';
import { CreateReceiverParams, ICreateReceiverRepository } from './protocols';
export class CreateReceiverController implements IController {
  constructor(
    private readonly createReceiverRepository: ICreateReceiverRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateReceiverParams>,
  ): Promise<HttpResponse<Receiver | string>> {
    try {
      const validatorFields = [
        'name',
        'email',
        'phone',
        'doc',
        'bank',
        'branch',
        'randomKey',
        'status',
      ];

      for (const field of validatorFields) {
        if (!httpRequest?.body?.[field as keyof CreateReceiverParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body?.email || '');

      if (!emailIsValid) {
        return badRequest('Email is invalid');
      }

      if (!httpRequest.body) {
        return badRequest('No body in request');
      }

      const receiver = await this.createReceiverRepository.createReceiver(
        httpRequest.body,
      );

      return created<Receiver>(receiver);
    } catch (error) {
      return serverError();
    }
  }
}
