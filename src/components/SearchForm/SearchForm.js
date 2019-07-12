import React from 'react';

import classes from './SearchForm.module.css';

const searchForm = (props) => (
    <input
      type="text"
      placeholder="some text"
      className={classes.SearchForm}/>
)

export default searchForm;
