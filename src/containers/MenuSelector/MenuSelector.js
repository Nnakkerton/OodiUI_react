import React, { Component } from 'react';

import Button from '../../components/Button/Button';
import Categories from '../../components/Categories/Categories';
import SearchForm from '../../components/SearchForm/SearchForm';
import FoodOrToilet from '../../components/FoodOrToilet/FoodOrToilet';
import StartScreen from '../../components/StartScreen/StartScreen';
import Aux from '../../hoc/Aux';
import Oodi from '../../assets/images/Icon-Oodi-Black.svg';
import BookLogo from '../../assets/images/Icon-Book.svg';
import CafeLogo from '../../assets/images/Icon-Cafe.svg';
import WCLogo from '../../assets/images/Icon-WC.svg';
import RightArrow from '../../assets/images/Icon-ArrowShort-Right.svg';

import classes from './MenuSelector.module.css';
import { withTranslation, Trans } from 'react-i18next';

class MenuSelector extends Component {
  state = {
    showStart: true,
    showStartScreen: true,
    showSearch: false,
    menuType: '',
    showSearchForm: true,
    showCategories: true,
    menuView: false,
    showFoodToilet: false,
    showFoodOrToilet: false,
    msg: ""
  }

  updateStartHandler = () => {
    console.log("state changed");
    this.setState({showStartScreen: false});
    //this.setState({showMain: true});
    this.setState({menuView: true});
  }

  searchHandler = () => {
    this.setState({showSearch: true});
    this.setState({menuView: false});
  }

  foodToiletHandler = (message) => {
    this.setState({showFoodOrToilet: true});
    this.setState({menuView: false});
    this.setState({msg: message});
  }

  updateToCategorySearchHandler = () => {
    console.log("[updateToCategorySearchHandler] activated");
    this.setState({showSearchForm: false});
  }

  updateToBookSearchHandler = () => {
    console.log("[updateToBookSearchHandler] activated");
    this.setState({showCategories: false});
  }

  showCategoriesHandler = () => {
    this.setState({showCategories: true});
  }

  showSearchFormHandler = () => {
    this.setState({showSearchForm: true});
  }

  backToStartHandler = () => {
    this.setState({showStartScreen: true});
    this.setState({menuView: false});
    this.setState({showSearchForm: true});
    this.setState({showCategories: true});
  }

  showMainHideFoodOrToiletHandler = () => {
    this.setState({menuView: true});
    this.setState({showFoodOrToilet: false});
  }

  backToStartFromEverythingHandler = () => {
    this.setState({menuView: false});
    this.setState({showFoodOrToilet: false});
    this.setState({showStartScreen: true});
    this.setState({showSearch: false});
    this.setState({showSearchForm: true});
    this.setState({showCategories: true});

  }

  returnFromMainHandler = () => {
    this.setState({menuView: false});
    this.setState({showStartScreen: true});
  }

  showMainHideBookSearchHandler = () => {
    this.setState({menuView: true});
    this.setState({showSearchForm: false});
  }

  /*<div className={classes.OodiBox}>
      <img src={Oodi} alt="Oodi"/>
      <p className={classes.p}> <strong>Oodi</strong> Helsinki Central Library </p>
      <button src={Oodi} className={classes.OodiBox}><strong>Oodi</strong>Helsinki Central Library</button>*/
  render () {
    let menu;
    const { t } = this.props

    if (this.state.showSearch){
      menu = (
        <Aux>
          <button onClick={() => {this.backToStartFromEverythingHandler(); this.props.showLng()}} className={classes.OodiBoxBookSearch}>
            <img src={Oodi} className={classes.rectangleBookSearch} alt="Oodi" />
          </button>
            <span className={classes.IconWaveBooks} />
          <div>
          {this.state.showSearchForm
            ?<SearchForm
              clicked={this.updateToBookSearchHandler}
              showCategories={this.showCategoriesHandler}
              backToStart={this.backToStartFromEverythingHandler}
              back={this.showMainHideFoodOrToiletHandler}
              showLng={this.props.showLng}/>
            : null}
          </div>
          <div className={classes.Container}>
            {this.state.showCategories
              ?<Categories
                className={classes.Categories}
                clicked={this.updateToCategorySearchHandler}
                search={this.showSearchFormHandler}
                backToStart={this.backToStartHandler}/>
              : null}
          </div>
        </Aux>
      );
    }
    else if (this.state.menuView) {
      //this is the menu for showing books, toilet and cafe
      menu = (
        <Aux>
          <button onClick={this.returnFromMainHandler} className={classes.OodiBox}>
          <img src={Oodi} alt="Oodi" className={classes.BtnPic}/>
          <p className={classes.p}><strong>Oodi</strong> Helsinki Central Library </p>
          </button>

          <button onClick={() => {this.searchHandler(); this.props.hideLng()}} className={classes.SearchButton} value="Books">
          <img src={BookLogo} alt="Book" className={classes.BookLogo}/>
          <p className={classes.Text1}><strong>{t('mainMenu.bookSelector.books')}</strong></p>
          <p className={classes.Explanation1}>{t('mainMenu.bookSelector.bookText')}</p>
          <img src={RightArrow} alt="arrow" className={classes.Arrow1}/>
          </button>

          <button onClick={() => {this.foodToiletHandler("nearestWC"); this.props.hideLng()}} value="WC" className={classes.ToiletButton} >
          <img src={WCLogo} alt="WC" className={classes.WCLogo}/>
          <p className={classes.Text2}><strong>{t('mainMenu.toiletSelector.toilet')}</strong></p>
          <p className={classes.Explanation2}>{t('mainMenu.toiletSelector.toiletText')}</p>
          <img src={RightArrow} alt="arrow" className={classes.Arrow2}/>
          </button>

          <button onClick={() => {this.foodToiletHandler("cafeIs"); this.props.hideLng()}} value="Food" className={classes.CafeButton} >
          <img src={CafeLogo} alt="Cafe" className={classes.CafeLogo}/>
          <p className={classes.Text3}><strong>{t('mainMenu.foodSelector.food')}</strong></p>
          <p className={classes.Explanation3}>{t('mainMenu.foodSelector.foodText')}</p>
          <img src={RightArrow} alt="arrow" className={classes.Arrow3}/>
          </button>
          <span className={classes.IconWave} />
        </Aux>
      );
    }
    else if (this.state.showFoodOrToilet) {
      menu = (
        <FoodOrToilet msg={this.state.msg} back={this.showMainHideFoodOrToiletHandler} showLng={this.props.showLng} backToStart={this.backToStartFromEverythingHandler}/>
      );
    }
    else {
      menu = (
        <div>
          {this.state.showStartScreen
          ? <StartScreen updateStartHandler={this.updateStartHandler} />
          : null}
        </div>);
    }
    return menu;
  }
};

export default withTranslation('common')(MenuSelector);
