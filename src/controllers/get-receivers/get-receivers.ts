import { IController } from './../protocols';
import { IGetReceiversRepository } from './protocols.js';

export class GetReceiversController implements IController {
  constructor(
    private readonly getReceiversRepository: IGetReceiversRepository,
  ) {}

  async handle() {
    try {
      const receivers = await this.getReceiversRepository.getReceivers();

      return {
        statusCode: 200,
        body: receivers,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: 'Internal Error',
      };
    }
  }
}
