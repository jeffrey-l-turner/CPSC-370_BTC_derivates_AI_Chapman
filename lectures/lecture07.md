# Lecture 6

# Housekeeping

- Mistake on Canvas Quiz -- future ones will be only twice
- Back on track for GPT-4 Usage Budget and notify me of Rate Limiting
- Coding exercise this week
- Aider fork almost ready for Conda; M1/M2 Development working
- Investigate [AI Coding Models](https://arxiv.org/abs/2211.03622) &  ["AI x Crypto" - A16Z Podcast](https://podcasts.apple.com/us/podcast/a16z-podcast/id842818711)
- Formal Specification --> Formal Verification --> Code -- Unit/Integration Tests --> Provably Correct
- Office Hours reversed next week and in-office Tuesday -- not Thursday
- Business School collaboration: Note new Discord
- Use Warp, oh-my-zsh & my dotfiles before seeing me in office hours (see: [Warp](https://app.warp.dev/referral/PXZMWP), [oh-my-zsh](https://ohmyz.sh/), [JLT dotfiles `wget`/`curl > ~/.zshrc` this link](https://raw.githubusercontent.com/jeffrey-l-turner/dotfiles/master/.zshrc))
- Showcase from last week

# Revisit Developoment Methodology

- File Navigation (e.g. `cd ~`, `cd src/<project-name>`, reproducibility & canonical form)
- Git intrinsics and usage
> * `git checkout -b <branch_name>`
> * `git merge <branch_name>`
> * `git branch -r`
> * `git log`
> * `git bisect`
- Aider Strategies
> * Branching (`git checkout -b <test-branch>`)
> * Checkpointing changes (`git checkout -b <some-short-term-branch`, `git checkout -; git merge -`)
> * Review Aider Changes (`git log`)
> * Run the Code (`npm start`, `deno task start`, etc.)
> * Ask Aider to write tests: "Add a unit test framework for this code... Write unit test for this file..."

# Crypto Wallets 

* (Interaction with Chain)[https://www.simplilearn.com/tutorials/blockchain-tutorial/blockchain-wallet]
* Software Wallets:
> * DApps, Apps...
> * Smart Contract Implementations
* Hardware Wallets:
> * Ledger, Coldcard, Trezor...
> * (Controversies)[https://www.coindesk.com/consensus-magazine/2023/05/19/ledgers-hard-lesson-being-right-isnt-good-enough/]

# Smart Contracts

* (Interaction with Chain)[./notes_lec7.md]
* Programming: ([Solidty](https://docs.soliditylang.org/en/v0.8.21/) vs ([Alu](https://www.rgbfaq.com/glossary/aluvm) & [Functional/Compositional Programming](https://www.rgbfaq.com/rgb-smart-contracts/how-does-one-program-rgb-smart-contracts))/[Rholang](https://rholang.github.io/docs/rholang/))
* [On-Chain/Off-Chain Interaction and Data](https://www.researchgate.net/profile/Zeinab-Nehai/publication/332669639/figure/fig1/AS:751780929486849@1556249949435/Communication-process-between-on-chain-and-off-chain.ppm)
* [Composition](https://x-team.com/blog/functional-programming-composition-associativity/)
* [Oracles](https://www.forbes.com/sites/digital-assets/article/why-do-blockchains-need-oracles/?sh=186e464b7569)

## Quiz & Assignment Review

* Quiz to be published & due End of Day this Sunday the 24th
* Programming Assignment Expected Thursday, personal environments are expected to be fully operating

## Resources for this Lecture and Quiz

* [Bard](https://bard.google.com)
* [MIT Lost Skills - Missing Semester of CS](https://missing.csail.mit.edu/ )

