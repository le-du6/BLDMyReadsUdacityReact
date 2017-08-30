import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { getAll } from './BooksAPI';
import camelcase from 'camelcase';

const shelfsLabels = ["Currently Reading", "Want to Read", "Read"];

class Bookspage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      books: [],
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    getAll().then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let title, authors, imageLinks, id, shelf;
        return ({ title, authors, imageLinks, id, shelf } = fullbook);
      })
    });
      this.setState({ isLoading: false });
    });
  }

  render() {
    const books = this.state.books || [];
    const shelfs = shelfsLabels.map(x=>camelcase(x)) || [];

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
                <Bookshelf shelfTitle={shelfsLabels[index]} books={books.filter(book=>book.shelf===shelf)} {...this.props}/>
              </div>
            )}
          </div>) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i> loading Books</h2>
          )}

          <div className="open-search">
            <a href='/search'>Add a book</a>
            {/* <a onClick={()=> this.props.history.push('/search')}>Add a book</a> */}
            {/* <a onClick={()=> this.setState({ showSearchPage: true })}>Add a book</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Bookspage;