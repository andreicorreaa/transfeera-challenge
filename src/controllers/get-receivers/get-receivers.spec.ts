import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';

import { MongoClient } from '../../database/mongo';
import { app } from '../../server';
import { HttpStatusCode } from './../protocols';

describe('Get receivers list', () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  it('should get a list of receivers', async () => {
    const res = await request(app).get('/receivers?page=1');

    expect(res.statusCode).toEqual(HttpStatusCode.OK);
  });
});
