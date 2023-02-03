import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';

import { MongoClient } from '../../database/mongo';
import { app } from '../../server';
import { HttpStatusCode } from './../protocols';

describe('Get receivers list', () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  it('should create a receiver', async () => {
    const body = {
      name: 'Giovanna e Luciana Lavanderia ME',
      email: 'atendimento@giovannaelucianalavanderiame.com.br',
      phone: '(11) 99806-8314',
      doc: '48.969.548/0001-70',
      bank: 'Inter',
      branch: '822110-12',
      key: '48969548000170',
      keyType: 'CNPJ',
      status: 'Validado',
    };

    const res = await request(app).post('/receivers').send(body);

    expect(res.statusCode).toEqual(HttpStatusCode.CREATED);
  });
});
