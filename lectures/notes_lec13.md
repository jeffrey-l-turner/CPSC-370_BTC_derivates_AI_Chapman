# 7th Week Start

### Using dotfiles and Homebrew on MacOS (better M2 setup)
* [Install Warp](https://app.warp.dev/referral/PXZMWP)
* [Install Homebrew](https://brew.sh) `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
* [Install NixOS](https://nixos.org/download) `sh <(curl -L https://nixos.org/nix/install) --daemon # optional for later in semester`
* [Install oh-my-zsh](https://ohmyz.sh/#install) `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
- See [master branch `.zprofile` and `.zshrc` dotfiles](https://github.com/jeffrey-l-turner/dotfiles/tree/master); may `curl` raw files from `dev` branch if experimenting, otherwise use `master`
- * `cd ~; touch .zshrc; curl https://raw.githubusercontent.com/jeffrey-l-turner/dotfiles/master/.zshrc >> .zshrc`
- * `touch .zprofile; curl https://raw.githubusercontent.com/jeffrey-l-turner/dotfiles/master/.zprofile >> .zprofile`
* Start a new terminal/warp session to have changes take effect
- *Recommended*: use a `.aider.conf.yml` file:
```
openai-api-base: https://openrouter.ai/api/v1
openai-api-key: sk-or-v1-<your_key>
model: openai/gpt-4-32k
```
- * *This* `.yml` *file has been added to the* `.gitignore` *for the project*

#### *Note:*  remember to have `nvm` installed (`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`) which should have been done previously

## Idempotency

Idempotency is the property of an operation that ensures that performing the operation multiple times has the same effect as performing it once. In other words, an idempotent operation can be safely repeated without changing the result.

Idempotency is an important property for many operations, such as:

* Distributed systems (*our focus!*)
* Financial transactions
* Database operations
* Caching systems
* Message queues

By ensuring that operations are idempotent, we can help to prevent errors, ensure data consistency, and improve the performance and scalability of our systems.

Here are some examples of idempotent operations:

* Transferring value in a single transaction from a blockchain account to another
* Deleting a file from a disk
* Inserting a record into a database
* Sending a message to a queue

Here are some examples of non-idempotent operations:

* Incrementing a counter
* Writing to a file
* Updating a database record
* Sending an email

To make a non-idempotent operation idempotent, we can use techniques such as:

* Using transactions
* Using idempotent functions
* Using state validation and integrity assurance

For example, we can use a transaction to ensure that a database operation is either completed successfully or not at all. This will prevent the database from being left in a inconsistent state if the operation is interrupted or fails.

We can also use idempotent functions to make our code more idempotent. An idempotent function is a function that always produces the same result when called with the same arguments, regardless of the number of times it is called.

Finally, we can use state validation and integrity assurance to ensure that our code is idempotent. This involves checking the state of the system before performing an operation and aborting the operation if the system is not in a valid state.

By using these techniques, we can help to make our code more idempotent and improve the reliability, performance, and scalability of our systems.

## Type Systems and State Integrity

Type systems are used to ensure the safety and correctness of computer programs. We can leverage idempotency of operations to insure that a valid global state is maintained in the overall blockchain system.

State validation and integrity assurance is the process of ensuring that the state of a system is valid and consistent. This can be done by using type checkers to verify that the state of the system satisfies certain invariants.

For example, we can use a type checker to verify that the state of an account satisfies the following invariant:

`balance >= 0`

This invariant ensures that the global state of account balances is always non-negative.

We can also use type checkers to verify that the state of a system satisfies more complex invariants. For example, we can use a type checker to verify that the state of a blockchain satisfies the following invariant:

`all transactions are valid`

This invariant ensures that all of the transactions on the blockchain are valid and that the blockchain is in a consistent state.

State validation and integrity assurance is a powerful technique that can be used to improve the safety and correctness of computer programs. By using type checkers to verify the state of a system, we can help to prevent errors and ensure that the system is in a valid and consistent state.

Here are some specific examples of how state validation and integrity assurance can be used in type theory:

- Type-safe access to memory: Type systems can be used to ensure that memory is accessed safely. For example, a type checker can verify that a pointer is never dereferenced after it has been freed.
- Correctness of data structures: Type systems can be used to ensure that data structures are used correctly. For example, a type checker can verify that a linked list is always in a valid state.
- Consistency of concurrent systems: Type systems can be used to ensure that concurrent systems are consistent. For example, a type checker can verify that two threads never access the same shared variable at the same time.

Overall, state validation and integrity assurance is a powerful technique that can be used to improve the safety and correctness of computer programs. Type theory provides a framework for implementing state validation and integrity assurance in a rigorous and systematic way.

### Importance of Keeping Invariant State

Here are some additional invariant examples that are specific to Unspent Transaction Output (UTXO) based blockchains:

Every block must contain a valid Merkle root of all UTXOs in the blockchain. This invariant prevents the modification of UTXOs without the consensus of the network.
Every transaction in a block must be valid and spend unspent transaction outputs from previous blocks. This invariant prevents the double-spending of UTXOs.
The total value of all UTXOs in a block must be equal to the total value of all coins that have been created and not yet spent. This invariant prevents the creation or destruction of coins.
These invariants are essential for ensuring the security and integrity of UTXO-based blockchains. By verifying these invariants, we can help to protect users from fraud and theft.

Overall, the UTXO paradigm is a powerful and flexible model for transaction processing. By using invariants to ensure the correctness of UTXO-based systems, we can build secure, scalable, and reliable systems.

### Two-Phase (2PC) Commit Strategy

A two-phase commit (2PC) strategy is a protocol used to ensure that a transaction is either fully committed or fully aborted across multiple databases or other resources. It does this by dividing the transaction into two phases:

Phase 1: Prepare
The coordinator sends a prepare message to all participants in the transaction. The participants then lock the resources they need for the transaction and respond to the coordinator.

Phase 2: Commit or Abort
If the coordinator receives a successful response from all participants, it sends a commit message to all participants. The participants then apply the changes to their databases and release the locks. If the coordinator receives a failure response from any participant, it sends an abort message to all participants. The participants then roll back the changes and release the locks.

2PC can help to maintain valid state by ensuring that all participants in a transaction agree on the outcome of the transaction before any changes are applied to their databases. This is especially important in distributed systems, where there is a risk of network partitions or failures.

However, 2PC also has some limitations:

- Blocking: 2PC can block transactions if one participant fails during the prepare phase. This is because the other participants will be unable to proceed with the transaction until the failed participant comes back online.
- Complexity: 2PC can be complex to implement, especially in distributed systems. This is because it requires careful coordination between the participants.
- Performance: 2PC can reduce the performance of transactions, especially in high-throughput systems. This is because it requires multiple round trips between the coordinator and the participants.

Despite its limitations, 2PC is a widely used protocol for ensuring data consistency across multiple databases or other resources. It is especially well-suited for applications where data consistency is critical, such as financial transactions and database replication.

Here are some ways to mitigate the limitations of 2PC:

- Use a timeout mechanism: If a participant does not respond to a prepare message within a certain period of time, the coordinator can assume that the participant has failed and abort the transaction. This can help to reduce blocking.
- Use a distributed consensus algorithm: A distributed consensus algorithm can be used to coordinate the participants in 2PC without the need for a central coordinator. This can help to improve performance and scalability.
- Use optimistic locking: Optimistic locking can be used to reduce the amount of time that resources are locked during a 2PC transaction. This can help to improve performance and scalability.
- Use State validation: this ensures that the state of the system is valid before and after a transaction. Types can be used to enforce state invariants, which are properties that the state of the system must always satisfy.

Overall, 2PC is a powerful tool for ensuring data consistency across multiple databases or other resources. By understanding its limitations and using techniques to mitigate them, you can design and implement 2PC systems that are reliable, performant, and scalable.

### Insuring State Invariance

State validation ensures that the state of the system is valid before and after a transaction. Types can be used to enforce state invariants, which are properties that the state of the system must always satisfy.

For example, we can use types to represent the state of a blockchain wallet account. As previously mentioned, we can define a type for the balance of the account, which can only be a non-negative number. We can also define a type for the status of the account.

When a transaction is performed on the blockchain wallet account, we can use state validation to ensure that the transaction does not violate any of the state invariants. For example, we can check that the balance of the account does not go below zero after the transaction.

We can also use types to enforce state invariants in distributed systems. For example, we can define a type for the state of a replicated database. We can then use state validation to ensure that all replicas of the database agree on the state of the database before any changes are applied.

By using state validation and types, we can help to mitigate the limitations of 2PC, such as blocking and complexity.

Here are some specific examples of how to use state validation and types to mitigate the limitations of 2PC:

- Use a type to represent the state of a transaction: This can be used to validate the state of the transaction before and after each phase of 2PC.
- Use a type to represent the state of a distributed system: This can be used to validate the state of the system before and after each phase of 2PC.
- Use a type to represent the state of a replicated database: This can be used to ensure that all replicas of the database agree on the state of the database before any changes are applied.

Overall, using state validation and types is a powerful way to mitigate the limitations of 2PC and improve the reliability and correctness of distributed systems.

### Combining Idepmpotancy with State Invariance

Idempotency can be used to improve the reliability and correctness of 2PC systems:

- Use idempotent functions to implement the 2PC protocol: This can help to ensure that the state of the system remains consistent, even if a failure occurs during the 2PC process.
- Use state validation to check for idempotency before and after each phase of 2PC: This can help to identify and prevent errors in the 2PC process.
- Use a distributed consensus algorithm to coordinate the participants in 2PC: This can help to ensure that all participants agree on the outcome of the 2PC transaction, even if a failure occurs.

### Global State in Context

Here are some techniques can be used to keep the global state of a blockchain system valid:

- Idempotent operations: All transactions on a blockchain are idempotent. This is because each transaction relies on the current state of the chain to a uniquely identified hash, and no transaction can be applied to the blockchain more than once in the distributed system.
- State invariance: Some common state invariants for blockchain systems include:
- * The total supply of coins must always be equal to the amount of coins that have been mined.
- * The balance of each account must always be non-negative.
- * Each transaction must be valid and spend unspent transaction outputs from previous blocks.
- Consensus algorithm: Proof-of-work (PoW) is a consensus algorithm that is commonly used in UTXO blockchain systems. PoW uses a complex mathematical problem to ensure that all nodes in the network agree on the global state of the system. Another consensus approach commonly used in account-based Blockchains is Proof of Stake (PoS).

