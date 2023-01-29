import { Receiver } from '../../models/receiver';
import { ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse } from '../protocols';
import { badRequest } from './../helpers';
import { IController } from './../protocols';
import { UpdateReceiverParams, IUpdateReceiverRepository } from './protocols';

export class UpdateReceiverController implements IController {
  constructor(
    private readonly updateReceiverRepository: IUpdateReceiverRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateReceiverParams>,
  ): Promise<HttpResponse<Receiver | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest('Missing receiver id');
      }

      if (!body) {
        return badRequest('Missing fields');
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
        return badRequest('Some field is not allowed');
      }

      const receiver = await this.updateReceiverRepository.updateReceiver(
        id,
        body,
      );

      return ok<Receiver>(receiver);
    } catch (error) {
      return serverError();
    }
  }
}
