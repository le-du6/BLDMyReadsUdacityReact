# BLDMyReadsUdacityReact
MyReads Project n°1 "A Book Tracking App" from Udacity Nanodegree 2017 "Udacity React"

This application is a A Book Lending App

## Install
Clone this repo to your computer with the command:
 ``` shell
 git clone https://github.com/le-du6/BLDMyReadsUdacityReact.git
 ```

Go inside the cloning directory:
 ``` shell
 cd BLDMyReadsUdacityReact
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
              index.js              <---- init router      :: no req to the database API
                 |
                App.js              <---- state + 2 routes :: maintain the "books user" state
                 |                                                                        ^
            -------------                                                                 |
            |           |                                                                 |
       Search.js    Bookspage.js    <---- state      <--->   fetch books getAll()         |
            |           |                                                                 | 
         Book.js    Bookshelf.js    <---- stateless     ::   no req                       |
                        |                                                                 |
                      Book.js       <---- stateless  <--->   req and fetch the update() ---
 ```

App files | Type of ReactComponent | Purpose
--- | --- | ---
index.js | React Router | handle the main React Router with BrowserRouter
App.js | React Class Component with State and 2 React Route | handle the state of the updtaded Books 

