import { beforeEach, describe, expect, it } from 'vitest';
import { makeApp } from '../../src/app';
import { type Express } from 'express';
import request from 'supertest';
import { NewNote } from '../../src/models/Note';

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

    it('retorna 200 con una nota recien creada', async () => {
      const newNote: NewNote = { title: 'A', content: 'B' };
      const createdResponse = await request(app).post('/notes').send(newNote);
      const getResponse = await request(app).get(`/notes/${createdResponse.body.id}`);

      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.id).toEqual(1);
      expect(getResponse.body.title).toEqual(newNote.title);
      expect(getResponse.body.content).toEqual(newNote.content);
    });
  });
});
