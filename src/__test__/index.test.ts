import DbConnect from '../config/dbConnect';
import envConstant from '../constant/env.constant';

// Check if the database is connected
test('Check if the database is connected', async () => {
  const dbConnect = await DbConnect();
  expect(dbConnect).toBeDefined();
});

// Test the environment variable
describe('Test the environment variable', () => {
  test('Check if the environment variable is set', () => {
    expect(envConstant).toBeDefined();
  });
});
