import assert from 'assert';
import request from 'supertest';

import app from '../src/app';
import prisma from '../src/utils/prisma';

const TODO_END_POINT = '/api/v1/todo';
const SUBTASK_END_POINT = '/api/v1/subtask';

let todo_id = '';
let subtask_id = '';

beforeAll(async () => {
  const response = await request(app).post(TODO_END_POINT).send({ title: 'my todo for subtask test' });
  todo_id = response.body.todo.id;
}, 30000);

describe('POST /subtask', () => {
  test('should return Created subtask successfully', async (done) => {
    request(app)
      .post(SUBTASK_END_POINT)
      .send({ todo_id, title: 'my subtask test' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Created subtask successfully');
        subtask_id = response.body.subtask.id;
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

describe('PATCH /subtask', () => {
  test('should return Updated subtask successfully', async (done) => {
    request(app)
      .patch(`${SUBTASK_END_POINT}/${subtask_id}`)
      .send({ status: 'completed' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Updated subtask successfully');
        assert(response.body.subtask.status === 'completed');
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

describe('DELETE /subtask', () => {
  test('should return Deleted subtask successfully', async (done) => {
    request(app)
      .delete(`${SUBTASK_END_POINT}/${subtask_id}`)
      .send({ status: 'completed' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Deleted subtask successfully');
        done();
      })
      .catch((err) => done(err));
  }, 300000);
});

afterAll(async (done) => {
  await request(app).delete(`${TODO_END_POINT}/${todo_id}`);
  await prisma.$disconnect();
  done();
});
