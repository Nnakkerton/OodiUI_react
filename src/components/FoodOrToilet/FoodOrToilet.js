import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import Aux from '../../hoc/Aux';

import Oodi from '../../assets/images/Icon-Oodi-Black.svg';
import classes from './FoodOrToilet.module.css';
import { withTranslation } from 'react-i18next';

import HomeImage from '../../assets/images/Icon-Home.svg';
import UpArrow from '../../assets/images/Icon-Arrow-Up.svg';
import CafeLogo from '../../assets/images/Icon-Cafe.svg';
import WCLogo from '../../assets/images/Icon-WC.svg';
import StartLogo from '../../assets/images/Border-Image.png';
import OodiMap from '../../assets/images/OodiWCandCafeMap.png';

function ToiletOrFood(props) {
  const [switchToGuidance, setSwitchToGuidance] = useState(false);
  const [message, setMessage] = useState('');
  const [subMsg, setSubMsg] = useState('');
  const [icon, setIcon] = useState('');

  const { t } = props

  const goToCafeOrToiletHandler = () => {
    const msg = props.msg
    axios
      .post('http://localhost:3001/food_or_toilet_guidance', {msg})
      .then(() =>
        startGuidanceHandler()
      )
      .catch(err => {
        console.error(err);
      });
  }

  const startGuidanceHandler = () => {
    axios
      .get('http://localhost:3001/guidance')
      .then( response => {
        console.log("The arrow response from the server is", response.data.data);
        if (response.data.data === 'home') {
          setIcon(HomeImage);
          setMessage("Bye bye!");
          setSubMsg("I'm returning to my station. See you next time!");
          return returnHomeHandler();
        }
        else if (response.data.data === 'WC') {
          setIcon(WCLogo);
          setMessage('We have arrived!');
          setSubMsg("I'll just leave you here.");
        }
        else if (response.data.data === 'cafe') {
          setIcon(CafeLogo);
          setMessage('We have arrived!');
          setSubMsg("I'll just leave you here.");
        }
        else {
            setIcon(UpArrow);
            //setMessage('Follow me, please!');
            setMessage('Please follow me!');
            if (props.msg === "WC") {
              setSubMsg('')
              //setSubMsg('Guiding you to the nearest WC.')
            }
            else if (props.msg === "cafe") {
              setSubMsg('Guiding you to the café.')
            }
          }
          setTimeout(startGuidanceHandler, 2000)
        }
      )
      .catch(err => {
        console.log(err);
    })
  }

  const returnHomeHandler = () => {
    axios
      .get('http://localhost:3001/guidance')
      .then( response => {
        if (response.data.data === 'home') {
          console.log("Still only receiving home")
          setTimeout(returnHomeHandler, 2000);
        }
        else if (response.data.data === 'home2') {
          console.log("WE ARE BACK HOME!");
          props.backToStart();
        }
        else {
          console.log("received something else");
          setTimeout(returnHomeHandler, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Aux>
    <button onClick={() => {props.backToStart(); props.showLng()}} className={classes.OodiBox}>
      <img src={Oodi} className={classes.rectangle} alt="Oodi" />
    </button>
    <div>
    {switchToGuidance === false
    ? <Aux>
        <div className={classes.TitleHolder}>
          {t(`toiletOrFoodScreen.${props.msg}`)}
        </div>
        <div>
          <img src={OodiMap} className={classes.MapBox} alt="OodiMap" />
        </div>
        <h1 className={classes.WouldYouLikeToilet}>{t('toiletOrFoodScreen.wouldYouLike')}</h1>
        <Button btnType="No" clicked={() => {props.back(); props.showLng()}} value={t('toiletOrFoodScreen.no')} />
        <Button btnType="Proceed" value={t('toiletOrFoodScreen.yes')} clicked={() => {goToCafeOrToiletHandler();
          setSwitchToGuidance(true)}} />
        <span className={classes.IconWave} />
      </Aux>
    : <Aux>
        <div className={classes.OodiBox}>
          <img src={Oodi} className={classes.rectangle} alt="Oodi" />
        </div>
      </Aux>}
    </div>
    {message === "Bye bye!"
      ? <Aux>
          <img src={StartLogo} alt="StartLogo" className={classes.StartLogo}/>
          <div className={classes.GuidanceContainer}>
            <h1 className={classes.GuidanceMsgForHome}>{message}</h1>
            <h2 className={classes.GuidanceSubMsgForHome}>{subMsg}</h2>
            <img className={classes.IconForHome} src={icon} alt="icon"/>
          </div>
        </Aux>
      : <Aux>
          <h1 className={classes.GuidanceMsg}>{message}</h1>
          <h2 className={classes.GuidanceSubMsg}>{subMsg}</h2>
          {icon === ''
            ? null
            : <img className={classes.Icon} src={icon} alt="icon"/>}
          {props.msg === "WC"
            ? <span className={classes.IconWavePink} />
            : <span className={classes.IconWaveYellow} />
          }
        </Aux>
    }


    </Aux>
  )
}
 //if else structure for clicking the button after which the screen will switch to guidance screen SIMPLE AS THAT!
export default withTranslation('common')(ToiletOrFood);
