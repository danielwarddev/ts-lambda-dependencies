import * as lambda from "../app/my-lambda";
import FirstService from "../app/first-service";
import SecondService from "../app/second-service";

describe("my-lambda", () => {
  beforeEach(() => {
    // Dev could very well just not do this/comment it out and you would be back to using the real implementations
    // Hopefully it just makes it more obvious what needs to be mocked/easier to do so
    mockDependencies();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("when do a thing returns true then updates", async () => {
    jest.spyOn(FirstService.prototype, 'getAThing').mockResolvedValue(true);
    const coolFunctionSpy = jest.spyOn(SecondService.prototype, 'updateAThing').mockResolvedValue(Promise.resolve());

    await lambda.handler({}, {});

    expect(coolFunctionSpy).toHaveBeenCalled();
  });

  test("when do a thing returns false then does not update", async () => {
    jest.spyOn(FirstService.prototype, 'getAThing').mockResolvedValue(false);
    const coolFunctionSpy = jest.spyOn(SecondService.prototype, 'updateAThing').mockResolvedValue(Promise.resolve());

    await lambda.handler({}, {});

    expect(coolFunctionSpy).not.toHaveBeenCalled();
  });
});

/*
 * Even if you make changes to the Dependencies interface and forget to mock them here,
 * you'll get errors at compile time due to type safety. Also, jest.mocked still returns
 * an automock, so all of the members of the class are given default mocked implementations
 * which are still overridable per-test if you wish
*/
function mockDependencies() {
  jest.spyOn(lambda, 'getDependencies').mockReturnValue({
    service1: jest.mocked(FirstService.prototype),
    service2: jest.mocked(SecondService.prototype)
  });
}
