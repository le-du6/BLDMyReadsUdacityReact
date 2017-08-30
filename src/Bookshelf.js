import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map((book, index) =>
                <li key={index}>
                  <Book book={book} {...this.props}/>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookshelf;