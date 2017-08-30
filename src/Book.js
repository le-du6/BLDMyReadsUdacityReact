import React from 'react';
import { update } from './BooksAPI';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})`
        }}></div>
      <div className="book-shelf-changer">
        <select
          onChange={ event=> {
            props.movingSpinner(true);
            const moveTo = event.target.value;
            update(props.book.id, moveTo).then( res => {
              props.shelfSplitterUpdater(res);
              props.movingSpinner(false);
              });
          }}
            value={props.book.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors.join(', ')}</div>
  </div>
  );

export default Book;