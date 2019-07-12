import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <div>
    <button onClick={props.clicked} value={props.value} className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
  </div>
)
//Dynamically allocate the type of css the input should render
//check out video 66 from Udemy, might help

export default button;
