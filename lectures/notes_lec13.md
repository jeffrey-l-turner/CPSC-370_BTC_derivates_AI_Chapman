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

## Type Systems and State Integrity

Type systems are used to ensure the safety and correctness of computer programs.

State validation and integrity assurance is the process of ensuring that the state of a system is valid and consistent. This can be done by using type checkers to verify that the state of the system satisfies certain invariants.

For example, we can use a type checker to verify that the state of a bank account satisfies the following invariant:

`balance >= 0`

This invariant ensures that the bank account balance is always non-negative.

We can also use type checkers to verify that the state of a system satisfies more complex invariants. For example, we can use a type checker to verify that the state of a blockchain satisfies the following invariant:

`all transactions are valid`

This invariant ensures that all of the transactions on the blockchain are valid and that the blockchain is in a consistent state.

State validation and integrity assurance is a powerful technique that can be used to improve the safety and correctness of computer programs. By using type checkers to verify the state of a system, we can help to prevent errors and ensure that the system is in a valid and consistent state.

Here are some specific examples of how state validation and integrity assurance can be used in type theory:

Type-safe access to memory: Type systems can be used to ensure that memory is accessed safely. For example, a type checker can verify that a pointer is never dereferenced after it has been freed.
Correctness of data structures: Type systems can be used to ensure that data structures are used correctly. For example, a type checker can verify that a linked list is always in a valid state.
Consistency of concurrent systems: Type systems can be used to ensure that concurrent systems are consistent. For example, a type checker can verify that two threads never access the same shared variable at the same time.
Overall, state validation and integrity assurance is a powerful technique that can be used to improve the safety and correctness of computer programs. Type theory provides a framework for implementing state validation and integrity assurance in a rigorous and systematic way.

### Keeping Invariant State

Here are some additional invariant examples that are specific to UTXO-based blockchains:

Every block must contain a valid Merkle root of all UTXOs in the blockchain. This invariant prevents the modification of UTXOs without the consensus of the network.
Every transaction in a block must be valid and spend unspent transaction outputs from previous blocks. This invariant prevents the double-spending of UTXOs.
The total value of all UTXOs in a block must be equal to the total value of all coins that have been created and not yet spent. This invariant prevents the creation or destruction of coins.
These invariants are essential for ensuring the security and integrity of UTXO-based blockchains. By verifying these invariants, we can help to protect users from fraud and theft.

Overall, the UTXO paradigm is a powerful and flexible model for transaction processing. By using invariants to ensure the correctness of UTXO-based systems, we can build secure, scalable, and reliable systems.

### Maintaining System Integrity & Security
