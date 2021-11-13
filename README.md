# Chat App

This is a real time chat app using socket.io

## Description

Project is made using nodejs, express, socket.io, react and typescript. Users will be able to join chat rooms with a unique username chosen by the user. In the chat application, a list of active user will be displayed and each message will have the author of the message and the time it was sent.

## Getting Started

### Installing/Setup
#### Server 
* to install all server dependencies run:
```
cd server
npm install
```
#### Client
* to install all client dependencies run:
```
cd ../client
npm install
```


### Executing program
#### Server

* Typescrpt must be compiled first run:
```
cd ../server
npm run build
```

* To start the server run:

```
cd ../server
npm run start
```

#### Client
* To start react run:

```
cd ../client
npm start
```

## Things to do

- [x] Initialize project
- [x] Add on join event
- [x] Create main page, enter username
- [x] Add on message send event
- [x] Add on disconnect event
- [x] Disconnect from chat room button
- [x] Display all users in each room
- [x] Display user count for each room
- [ ] React frontend formatting messages
- [ ] Display connected users
- [ ] Style UI elements
- [ ] Deploy




