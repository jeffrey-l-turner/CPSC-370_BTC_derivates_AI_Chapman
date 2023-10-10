
## Side Effects and Unit Tests

It is important that components do not have side effects when writing unit tests because side effects can make tests unreliable and difficult to maintain.

A side effect is any change to the state of the application outside of the component itself. This could include writing to a database, making a network request, or updating the global state of the application.

When a component has side effects, it can make it difficult to test the component in isolation. For example, if a component makes a network request, the test will need to mock the network request in order to run reliably. This can be complex and time-consuming to set up.

Additionally, side effects can make tests difficult to maintain. If the component's implementation changes, it may break the test, even if the component's behavior has not changed.

Here are some specific examples of problems that can occur when components have side effects in unit tests:

Tests can become flaky. Flaky tests are tests that sometimes pass and sometimes fail, even though the code under test has not changed. Side effects can make tests flaky because they can introduce unexpected dependencies on the state of the application or the environment.
Tests can become slow. Side effects can make tests slower because they may require the test to set up and tear down complex infrastructure, such as a database or a network connection.
Tests can become difficult to debug. When a test fails, it can be difficult to track down the cause of the failure if the component under test has side effects. This is because the side effects can change the state of the application in unexpected ways.
To avoid these problems, it is best to write components that do not have side effects. This means that the component should not change any state outside of itself, and it should not make any network requests or write to any databases.

If a component does need to perform a side effect, it should be done through a dependency injection framework. This will allow the test to mock the dependency and isolate the component under test.

Here are some tips for writing components without side effects:

Use pure functions whenever possible. Pure functions are functions that do not have side effects and that always return the same output for the same input.
If you need to perform a side effect, use a dependency injection framework to inject the dependency that performs the side effect. This will allow you to mock the dependency in your tests.
Isolate your components from the rest of the application. This means that your components should not rely on any global state or external dependencies.
By following these tips, you can write components that are easier to test and maintain.
