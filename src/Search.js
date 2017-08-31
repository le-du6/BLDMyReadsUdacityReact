import React, { Component } from 'react';
import { search } from './BooksAPI';
import { update } from './BooksAPI';
import { terms } from './Searchterms';
import Book from './Book';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAffecting: false,
      isNoResult: false,
      inputSearchValue: '',
      books: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  componentDidMount() {
    update('***retreive-books-list****', 'none').then( res => {
      this.props.shelfSplitterUpdater(res);
      });
  }

  onInputChange(term) {
    console.log(term, this.state.inputSearchValue);
    // search only from 3 char
    if (term.length > 2 || term.length===0 ) {
      // handle the first corresponding terms
      let res = terms.filter(x=>x.toLowerCase().includes(term.toLowerCase()||'***')) || [];
      console.log(res)
      // set new state search with a callback to fetch result
      if (res[0] !== this.state.inputSearchValue && res[0] !== '') {
        this.setState({ inputSearchValue: res[0] || '' }, x => (this.state.inputSearchValue !== '')
        // fetch the books after 1/3 second
        ? setTimeout(this.fetchSearch(this.state.inputSearchValue),350)
        : this.setState({isNoResult: true})
        );
      } else return null;
    } else return null;
  }

  fetchSearch(term) {
    this.setState({ isLoading: true });
    search(term, 20).then(fullbooks => {
      this.setState( { books: fullbooks.map(fullbook => {
        let { title, authors, imageLinks, id, shelf='none' } = fullbook;
        return { title, authors, imageLinks, id, shelf };
        })
      });
      this.setState({ isLoading: false });
      this.setState({isNoResult: false})   
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
            <input
              autoFocus
              onChange={e=>this.onInputChange(e.target.value)}
              defaultValue={this.state.inputSearchValue}
              type="text"
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
        {(!this.state.isLoading && !this.state.isAffecting)
          ? (
            (this.state.isNoResult)
              ? (<h2 className=" bookshelf-books bookshelf bookshelf-title">
                <i className="fa fa-book fa-lg"></i>
                &nbsp;no corresponding book
              </h2>)
              : (<ol className="books-grid">
                {newBooks.map((book, index) =>
                  <li key={index}>
                    <Book book={book} movingSpinner={(toggle)=>this.setState({isAffecting: toggle})} {...this.props}/>
                  </li>)}
                </ol>)
          ) : (
            <h2 className=" bookshelf-books bookshelf bookshelf-title">
              <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {(!this.state.isAffecting) ? ` searching for ${this.state.inputSearchValue} Books` : ' affecting Shelf'}
            </h2>
          )}
        </div>
      </div>
    </div>
    );
  }
}

export default Search;