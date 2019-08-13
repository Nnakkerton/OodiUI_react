import React, { useState } from 'react';
import axios from 'axios';
import classes from './SearchBar.module.css';
import Aux from '../../hoc/Aux';
//import Button from '../Button/Button';
import InfoBar from '../InfoBar/InfoBar';

import { withTranslation } from 'react-i18next';

import LeftArrow from '../../assets/images/Icon-Arrow-Left.svg';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookList, setBookList] = useState([]);
  const [bookResults, setBookResults] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { t } = props

  const sendDataHandler = (event) => {
    event.preventDefault();
    setShowResults(true);
    let search = searchTerm;
    axios
      .post('http://localhost:3001/searchterm', {search})
      .then(() =>
        axios
          .get('http://localhost:3001/get_books')
          .then(response => {
            setBookList(Object.entries(Object.entries(response.data)[0][1]));
            //this.setState({books: Object.entries(Object.entries(response.data)[0][1])});
            console.log("Books received in form:", bookList);
          })

          .catch(err => {
            console.log(err);
          })
        )
      .catch(err => {
        console.error(err);
      })
    console.log("BOOKLIST IS", bookList);
  }
  return (
    <Aux>
      <form onSubmit={sendDataHandler}>
        <input
          type="text"
          className={classes.SearchBar}
          placeholder={t('bookMenu.findBookPlaceholder')}
          onChange={event => setSearchTerm(event.target.value)}
          values={searchTerm}
          />
        <div className={classes.Button}>
          <button type="submit" onClick={() => {props.clicked(); setBookResults(true) }} />
        </div>
      </form>
      {showResults
      ? <div className={classes.Container}>
          {bookList.map(book => (
            <div key={book[1].bibid}>
              <InfoBar author={book[1].author} title={book[1].title} id={book[1].bibid} />
              {/*<InfoBar author={book[1].author} title={book[1].title} id={book[1].bibid} clicked={() => {this.changeInfoBarsStateFalseHandler(book[1].title, book[1].bibid)}}/>*/}
            </div>
        ))}
      </div>
      : null}
      <div className={classes.BottomBar}>
      {showResults
        ?  <button className={classes.BackButton} onClick={() => {setShowResults(false); props.showCategories(); props.changeBackButton()}}>
            <img src={LeftArrow} alt="leftArrow" className={classes.LeftArrow} />
            <h1 className={classes.BackButtonText}>Back</h1>
          </button>
        : null}
        {bookResults
          ?<div>
            <p className={classes.ResultsNumber}>{bookList.length} Results</p>
            </div>
          : null}
      </div>

    </Aux>
  )
}

export default withTranslation('common')(SearchBar);
