# Transitioning from Lambda Calculus to Modern Process Calculi

The lambda calculus was introduced by Alonzo Church in the 1930s as a formal system for representing computation. It is based on the idea of functions as anonymous, first-class values. This means that functions can be passed as arguments to other functions, returned from functions, and stored in data structures.

As a powerful too for representing computation, lambda calculus it does not explicitly model concurrency. This is because the lambda calculus is a purely functional language, and functions in functional languages are typically assumed to be executed sequentially.

### Beta Reduction

Beta reduction is a process in lambda calculus for reducing lambda expressions. It is a form of substitution, where the body of a lambda expression is substituted for its free variable in the context where the lambda expression is applied.

The beta reduction rule is as follows:

```
(\lambda x. t) u -> t[x := u]

```

Beta reduction is a process in lambda calculus for reducing lambda expressions. It is a form of substitution, where the body of a lambda expression is substituted for its free variable in the context where the lambda expression is applied.

The beta reduction rule is as follows:

`(\lambda x. t) u -> t[x := u]`

where `t` is a lambda expression, `u` is an expression, and `t[x := u]` is the result of substituting `u` for all free occurrences of `x` in `t`.

For example, consider the following lambda expression:

```
(\lambda x. x + 1) 3

```

This expression can be reduced using beta reduction as follows:

```
(\lambda x. x + 1) 3 -> (3 + 1)
```

The beta reduction rule applies to the entire lambda expression, so the entire body of the lambda expression is substituted for the free variable x in the context where the lambda expression is applied.

Beta reduction can be used to evaluate lambda expressions and to prove properties of lambda terms. It is also used in the implementation of functional programming languages.

Here are some more examples of beta reduction:

`(\lambda x. x * x) 5 -> 5 * 5`
Coding Examples in TypeScript with Anonymous Functions

### TypeScript with Anonmyous Functions
```
// Define an array of numbers
let numbers = [1, 2, 3, 4, 5];

// Use an anonymous function to square each number
let squares = numbers.map(number => number * number);

console.log(squares); // Output: [1, 4, 9, 16, 25]

// Define an array of numbers
let numbers = [1, 2, 3, 4, 5];

// Use an anonymous function to filter out even numbers
let odds = numbers.filter(number => number % 2 !== 0);

console.log(odds); // Output: [1, 3, 5]

```

In these examples, `number => number * number` is an anonymous function that takes a number and returns its square. The map method applies this function to each element of the numbers array. In the second snippet, the `filter` method uses an anonymous (lambda) function: `number => number % 2 !== 0` is an anonymous function that takes a number and returns true if it's odd and false if it's even. The filter method uses this function to create a new array that only contains the odd numbers from the original array.

## Rholang's Fundamentally Different Concurrent Approaches

