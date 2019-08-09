import React from 'react';
import Button from '../Button/Button';
import Aux from '../../hoc/Aux';

import Oodi from '../../assets/images/Icon-Oodi-Black.svg';
import classes from './FoodOrToilet.module.css';
import { withTranslation, Trans } from 'react-i18next';

const toilet = (props) => {

  const { t } = props

  return (
    <Aux>
      <div className={classes.TitleHolder}>
        {t(`toiletOrFoodScreen.${props.msg}`)}
        <button onClick={() => {props.backToStart(); props.showLng()}} className={classes.OodiBox}>
          <img src={Oodi} className={classes.rectangle} alt="Oodi" />
        </button>
      </div>
      <div>
        <h1 className={classes.MapBox}>MAP HERE</h1>
      </div>
      <h1 className={classes.WouldYouLikeToilet}>{t('toiletOrFoodScreen.wouldYouLike')}</h1>
      <Button btnType="NoToilet" clicked={() => {props.back(); props.showLng()}} value="No thanks." />
      <Button btnType="Proceed" value="Yes, please!" />
      <span className={classes.IconWave} />
    </Aux>
  )
}

export default withTranslation('common')(toilet);
