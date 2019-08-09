import React from 'react';

import bottomLogo from '../../assets/images/Border-Image.png';
import classes from './BottomLogo.module.css';

const logo = (props) => (
  <div className={classes.BottomLogo}>
    <img src={bottomLogo} alt="bottomLogo" />
  </div>
);

export default logo;