In the 1980s, [Robin Milner](https://en.wikipedia.org/wiki/Robin_Milner) introduced the pi-calculus as a formal system for modeling concurrent computation. The pi-calculus is based on the idea of processes as communicating agents. Processes can send and receive messages, and they can synchronize their actions with each other.

The pi-calculus is a very general model of concurrency, and it has been used to model a wide variety of concurrent systems, including distributed systems, operating systems, and programming languages.

In the 2000s, Lucius Gregory Meredith and a colleagues, Matthias Radestock introduced rho as a new process calculus for modeling concurrent systems. Rholang, the programming language behind rho-calculs, is based on the idea of processes, which are concurrent entities that can send and receive messages and perform computations.

Rholang differs from the pi-calculus in a number of ways. First, Rholang processes are explicitly typed, while pi-calculus processes are not. Second, Rholang processes can have mutable state, while pi-calculus processes cannot. Third, Rholang processes can communicate with each other using asynchronous messages, while pi-calculus processes can only communicate using synchronous messages.


Rholang's use of processes and asynchronous messages provides a number of advantages over the pi-calculus. First, processes are more expressive than pi-calculus processes, because they allow for mutable state and asynchronous communication. Second, Rholang's asynchronous communication model is more efficient than the pi-calculus's synchronous communication model.

## First Class Objects in Programming Languages

The first class objects of a programming language are those entities that can be treated in the same way as any other value. This means that they can be:

* Passed as arguments to functions.
* Returned from functions.
* Assigned to variables.
* Stored in data structures.
* Compared for equality.
* Used in control flow statements.

Some common first class objects include:

* Variables: Variables can be used to store values and can be used in expressions and control flow statements.
* Constants: Constants are values that cannot be changed once they are assigned.
* Functions: Functions can be used to perform operations on values and can be passed as arguments to other functions.
* Classes: Classes can be used to create new types of objects and can be used to create new instances of those objects.
* Modules: Modules can be used to group related code together and can be imported into other modules.

Some programming languages support a wider range of first class objects than others. For example, some languages support first-class classes, which means that classes can be passed as arguments to functions and returned from functions. Other languages support first-class modules, which means that modules can be passed as arguments to functions and returned from functions.

First class objects are important because they allow programmers to write more expressive and flexible code. For example, by passing functions as arguments to other functions, programmers can create reusable and composable code. By storing classes and modules in data structures, programmers can create more modular and reusable code.

## Rho calculus in Comparison to Lambda

In Rho calculus, we introduce the "comm rule" which says that arguments do not have to be next to each other and instead can be synchronized over a channel. When you compare this to how functional languages are compile to real hardware it happens more like the comm rule. The arguments are placed in registers (or certain positions on the stack) and the function code is placed at a position on the stack. These positions correspond to channel synchronization.

The "comm rule" is a fundamental part of process calculi, specifically the pi- and rho-calculus. It represents the communication between two processes.

In process calculi, the comm rule (short for "communication rule") is defined as follows:

`a!(P) | a?(x).Q → Q{P/x}`

In this rule:

`a!(P)` represents a process that sends message `P` on channel `a`.
`a?(x).Q` represents a process that waits to receive a message on channel `a`, which it will call `x`, and then continues as process `Q`.
`Q{P/x}` means the process `Q` where `x` has been replaced by `P`.

The comm rule describes the interaction between these two processes: the message P sent by the first process is received by the second process, and the second process continues as `Q` with `P` substituted for `x`.

For example, if we have processes:

`a!("Hello") | a?(x).print(x)`

After communication occurs, the system evolves to:

`print("Hello")`

This represents a process that prints the message `"Hello". Here, a!("Hello")` sent the message "Hello" on channel `a`, and `a?(x).print(x)` received it and substituted it in place of `x` in `print(x)`.

## Concurrency and First Class objects 

Composition is considered first class in Rholang programming language. This means that compositions can be passed as arguments to functions, returned from functions, and stored in communication channels.

The following Rholang code shows how to use a communication channel to compose two processes:

```
// Define an actor that takes a communication channel as an argument and prints the value on the channel to the console.
printer = actor {
  channel -> receive {
    message -> println message;
  }
};

// Define an actor that puts a value on a communication channel and then sends the channel to another actor.
sender = actor {
  channel -> put "hello" |> send channel;
};

// Create a new sender actor and a new printer actor.
sender.start();
printer.start();

```

### Simple Rholang

Here is a simple example of how Rholang's asynchronous communication model can be used to implement a concurrent counter:

```
new counter, printer, stdout(`rho:io:stdout`) in {
  // Define the counter process
  contract counter(@value, return) = {
    return!(value + 1)
  } |

  // Define the printer process
  contract printer(@value) = {
    stdout!(value)
  } |

  // Increment the counter and print the result
  for (_ <- counter!(0, *counter)) {
    for (@newValue <- counter) {
      printer!(newValue)
    }
  }
}
```
In this example, we first create three new names: counter, printer, and stdout. counter is a contract that takes a value and a return channel, increments the value, and sends the result on the return channel. printer is another contract that takes a value and prints it to the console using the built-in stdout channel.

Finally, we send a message to the counter contract with the initial value of 0 and the return channel that points back to the counter itself. Then, we listen for a message from the counter (which is the incremented value), and send that value to the printer.

Note: Rholang is concurrent, so the order of process execution is not guaranteed. The for comprehension is a "listen" operation that waits for a message to be sent on the specified channel. In this case, the counter and printer processes will be started as soon as the message they are waiting for is sent.

F1r3fly and Rholang are rapidly evolving technologies. This example illustrates how Rholang's asynchronous communication model can be used to implement concurrent programs in a simple and efficient way.

## Actor versus Process Calculi Approaches

There are several differences between the process calculi and the actor model. The biggest difference is that the actor model is principal port. An actor has 1 port where it responds to interaction, its mailbox. But, concurrency in the real world is multi-port. You have to coordinate over multiple ports. You can code this in actors, but you end up coding it all the time. Since you're building this impedance matching code over and over again, its better to just build it directly into the language. Process calculi and Rholang work using the process approach -- not actors.


## Conurrency in the Blockchain Programming
Overall, Rholang is a powerful and expressive process calculus for modeling concurrent systems. It is worth considering for any project that involves concurrent programming. In the blockchain space, there a few concurrent languages actively being developed. In addition to Rholang, the move language has been developed with concurrency in mind. This language and corresponding blockchain emerged from Facebook's ill fated Libra project (later renamed to Diem). Most recently the [Aptos](https://coinmarketcap.com/currencies/aptos/) chain has emerged with major venture capital funding behind it. In addition, [Silverment](https://silvermint.net) uses a concurrent model for its smart contracts. They also use an [extension of the Go programming language](https://docs.silvermint.net/whitepapers/Symmetry_language_extensions_for_Go.pdf), similar to Aptos' Move language.
