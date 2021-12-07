# Chatamus
![chatamus](https://user-images.githubusercontent.com/71105258/144942066-14e2ae4a-07a6-4c92-9edb-523b4fbd5fed.gif)

### Live Site: https://chatamus.jaruliah.me/

This is a real time chat app using socket.io

## Description

In this project users will be able to join chat rooms with a unique username chosen by the user. There are three chat rooms users can join. For each chat room a total number of active users in the room is displayed. In the chat room, a list of active users will be displayed and each message will have the author of the message and the time it was sent. This is all done in real time.

## Built With
- Typescript
- React
- Nodejs
- Express
- MongoDB
- Socket.io
- SCSS
- Tailwind
- Hosted on NGINX VPS

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

* To create a production ready build run:
```
cd ../client
npm run build
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




