# Running the application

The front end portion of the application is developed in react. You can run the application with react and npm, or with Docker.
The steps I provide are for running the application are through docker, so you don't have to worry about react npm versioning, and instaling the third party
modules.

These steps are also outlined in the backend repo found [here](https://github.com/bilalmalik4321/Shopify-Summer-22).

 0. Make sure you have set up the mongoDB image and node api prior to this or the front end will not fetch and data, steps to set it up are [here](https://github.com/bilalmalik4321/Shopify-Summer-22). 

 1. You will see a Dockerfile in the root directory, we will build the front end app, which is placed in its own custom image.
 Start by building the image with the following command in the terminal at the root directory of the fornt end app:
 
 ```
 docker build -t shopify-challenge-frontend:latest .
 ```
 
 Or any other name you'd like instead of 'shopify-challenge-frontend'. 
 
 2. Once the image is built, we want to run the image, this will create a container, think of it as a small isolated environment where the app runs away from
 the host OS.
 
 To run our image:
 
 ```
 docker run -p 3000:3000 shopify-challenge-frontend:latest
 ```
 
 Where we run the image on port our computer port 3000 form the internal port of docker at 3000. If you want to chage the port, just chane the first
 port number before the colon ":" as that wil map to a new port on our machine. Please don't use 5000 as thats already being used by the Node app.
 
 Go to  `localhost:3000` and the inventory app is ready!
 
