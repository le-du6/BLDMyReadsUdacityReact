import React, { Component } from 'react';
import Bookshelf from './Bookshelf';

const shelfsCategory = ["currentlyReading", "wantToRead", "read"];
const shelfs = ["Currently Reading", "Want to Read", "Read"];

class Bookspage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpenDrop: false,
    };
    // this._toggle = this._toggle.bind(this);
    // this._togDrop = this._togDrop.bind(this);
    // this._togMouseOn = this._togMouseOn.bind(this);
    // this._logout = this._logout.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    setTimeout(x=>this.setState({isLoading: false}), 3000)
  }

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {(!this.state.isLoading) ? (
          <div className="list-books-content">
            {shelfs.map((shelf, index) =>
              <div key={index}>
                <Bookshelf shelfTitle={shelf} books={null}/>
              </div>
            )}
          </div>) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i> loading Books</h2>
          )}

          <div className="open-search">
            <a onClick={()=> this.props.history.push('/search')}>Add a book</a>
            {/* <a onClick={()=> this.setState({ showSearchPage: true })}>Add a book</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Bookspage;