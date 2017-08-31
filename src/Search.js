import React, { Component } from 'react';
import { search } from './BooksAPI';
import { update } from './BooksAPI';
// import camelcase from 'camelcase';

import Book from './Book';

// const shelfsCategories = ["currentlyReading", "wantToRead", "read"];
// // Define propers Shelfs Labels with Capitalization and correct Spacing
// const shelfsLabels = ["Currently Reading", "Want to Read", "Read"];
// // Construct a map with the corresponding camelCase shelf property
// let mappingShelfLabels = {};
// shelfsLabels.forEach(shelf => {
//   mappingShelfLabels[camelcase(shelf)] = shelf;
// });

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAffecting: false,
      books: [],
    };
  }

  componentDidMount() {
    update('***retreive-books-list****', 'none').then( res => {
      this.props.shelfSplitterUpdater(res);
      });

    search('Art', 20).then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let { title, authors, imageLinks, id, shelf='none' } = fullbook;
        return { title, authors, imageLinks, id, shelf };
      })
    });
      console.log(this.state.books)
      this.setState({ isLoading: false });
    });
  }

  render() {
    // shortcut + re-affecting the correct shelf to each books when Re-render
    const shelfs = this.props.shelfSplitter;
    // modifiy the shelf of those filtered books according to the new shelf
    const newBooks = this.state.books.map(book => 
      Object.assign( {}, book,
        // Assign the correct new shelf after the update
        { shelf: Object.keys(shelfs).filter(shelf => shelfs[shelf].includes(book.id))[0] || "none" }
      )
    );

    return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href='/'>Close</a>
          <div className="search-books-input-wrapper">
            {/* NOTES: Every search is limited by search terms. */}
            <input type="text" placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
        {(!this.state.isLoading && !this.state.isAffecting)
          ? (<ol className="books-grid">
              {newBooks.map((book, index) =>
                <li key={index}>
                  <Book book={book} movingSpinner={(toggle)=>this.setState({isAffecting: toggle})} {...this.props}/>
                </li>
              )}
              </ol>
          ) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {(!this.state.isAffecting) ? ' searching Books' : ' affecting Shelf'}
            </h2>
          )}
        </div>
      </div>
    </div>
    );
  }
}

export default Search;