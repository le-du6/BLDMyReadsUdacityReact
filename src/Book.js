import React, { Component } from 'react';
import { update } from './BooksAPI';

class Book extends Component {
  render() {
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
              }}></div>
            <div className="book-shelf-changer">
              <select
                onChange={ event => {
                  const moveTo = event.target.value;
                  console.log(moveTo);
                  update(this.props.book.id, moveTo).then( res => {
                    console.log(res);
                    this.props.shelfSplitterUpdater(res);
                  })
                }}
                defaultValue={this.props.book.shelf || "None"}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors.join(', ')}</div>
        </div>
    );
  }
}

export default Book;