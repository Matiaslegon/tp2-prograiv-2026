import { beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';

describe('NoteService - Get By Id', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('obtener una nota inexistente retorna undefined', () => {
    expect(service.getNote(999)).toBeUndefined();
  });
});
