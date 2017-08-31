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
  fetch search()  <--->   Search.js    Bookspage.js    <---- state      <--->   fetch books getAll()         |
  + affecting                  |           |                                                                 | 
  + correct shelf           Book.js    Bookshelf.js    <---- stateless     ::   no req                       |
                                           |                                                                 |
                                         Book.js       <---- stateless  <--->   req and fetch the update() ---
 ```

App files | Type of ReactComponent | Purpose
--- | --- | ---
index.js | React Router | handle the main React Router with BrowserRouter
App.js | React Class Component with State and 2 React Route | handle the state of the updtaded Books 
Bookspage.js | React Class Component with State | fetch getAll() books and affect correct shelf
Bookshelf.js | Stateless Component | render each shelf from the parent loop 
Book.js | Stateless Component | render each book from the parent loop and trigger the update() function to move the book
Search.js | React Class Component with State  | fetch search() req and affect correct shelf 

