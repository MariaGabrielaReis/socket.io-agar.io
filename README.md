# Agar.io Clone

A **Agar.io game** built with **JavaScript**, **Express**, and **Socket.io**. This project was developed as part of an online course on Udemy: [SocketIO v4, with websockets - the details](https://www.udemy.com/course/socketio-with-websockets-the-details/).

## 🎮 Overview

This project recreates the core mechanics of the classic Agar.io game, where players control a orb and compete to grow by consuming smaller orbs in a shared online arena.

Features include:

* Real-time multiplayer interaction using Socket.io
* Smooth movement and collision detection
* Dynamic food spawning system
* Simple and responsive game interface

## 🚀 Technologies Used

* JavaScript
* Express
* Socket.io
* HTML5 Canvas

## 📹 Demonstration
https://github.com/user-attachments/assets/c4b3402d-37a5-45f3-8677-7b26ed59dd0a

## 📦 How to Run

```bash
# 1. Clone the repository:
   git clone https://github.com/MariaGabrielaReis/socket.io-agar.io

# 2. Navigate into the project folder:
   cd socket.io-agar.io

# 3. Install dependencies:
   npm install

# 4. Start the server:
   nodemon index.js
```
Open your browser and go to: [http://localhost:9000](http://localhost:9000)

## 🧱 Architecture

### Folder Structure

```bash
project/
├── public/ # Client-side code (HTML, CSS, JS and socket.io)
│ ├── canvas.js # Draw orbs, players and handle UI updates
│ ├── index.html 
│ ├── socket.js # Client-side to handle socket to update UI
│ ├── styles.css
│ └── ui.js # Handle modals to start game
├── socket/  # Server-side code (express and socket.io)
│ ├── classes/
│ │ ├── Orb.js # A master orb object
│ │ ├── Player.js # A master player object
│ │ ├── PlayerConfig.js # The data specific to current player that only the player needs to know
│ │ ├── PlayerData.js # The data specific to current player that everyone needs to know
│ ├── checkCollisions.js # Check collisions player X player or player X orb
│ └── index.js # Server-side from socket with logics of states, movements, collisions...
├── index.js
├── package.json
└── servers.js # Express and Socket.io setup
```
