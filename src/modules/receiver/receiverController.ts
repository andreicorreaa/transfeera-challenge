import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

interface IReceiver {
  id: string;
  name: string;
  doc: string;
  bank: number;
  branch: string;
  status: boolean;
}

const receivers: IReceiver[] = [];

export const receiverIndex = async (req: Request, res: Response) => {
  res.json(receivers);
};

export const receiverCreate = async (req: Request, res: Response) => {
  const { name, doc, bank, branch, status } = req.body;

  const id = randomUUID();

  const receiver: IReceiver = {
    id,
    name,
    doc,
    bank,
    branch,
    status,
  };

  receivers.push(receiver);

  res.json(receiver);
};

export const receiverShow = async (req: Request, res: Response) => {
  const { receiver_id } = req.params;

  const receiver = receivers.find((receiver) => (receiver.id = receiver_id));

  res.json(receiver);
};

export const receiverDelete = async (req: Request, res: Response) => {
  const { receiver_id } = req.params;

  const receiverIndex = receivers.findIndex(
    (receiver) => (receiver.id = receiver_id),
  );

  receivers.splice(receiverIndex, 1);

  res.json({ message: 'Receiver deleted' });
};
