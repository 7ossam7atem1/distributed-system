# Distributed System Mock

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage Guide](#usage-guide)
  - [Starting a Server](#starting-a-server)
  - [Using the Client](#using-the-client)
- [Visualization](#visualization)
  - [System Architecture](#system-architecture)
  - [Command Forwarding](#command-forwarding)
- [Example Scenarios](#example-scenarios)
  - [Scenario 1: Basic Operations](#scenario-1-basic-operations)
  - [Scenario 2: Fault Tolerance and Recovery](#scenario-2-fault-tolerance-and-recovery)

## Project Overview

This project demonstrates a distributed key-value store using raw TCP connections with Node.js and TypeScript. It is designed to help you understand the principles of distributed systems, low-level networking, and CLI-based interaction.

## Features

- **Distributed Architecture**: Operates across three nodes to ensure data consistency.
- **Command Support**: Implements basic commands like `GET`, `SET`, `UPD`, and `DEL`.
- **Node Failure Detection**: Monitors and manages node failures with a heartbeat mechanism.
- **Recovery Mechanism**: Synchronizes recovered nodes with the rest of the system.
- **CLI Tools**: Provides command-line interfaces for both server management and client interactions.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/7ossam7atem1/distributed-system.git
   cd distributed-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Usage Guide

### [Starting a Server](#starting-a-server)

To start a server, use the following command:

```bash
npm start
```

You will be prompted to choose which server instance to run.

### [Using the Client](#using-the-client)

To interact with a server, use the following command:

```bash
npm test
```

You will be prompted to select a server instance and then execute commands like `SET`, `GET`, `UPD`, and `DEL`.

## Visualization

### [System Architecture](#system-architecture)

![System Architecture Diagram](/public/Full%20Archeticture/Archeticture.png)

_Diagram showing the overall architecture of the distributed key-value store system._

### [Command Forwarding](#command-forwarding)

![Command Forwarding Diagram](/public/sample%20commands/SET-Command-diagram.png)

_Diagram illustrating how the `SET` command is forwarded from Server A to other nodes._

## Example Scenarios

### Scenario 1: Basic Operations

1. **Start Server Instances:**  
   Run the servers using `npm start` for Server A, Server B, and Server C.

2. **Set a Value Using Client CLI:**  
   Connect to Server A and execute the command:

   ```bash
   SET testKey testValue
   ```

   The `SET` command will be forwarded to Server B and Server C.

3. **Get the Value:**  
   Execute the command to retrieve the value:

   ```bash
   GET testKey
   ```

   Confirm that `testKey` returns `testValue` from Server A, Server B, and Server C.

4. **Update the Value:**  
   Update the value using the command:

   ```bash
   UPD testKey newValue
   ```

   Ensure that all servers reflect the updated value `newValue`.

5. **Delete the Key:**  
   Execute the delete command:

   ```bash
   DEL testKey
   ```

   Verify that `testKey` is no longer present on Server A, Server B, and Server C.

### Scenario 2: Fault Tolerance and Recovery

1. **Start Server Instances:**  
   Ensure all server instances are running.

2. **Simulate Node Failure:**  
   Stop Server B to simulate a failure.

3. **Send Commands:**  
   Execute commands using the Client CLI and verify that Server A and Server C process them.

4. **Restart the Failed Node:**  
   Restart Server B and check the recovery process.

5. **Verify Recovery:**  
   Confirm that Server B resynchronizes with Server A and Server C and reflects the latest data.

6. **Check Data Consistency:**  
   Ensure that all servers have consistent data after the recovery of Server B.


