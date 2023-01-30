# Miner

## About

miner is a powerful Node.js module that allows you to easily interact with the Mojang API.

## Installation

```sh
npm install miner

yarn add miner
```

## Quick start guide

```sh
yarn create miner-app

npx create-miner-app@latest

pnpm create miner-app
```

## Example usage

```ts
import { Server } from 'miner';

const server = new Server('1.19.3');

server.listen(25565);
```

See more usage https://github.com/sujang958/miner/tree/main/apps/server/
