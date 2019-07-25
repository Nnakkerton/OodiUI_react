import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './ArrowScreen.module.css';

const arrowScreen = (props) => {
  switch(props.arrow) {
    case 'l':
      //this.setState({arrowDirection: '../../assets/images/nuoli_iso_vasen.svg'});
      console.log("received left arrow");
      break;
    case 'r':
      //this.setState({arrowDirection: '../../assets/images/nuoli_iso_oikea.svg'});
      console.log("received right arrow");
      break;
    case 'lr':
      //this.setState({arrowDirection: '../../assets/images/nuoli_iso_molemmat.svg'});
      console.log("received leftright arrow");
      break;
    default:
      console.log("no arrow received in arrowHandler!!");
  }

  return(
    <div>blaa</div>
  )
}

export default arrowScreen;
