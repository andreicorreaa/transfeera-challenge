import { Router } from 'express';

import {
  receiverIndex,
  receiverCreate,
  receiverShow,
  receiverDelete,
} from './receiverController.js';

export const receiverRouter = Router();

receiverRouter.get('/', receiverIndex);

receiverRouter.post('/', receiverCreate);

receiverRouter.get('/:receiver_id', receiverShow);

receiverRouter.delete('/:receiver_id', receiverDelete);
