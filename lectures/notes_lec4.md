# Comparing Bitcoin and Ethereum "Global State"

In Ethereum, the "global state" refers to the collective state of all accounts and smart contracts that exist in the blockchain. This includes several key elements:

Account Balances: This includes the balance of Ether (ETH), the native cryptocurrency of Ethereum, for each account.

Smart Contract Code: The actual code of all the deployed smart contracts on the Ethereum blockchain. This is stored in a byte format.

Smart Contract Storage: Each smart contract in Ethereum has its own storage, where it can keep track of variables and data. This includes the current state of all variables defined in the contract.

Nonce: For regular (Externally Owned) accounts, the nonce represents the number of transactions sent from the account's address. For contract accounts, the nonce is the number of contracts created by the account.

Account Status: Whether an account is empty or not.

All of these items are stored in a data structure called a "Merkle Patricia Tree", which allows for efficient storage and quick lookups and updates to the state. It is worth noting that all of this data is stored publicly, as one of the key principles of Ethereum and blockchain technology in general is transparency and auditability.

Bitcoin and Ethereum have significantly different design philosophies, which is reflected in their respective blockchain states.

Bitcoin operates on an Unspent Transaction Output (UTXO) model. In this model, there is no concept of "accounts" with balances. Instead, each transaction in Bitcoin consumes one or more UTXOs and produces one or more new UTXOs. The UTXOs are the fundamental elements of the Bitcoin global state.

Bitcoin's global state, therefore, consists of:

Unspent Transaction Outputs (UTXOs): Each UTXO represents a certain amount of Bitcoin that was outputted (i.e., spent) by a previous transaction and has not yet been spent by any subsequent transaction.

Transaction Data: Each transaction includes metadata such as input and output addresses, the amount of Bitcoin being transferred, and a timestamp.

Bitcoin does not support complex smart contracts (beyond basic scripts) and there is no notion of contract storage or nonce as in Ethereum.

Ethereum, on the other hand, operates on an Account/Balance model. In this model, there are accounts, each of which has a balance of Ether. Transactions directly modify these balances. Ethereum's global state, as described in the previous answer, includes account balances, smart contract code, smart contract storage, and nonces.

Another major difference lies in Ethereum's ability to execute Turing-complete code through its smart contracts, which allows for the creation of decentralized applications (DApps). This is not possible in Bitcoin, which has a scripting language that is not Turing-complete. As such, the global state of Ethereum is much more complex and dynamic than that of Bitcoin.
