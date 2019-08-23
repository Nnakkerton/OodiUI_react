import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

import StartLogo from '../../assets/images/Border-Image.png';
import Oodi from '../../assets/images/Icon-Oodi-Black.svg';

import classes from './StartScreen.module.css';
import { withTranslation } from 'react-i18next';

const startScreen = (props) => {

  const { t } = props;

  return (

    <Aux>
      <div className={classes.OodiBox}>
        <img src={Oodi} alt="Oodi" className={classes.OodiPic}/>
        <p className={classes.p}><strong>Oodi</strong> Helsinki Central Library </p>
      </div>
        <h1 className={classes.Hey}>
          {t('startMenu.header')}
        </h1>
        <h2 className={classes.Explanation}>
        {t('startMenu.description1')}
        </h2>
        <div>
          <Button btnType="Start" className={classes.StartButton} clicked={props.updateStartHandler}>{t('startMenu.startButton')}
          </Button>
        </div>
        <img src={StartLogo} alt="StartLogo" className={classes.StartLogo}/>
      </Aux>
  );
};

export default withTranslation('common')(startScreen);
