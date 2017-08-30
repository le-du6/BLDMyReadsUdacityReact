import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { getAll } from './BooksAPI';
import camelcase from 'camelcase';

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
      books: [],
    };
  }

  componentDidMount() {
    let shelfSplitter = {};

    getAll().then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let { title, authors, imageLinks, id, shelf } = fullbook;
        shelfSplitter[shelf] = (shelfSplitter[shelf] || []).concat(id);
        this.props.shelfSplitterUpdater(shelfSplitter);
        return { title, authors, imageLinks, id, shelf };
      })
    });
      this.setState({ isLoading: false });
    });
  }

  // componentWillUpdate() {
  //   this.setState({ isLoading: true });
  // }

  // componentDidUpdate() {
  //   this.setState({ isLoading: false });    
  // }

  render() {
    const books = this.state.books || [];
    const shelfs = this.props.shelfSplitter ;

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {/* Waitting for the fetch books getAll request with a Spinner*/}
          {(!this.state.isLoading) ? (
          <div className="list-books-content">
            {/* Looping over shelfs using Object.keys() */}
            {Object.keys(shelfs).map((shelf, index) =>
              <div key={index}>
                <Bookshelf
                  // find the correct Label according the current shelf
                  shelfTitle={mappingShelfLabels[shelf]}
                  books={books
                          // filter each book corresponding to the new shelfSplitter updated from Parent App Component
                          .filter(book => shelfs[shelf].includes(book.id))
                          // modifiy the shelf of those filtered books according to the new shelf
                          .map(book => Object.assign({}, book, { shelf }))
                          }
                  {...this.props}/>
              </div>
            )}
          </div>) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i> loading Books</h2>
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