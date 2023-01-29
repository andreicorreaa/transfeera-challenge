import { Receiver } from '../models/receiver';

export type MongoUser = Omit<Receiver, 'id'>;
