import assert from 'assert';
import request from 'supertest';

import app from '../src/app';
import prisma from '../src/utils/prisma';

const TODO_END_POINT = '/api/v1/todo';
let todo_id = '';

describe('POST /todo', () => {
  test('should return Created todo successfully', (done) => {
    request(app)
      .post(TODO_END_POINT)
      .send({ title: 'my todo test' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Created todo successfully');
        todo_id = response.body.todo.id;
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

describe('GET /todo', () => {
  test('should return Get todo list successfully', (done) => {
    request(app)
      .get(TODO_END_POINT)
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Get todo list successfully');
        assert(response.body.todoList.length >= 0);
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

describe('PATCH /todo', () => {
  test('should return Updated todo successfully', (done) => {
    request(app)
      .patch(`${TODO_END_POINT}/${todo_id}`)
      .send({ status: 'completed' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Updated todo successfully');
        assert(response.body.todo.status === 'completed');
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

describe('DELETE /todo', () => {
  test('should return Deleted todo successfully', (done) => {
    request(app)
      .delete(`${TODO_END_POINT}/${todo_id}`)
      .send({ status: 'completed' })
      .expect(200)
      .then((response) => {
        assert(response.body.message === 'Deleted todo successfully');
        done();
      })
      .catch((err) => done(err));
  }, 30000);
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
