import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import Bookspage from './Bookspage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfSplitter: {},
      isMoving: false,      
    };
    this.movingSpinner = this.movingSpinner.bind(this);
    this.shelfSplitterUpdater = this.shelfSplitterUpdater.bind(this);
  }

  movingSpinner(state) {
    this.setState({ isMoving: state });
  }

  shelfSplitterUpdater(shelfSplitter) {
    // console.log('from App: ',shelfSplitter);
    this.setState({ shelfSplitter });
  }

  render() {
    const shelfSplitter = this.state.shelfSplitter;
    const shelfSplitterUpdater = this.shelfSplitterUpdater;

    return (
      <div>
        <Route exact path="/"
            render={() => <Bookspage
                            shelfSplitter={shelfSplitter}
                            shelfSplitterUpdater={shelfSplitterUpdater}
                            isMoving={this.state.isMoving}
                            movingSpinner={this.movingSpinner}
                              />} />
        <Route path="/search" 
            render={() => <Search
                            shelfSplitter={shelfSplitter}
                            shelfSplitterUpdater={shelfSplitterUpdater}
                            isMoving={this.state.isMoving}
                            movingSpinner={this.movingSpinner}
              />} />
      </div>
    );
  }
}

export default App;
