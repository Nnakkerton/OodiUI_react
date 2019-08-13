import React, { Component } from 'react';

//import Button from '../Button/Button';
import Aux from '../../hoc/Aux';
import classes from './InfoBar.module.css';
import { withTranslation } from 'react-i18next';

import SmallArrow from '../../assets/images/Icon-ArrowShort-Right.svg';

class InfoBar extends Component {
  state = {
    notSearching: true,
    askGuidance: false
  }

  sendSelectedBookHandler = () => {
    this.setState({notSearching: false});
    this.setState({askGuidance: true});

  }

  render() {
    const { t } = this.props

    return(
      <div>
        {this.state.askGuidance === false
          ? <Aux>
              <button onClick={() => console.log("you clicked a button")} className={classes.InfoButton}>
                <span className={classes.Title}>
                  <strong>{this.props.title}</strong>
                </span>
                <span className={classes.Author}>
                  <strong>{this.props.author}</strong>
                </span>
                
                <img src={SmallArrow} alt="smallArrow" className={classes.SmallArrow}/>
              </button>
            </Aux>
          :  null
          }
      </div>
    )

  }


}

export default withTranslation('common')(InfoBar);
