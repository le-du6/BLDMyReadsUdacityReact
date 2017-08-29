import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import Bookspage from './Bookspage';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Bookspage} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default App;
