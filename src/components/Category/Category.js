import React from 'react';

import Button from '../Button/Button';
//import classes from './Category.module.css';

const category = (props) => {
  return (
    <div>
      <Button
        btnType="Category"
        style={{alignItems: 'center'}}
        value={props.title}>
        {props.title}
        {props.clicked}</Button>
    </div>
  );
}

export default category;
