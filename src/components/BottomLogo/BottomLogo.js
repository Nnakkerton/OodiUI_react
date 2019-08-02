import React from 'react';

import bottomLogo from '../../assets/images/pagebottom.jpg';
import classes from './BottomLogo.module.css';

const logo = (props) => (
  <div className={classes.BottomLogo}>
    <img src={bottomLogo} alt="bottomLogo" />
  </div>
);

export default logo;
