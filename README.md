# Distributed System Mock

## Introduction

Welcome to my distributed systems educational project!🥳 This project is all about learning distributed systems, HTTP, TCP/IP, Node.js, and TypeScript. I've intentionally kept it low-level and avoided using frameworks to dive deep into the core concepts. It's a work in progress, so stay tuned for more updates!

## Project Overview

A distributed key-value store implemented with Node.js and TypeScript. The system ensures data consistency across multiple nodes. This project helped me understand distributed systems and low-level networking concepts by avoiding high-level frameworks and focusing on fundamental and core technologies.

## Features

- **Basic Commands**: Supports `SET`, `GET`, and `DEL` commands.
- **Distributed Architecture**: Requests are forwarded across multiple nodes/teers.
- **Data Consistency**: Ensures all nodes have a consistent view of the data.
- **Error Handling**: Handles invalid commands and missing keys gracefully.

## Workflow

1. **Start the Servers**: Launch multiple server instances to act as nodes in the distributed system.
2. **Client Requests**: Clients can connect to any node and send commands.
3. **Command Processing**: Node process the commands and update the local store then forward the request to other nodes.
4. **Response**: The node sends a response back to the client.

## TODOs

- **Add Different Types of Nodes**: Explore adding different types of nodes with specialized roles.
- **Increase the Complexity of the nodeController**: Enhance the `nodeController` to handle more complex scenarios and improve efficiency.
- **Use WebSocket for Frontend**: Implement a frontend using React and WebSocket to interact with the distributed system in real-time.
- **Improve Concurrency Handling**: Optimize the system to handle concurrent requests more efficiently.
- **Enhance Fault Tolerance**: Implement more robust mechanisms to handle node failures and ensure system reliability.

## How to Run

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/7ossam7atem1/distributed-system.git
   cd distributed-system

   ```

2. **Install Dependencies**:

   ```sh
   npm install

   ```

3. **Start the Servers**:

   ```sh
   npx ts-node src/index.ts configFileName.json

   ```

> Example:
>
> ```sh
> npx ts-node src/index.ts config1.json
> ```
>
> 4. **Run the Client**:

```sh
npx ts-node tests/test-command.ts

```

> Example:
>
> ```sh
> npx ts-node tests/test-set.ts
> ```

## Screenshots

![System archeticture](/public/Full%20Archeticture/Archeticture.png)

<br>
<hr>
<br>

![SET command](/public/sample%20commands/SET-Command-diagram.png)

<br>
<hr>
<br>

![Test SET command](/public/sample%20commands/testSET.png)

<br>

## Under Development

This project is still under development. It's my playground to learn and experiment, so expect frequent updates and changes. Feel free to explore, suggest improvements, or even fork the project and build your own version :)
