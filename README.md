# BLDMyReadsUdacityReact
MyReads Project n°1 "A Book Tracking App" from Udacity Nanodegree 2017 "Udacity React"

This application is a A Book Lending App

## Install
Clone this repo to your computer with the command:
 ``` shell
 git clone https://github.com/le-du6/BLDMyReadsUdacityReact.git
 ```

Then install the needed Node modules with the command:
 ``` shell
 npm install
 ```

And finaly launch the app with: 
 ``` shell
 npm start
 ```

## App and React Architecture
> *The following choices were made regarding the types of React Components*

 ``` shell
              index.js
                 |
                App.js
                 |
            ------------     
            |           |
       Search.js    Bookspage.js
            |           |
         Book.js    Bookshelf.js
                        |
                      Book.js
 ```

App files | Type of ReactComponent | Purpose
--- | --- | ---
index.js | React Router | handle the main React Router with BrowserRouter
App.js | React Class Component with State and 2 React Route | handle the state of the updtaded Books 

