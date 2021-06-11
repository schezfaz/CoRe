# Course Refiner (CoRe) v1.0

https://courserefiner.tech

## Introduction

CoRe (or Course Refiner) is a webapp that sources the cheapest 
courses from major learning platforms, like Udemy and Udacity, and 
displays them in a comparative fashion. Alongside this, CoRe also 
displays similar free resources such as YouTube playlists that 
cover the same CS content.

## Description

Accessibility to education, especially CS education, comes 
at a price. Quite literally. There are a vast number of resources 
and courses available on the internet, however for somebody who is 
trying to self-learn, it is difficult to find quality resources at 
a low cost. One of the biggest hindrances to availing a CS 
education/resources is the cost of these courses that one has to 
bear. With CoRe, finding free or low-cost CS content is a few 
keystrokes away. 

## Technologies/OS Projects
The frontend is a React app that uses 
[Stylex](https://github.com/ladifire-opensource/stylex).

The backend is a Node.JS/Express app that uses third-party APIs 
(i.e. [YouTube's](https://developers.google.com/youtube/v3/docs)) to 
collect and aggregate course information.

## How to run
### If you'd like to run your own instance of the app, here's how

1. In your terminal of choice:
```bash
$ cd backend
$ npm install
$ npm start
```

2. In another terminal window:
```bash
$ cd frontend
$ npm start
```

3. Visit the website at `localhost:3000`!
