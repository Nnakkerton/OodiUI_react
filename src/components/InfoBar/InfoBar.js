import React, { Component } from 'react';

//import Button from '../Button/Button';
import Aux from '../../hoc/Aux';
import classes from './InfoBar.module.css';
import { withTranslation } from 'react-i18next';

import SmallArrow from '../../assets/images/Icon-ArrowShort-Right.svg';
import Oodi from '../../assets/images/Icon-Oodi-Black.svg';
import leftArrow from '../../assets/images/Icon-Arrow-Left.svg';
import rightArrow from '../../assets/images/Icon-Arrow-Right.svg';
import upArrow from '../../assets/images/Icon-Arrow-Up.svg';
import homeImage from '../../assets/images/Icon-Home.svg';

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

    if (this.state.notSearching) {
      return(
          <Aux>
            <button onClick={() => {this.props.clicked(); this.sendSelectedBookHandler(); this.props.chosenBook(this.props.title, this.props.id)}} className={classes.InfoButton}>
              <span className={classes.Title}>
                <strong>{this.props.title}</strong>
              </span>
              <span className={classes.Author}>
                <strong>{this.props.author}</strong>
              </span>

              <img src={SmallArrow} alt="smallArrow" className={classes.SmallArrow}/>
            </button>
          </Aux>
      )
    }
    /*else if (this.state.askGuidance) {
      return (
        <Aux>
          <h1>{t('bookSearch.startGuidance')}
          {this.state.chosenBook}</h1>
          <button onClick={() => {this.changeInfoBarsStateTrueHandler(); this.props.placeWaveUp(); this.changeNotSearchingHandler(); this.props.showCategories(); console.log("hahaha")}}>{t('button.back')}</button>
          <button onClick={() => this.startGuidanceHandler(this.state.chosenBookId)}>{t('button.proceed')}</button>
          <div className={classes.OodiBox}>
            <img src={Oodi} className={classes.rectangle} alt="Oodi" />
          </div>
          <div>
            <h1>{t(`arrowMessage.${this.state.arrowMessage}`)}</h1>
            <img src={this.state.arrowDirection} alt="arrow"/>
          </div>
        </Aux>
      )

    }*/
  }


}

export default withTranslation('common')(InfoBar);
