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
    };
    this.shelfSplitterUpdater = this.shelfSplitterUpdater.bind(this);
  }

  shelfSplitterUpdater(shelfSplitter) {
    // console.log('from App: ',shelfSplitter);
    this.setState({ shelfSplitter: Object.assign({}, shelfSplitter) });
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
                              />} />
        <Route path="/search" 
            render={() => <Search
                            shelfSplitter={shelfSplitter}
                            shelfSplitterUpdater={shelfSplitterUpdater}
              />} />
      </div>
    );
  }
}

export default App;
