import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './SearchBar.module.css';
import Aux from '../../hoc/Aux';

import { withTranslation, Trans } from 'react-i18next';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookList, setBookList] = useState([]);

  const { t } = props

  const sendDataHandler = () => {
    //let searchTerm = this.state.searchTerm;
    axios
      .post('http://localhost:3001/searchterm', {searchTerm})
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
  }
  return (
    <Aux>
      <form>
        <input
          type="text"
          className={classes.SearchBar}
          placeholder={t('bookMenu.findBookPlaceholder')}
          onChange={event => setSearchTerm(event.target.value)}
          values={searchTerm}
          />
        <div className={classes.Button}>
          <button type="submit" onClick={sendDataHandler} />
        </div>
      </form>
    </Aux>
  )
}

export default withTranslation('common')(SearchBar);
