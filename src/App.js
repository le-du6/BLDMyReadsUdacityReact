import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import Bookspage from './Bookspage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfSplitter: {
        "currentlyReading": [
            "sJf1vQAACAAJ",
            "jAUODAAAQBAJ"
        ],
        "wantToRead": [
            "evuwdDLfAyYC",
            "74XNzF_al3MC"
        ],
        "read": [
            "IOejDAAAQBAJ",
            "1wy49i-gQjIC"
        ]
    },
    };
    this.shelfSplitterUpdater = this.shelfSplitterUpdater.bind(this);
  }

  shelfSplitterUpdater(shelfSplitter) {
    this.setState({ shelfSplitter });
  }

  render() {
    const shelfSplitter = this.state.shelfSplitter;
    return (
      <div>
        <Route exact path="/" component={Bookspage} shelfSplitter={shelfSplitter}/>
        <Route path="/search" component={Search} shelfSplitter={shelfSplitter}/>
      </div>
    );
  }
}

export default App;
