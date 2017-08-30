import React from 'react';
import Book from './Book';

// stateless intermediary "Book Shelf Category" component 
const Bookshelf = (props) => (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.map((book, index) =>
                <li key={index}>
                  <Book book={book} {...props}/>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    );

export default Bookshelf;