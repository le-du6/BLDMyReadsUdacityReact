import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { getAll } from './BooksAPI';
import camelcase from 'camelcase';

const shelfsCategories = ["currentlyReading", "wantToRead", "read"];
// Define propers Shelfs Labels with Capitalization and correct Spacing
const shelfsLabels = ["Currently Reading", "Want to Read", "Read"];
// Construct a map with the corresponding camelCase shelf property
let mappingShelfLabels = {};
shelfsLabels.forEach(shelf => {
  mappingShelfLabels[camelcase(shelf)] = shelf;
});

class Bookspage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMoving: false,      
      books: [],
    };
    this.movingSpinner = this.movingSpinner.bind(this);
  }

  componentDidMount() {
    let shelfSplitter = {};

    //fetch all books at initial Time
    getAll().then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let { title, authors, imageLinks, id, shelf } = fullbook;
        shelfSplitter[shelf] = (shelfSplitter[shelf] || []).concat(id);
        // Update the App state shelfSplitter for using it latter
        this.props.shelfSplitterUpdater(shelfSplitter);
        return { title, authors, imageLinks, id, shelf };
      })
    });
      this.setState({ isLoading: false });
    });
  }

  movingSpinner(state) {
    this.setState({ isMoving: state });
  }

  render() {
    // shortcuts
    const shelfs = this.props.shelfSplitter || null;
    // shortcut + re-affecting the correct shelf to each books when Re-render
    // modifiy the shelf of those filtered books according to the new shelf
    const newBooks = this.state.books.map(book => 
      Object.assign( {}, book,
        // Assign the correct new shelf after the update
        { shelf: Object.keys(shelfs).filter(shelf => shelfs[shelf].includes(book.id))[0] }
      )
    );

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {/* Waitting for the fetch books getAll request with a Spinner*/}
          {(!this.state.isLoading && !this.state.isMoving) ? (
          <div className="list-books-content">
            {/* Looping over shelfs using Object.keys() */}
            {shelfsCategories.map((shelf, index) =>
              <div key={index}>
                <Bookshelf
                  // find the correct non "Camel Case" Label according to the current camel case shelf
                  shelfTitle={mappingShelfLabels[shelf]}
                  // filter each book corresponding to the new shelfSplitter updated from Parent App Component
                  books={newBooks.filter(book => book.shelf === shelf)}
                  movingSpinner={this.movingSpinner}
                  {...this.props}/>
              </div>
            )}
          </div>) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {(this.state.isMoving) ? ' moving Books' : ' loading Books'}
            </h2>
          )}

          <div className="open-search">
            <a href='/search'>Add a book</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookspage;