import {
  IGetReceiversController,
  IGetReceiversRepository,
} from './protocols.js';

export class GetReceiversController implements IGetReceiversController {
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
      return {
        statusCode: 500,
        body: 'Internal Error',
      };
    }
  }
}
