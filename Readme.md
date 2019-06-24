# Code Kata Boilerplate

#### A simple NodeJS base setup

This is a starter Repo with just enough boilerplate stuff to kick off a code kata written in node.

## What you get

* Linting (via [eslint](https://eslint.org/) - [airbnb code style](https://github.com/airbnb/javascript))
* Jest
  * [standard API](https://jestjs.io/docs/en/api) including
    * [Manual Mocks](https://jestjs.io/docs/en/manual-mocks)
    * [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)

## Preconditions

* nodejs installed
* npm installed
* This repo cloned via Git (Jest needs the source to be git-indexed for TDD)

## Nice to have

For the best Developer experience, it is advised to have your IDE …
* … configured to treat Javascript as ECMA Script 6
* … configured to incorporate eslint
* … ensue to `.editorconfig` by the use of a [respective plugin](https://editorconfig.org/#download)

## Getting Started

N.b.: `<destination>` is a placeholder

1. Get the source using Git and `cd` into the respective directory
    ```
    git clone https://github.com/iilei/kata-boilerplate.git <destination>
    cd <destination>
    ```
2. Get Dependencies
    ```
    npm install
    ```
3. Enjoy your TDD Kata
    ```
    npm run tdd
    ```
