import React, { Component } from 'react';

import Button from '../../components/Button/Button';
import Categories from '../../components/Categories/Categories';
import SearchForm from '../../components/SearchForm/SearchForm';
import Aux from '../../hoc/Aux';
import classes from './MenuSelector.module.css';
import { withTranslation, Trans } from 'react-i18next';

class MenuSelector extends Component {
  state = {
    showStart: true,
    showStartBtn: true,
    showMain: false,
    menuType: '',
    showSearchForm: true,
    showCategories: true
  }

  updateStartHandler = () => {
    console.log("state changed");
    this.setState({showStartBtn: false});
    this.setState({showMain: true});
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
    this.setState({showStartBtn: true});
    this.setState({showMain: false});
    this.setState({showSearchForm: true});
    this.setState({showCategories: true});
  }

  render () {
    let menu;
    const { t } = this.props

    if (this.state.showMain){
      menu = (
        <Aux>
          <div>
          {this.state.showSearchForm
            ?<SearchForm
              clicked={this.updateToBookSearchHandler}
              showCategories={this.showCategoriesHandler}
              backToStart={this.backToStartHandler}/>
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
      );}
    else {
      menu = (
        <div>
          {this.state.showStartBtn
          ? <Aux>
              <header className={classes.StartHeader}>
              <Trans i18nKey='startMenu.header'>
                <h1>
                  <strong>{t('startMenu.header')}</strong>
                </h1>
              </Trans>
                <h2>{t('startMenu.description1')}<br />
                {t('startMenu.description2')}<br />
                {t('startMenu.description3')}</h2>
              </header>
              <div className={classes.StartButton}>
                <Button clicked={this.updateStartHandler}>{t('startMenu.startButton')}</Button>
              </div>
            </Aux>
          : null}
        </div>);
    }
    return menu;
  }
};

export default withTranslation('common')(MenuSelector);
