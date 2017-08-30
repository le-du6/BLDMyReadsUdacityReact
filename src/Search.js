import React, { Component } from 'react';
import { search } from './BooksAPI';
import Book from './Book';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMoving: false,
      books: [],
    };
    // this.movingSpinner = this.movingSpinner.bind(this);
  }

  componentDidMount() {
    search('Art', 20).then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let { title, authors, imageLinks, id, shelf } = fullbook;
        return { title, authors, imageLinks, id, shelf: "none" };
      })
    });
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href='/'>Close</a>
          <div className="search-books-input-wrapper">
            {/* NOTES: The search from BooksAPI is limited to a particular set of search terms. You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md However, remember that the
            BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title.
            Every search is limited by search terms. */}
            <input type="text" placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
            { (!this.state.isLoading)
          ? (<ol className="books-grid">
            {this.state.books.map((book, index) =>
                <li key={index}>
                  <Book book={book} {...this.props}/>
                </li>
            )}
          </ol>

          ) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {(this.state.isMoving) ? ' moving Books' : ' searching Books'}
            </h2>
          )}

        </div>
      </div>
    </div>
    );
  }
}

export default Search;