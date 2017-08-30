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

  componentWill

  render() {
    const books = this.state.books || [];
    const shelfs = Object.keys(this.props.shelfSplitter) ;

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
                <Bookshelf shelfTitle={mappingShelfLabels[shelf]} books={books.filter(book=>book.shelf===shelf)} {...this.props}/>
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