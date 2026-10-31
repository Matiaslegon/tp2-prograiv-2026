import { beforeEach, describe, expect, it } from 'vitest';
import { makeApp } from '../../src/app';
import { type Express } from 'express';
import request from 'supertest';

describe('Note Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  describe('GET /notes/:id', () => {
    it('obtener una nota inexistente retorna 404', async () => {
      const response = await request(app).get('/notes/999');

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({ error: 'NotFound' });
    });
  });
});
