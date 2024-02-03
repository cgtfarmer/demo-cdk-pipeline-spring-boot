// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve users', async ({ request }) => {
  const response = await request.get('/users');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('create user', async ({ request }) => {
  const inputData = {
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    weight: 185.3
  };

  const response = await request.post('/users', { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();
  expect(body.id).toBeGreaterThanOrEqual(0);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.age).toBe(inputData.age);
  expect(body.weight).toBe(inputData.weight);
});

test('retrieve user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);
  const newUserId = createUserBody.id;

  const response = await request.get(`/users/${newUserId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();

  expect(body.id).toBe(newUserId);
});

test('update user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);

  const inputData = {
    id: createUserBody.id,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 33,
    weight: 155.1
  };

  const response = await request.put(`/users/${inputData.id}`, { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(parseInt(body.id)).toBe(inputData.id);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.age).toBe(inputData.age);
  expect(body.weight).toBe(inputData.weight);
});

test('destroy user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);
  const newUserId = createUserBody.id;

  const response = await request.delete(`/users/${newUserId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.msg).toBe('Deleted successfully');
});
