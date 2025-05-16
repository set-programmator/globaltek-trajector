import { faker } from '@faker-js/faker';

export function generateRandomName() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}