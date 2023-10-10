# Lecture 12

<div align="center">
  <img src="./Bitcoin_idempotent.png" width="250" height="250" />
</div>

# Housekeeping

- Switched over to openrouter.ai (budget $15/month/student); DM me if any issues
- Mid-term next week; Will be in class and proctered.
- Reminder: Upgdate your Aider: `pip install aider-chat`
- New context window size and demo set up. 

# Using dotfiles and Homebrew on MacOS (better M2 setup)
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

## *Note:*  remember to have `nvm` installed (`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`) which should have been done previously

# Idempotency, Concurrency, State Invariance, and 2PC

- [See](./notes_lec13.md)

## Assignment

* Weekly Quiz out tomorrow

## Resources mentioned in Lecture and potentially for Quiz

* [Idempotency in REST](https://zongwb.medium.com/idempotency-a-three-step-approach-d607895c2b93) 
* [Free Uber Eats](https://twitter.com/gergelyorosz/status/1502947315279187979)
