// @ts-check
const { test, expect } = require('@playwright/test');

test('health check', async ({ request }) => {
  const response = await request.get('/actuator/info');

  expect(response.ok()).toBeTruthy();
});
