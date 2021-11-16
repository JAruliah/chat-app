# Chat App
![chatamus-main](https://user-images.githubusercontent.com/71105258/141927009-2b1fed0d-539b-4e52-8979-ea04938ec432.png)
![chatamus-chat](https://user-images.githubusercontent.com/71105258/141927018-a73cb1e7-ae2b-4900-b4ac-d025f45a842e.png)

### Live Site: https://chatamus.jaruliah.me/

This is a real time chat app using socket.io

## Description

Project is made using nodejs, express, socket.io, react and typescript. Users will be able to join chat rooms with a unique username chosen by the user. There are three chat rooms users can join. For each chat room a total number of active users in the room is displated. In the chat room, a list of active users will be displayed and each message will have the author of the message and the time it was sent. This is all done in real time.

## Getting Started

### Installing/Setup
#### Server 
* to install all server dependencies run:
```
cd server
npm install
```
#### Client
* .env must be created with REACT_APP_BASE_URL = 'your server address'
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
- [x] Add on join room event
- [x] Create main page, enter a username
- [x] Implement message sending
- [x] Implement message recieving
- [x] Display all users in each room
- [x] Add option to disconnect from room
- [x] Display user count for each room
- [x] React frontend formatting messages
- [x] Style UI elements
- [x] Deploy :)

## Upcoming Features ??
- [ ] Optimize site
- [ ] Add user profiles
??




