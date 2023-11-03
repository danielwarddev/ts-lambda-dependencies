import ExternalClient from "./external-client";
import FirstService from "./first-service";
import SecondService from "./second-service";

export interface Dependencies {
  service1: FirstService;
  service2: SecondService;
}

/*
 * This is kind of a pseudo-DI since you can't inject through the method or a constructor for a Lambda.
 * You have to remember to mock it inside of the tests, but it's better than newing up your dependencies
 * throughout the real code, which hides the dependencies and makes it non-obvious what needs to be mocked.
 * It also needs to be a function instead of a Dependencies variable, because module-level code runs first,
 * even inside of the tests, and it happens before the mocks are created. Using a function that returns a
 * Dependencies, the function is created, but not actually ran until you invoke it, which can be after mocking.
*/
export const getDependencies = (): Dependencies => {
  const client = new ExternalClient();
  return {
    service1: new FirstService(client),
    service2: new SecondService(),
  };
};

export async function handler(event: any, context: any) {
  const { service1, service2 } = getDependencies();

  const value = await service1.getAThing();

  if (value === true) {
    await service2.updateAThing();
  }
}
