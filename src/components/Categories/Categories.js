import React, { Component } from 'react';
import axios from 'axios';

import Category from '../Category/Category';
import classes from './Categories.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

import leftArrow from '../../assets/images/Icon-Arrow-Left.svg';
import RightArrow from '../../assets/images/Icon-Arrow-Right.svg';
import UpArrow from '../../assets/images/Icon-Arrow-Up.svg';
import HomeImage from '../../assets/images/Icon-Home.svg';
import BookLogo from '../../assets/images/Icon-Book.svg';

import { withTranslation, Trans } from 'react-i18next';

class Categories extends Component {
  state = {

    categories: [
      {id: '469' , title: 'Traveling'},
      {id: '691.1', title: 'Cooking'},
      {id: '790', title: 'Arts'},
      {id: '850', title: 'Languages'},
      {id: '990', title: 'Autobiographies'},
      {id: '900', title: 'History'}
    ],
    showCategories: true,
    chosenCategory: undefined,
    startGuidance: false,
    searchingCategory: '',
    arrowMessage: '',
    arrowDirection: ''
  }

  categoryPickedHandler = (category) => {
    console.log("categoryPickedHandler activated");
    this.setState({showCategories: false, chosenCategory: category});
  }

  goBackHandler = () => {
    this.setState({showCategories: true})
  }

  goToCategory = () => {
    let chosenCategory = Object.entries(this.state.chosenCategory)[0][1];
    console.log("chosenCategory is:", chosenCategory);
    this.setState({startGuidance: true});
    console.log("goToCategory clicked");
    axios
      .post('http://localhost:3001/category_guidance', {chosenCategory})
      .then(() =>
        this.startGuidanceHandler()
      )
      .catch(err => {
        console.error(err);
      });
  }

  startGuidanceHandler = () => {
    axios
      .get('http://localhost:3001/guidance')
      .then( response => {

        console.log("The arrow response from the server is", response.data.data);
        if (response.data.data === 'home') {
          this.setState({arrowDirection: HomeImage});
          this.setState({arrowMessage: "Bye bye! I'm going back to the starting point!"})
          console.log("arrow is currently:", this.state.arrowDirection);
          return this.returnHomeHandler();
        }
        else {
          if (response.data.data === 'l') {
            this.setState({arrowDirection: leftArrow});
            this.setState({arrowMessage: "Look to your left!"});
            console.log("received left arrow");
          }
          else if (response.data.data === 'r') {
            this.setState({arrowDirection: RightArrow});
            this.setState({arrowMessage: "Look to your right!"});
            console.log("received right arrow");
          }
          else if (response.data.data === 'lr') {
            this.setState({arrowDirection: leftArrow});
            this.setState({arrowMessage: "Look to your both sides!"});
            console.log("received leftright arrow");
          }
          else {
            this.setState({arrowDirection: UpArrow});
            this.setState({arrowMessage: "Let's go!"});
            console.log("no matching arrow");
          }
          setTimeout(this.startGuidanceHandler, 2000)
        }
      })
      .catch(err => {
        console.log(err);
    })
  }

  returnHomeHandler = () => {
    axios
      .get('http://localhost:3001/guidance')
      .then( response => {
        if (response.data.data === 'home') {
          console.log("Still only receiving home")
          setTimeout(this.returnHomeHandler, 2000);
        }
        else if (response.data.data === 'home2') {
          console.log("WE ARE BACK HOME!");
          this.props.backToStart();
        }
        else {
          console.log("received something else");
          setTimeout(this.returnHomeHandler, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { t } = this.props

    if (this.state.showCategories) {

      return (
        <>
        <div className={classes.categoryHeader}>
          <img src={BookLogo} alt="Book" className={classes.BookLogo}/>
          <h1 className={classes.h1}>{t('bookMenu.findCategory')}</h1>
        </div>
        <div className={classes.categoriesArranged}>
          {this.state.categories.map( category => {
            return (
              <Category
                key={category.id}
                id={category.id}
                className={classes.Categories}
                title={t(`categories.${category.title}`)}
                onClick={this.categoryPickedHandler}
                clicked={this.props.clicked}
              />
            )
          })
        }
        </div>
      </>
      );
    }
    else {
      return (
          <div>
            {this.state.startGuidance === false
              ? <Aux>
                  <h1>{t('categorySearch.h1')} <strong>{Object.entries(this.state.chosenCategory)[1][1]}</strong></h1>
                  <Button btnType="Back" clicked={() => {this.goBackHandler(); this.props.search()}}>{t('button.back')}</Button>
                  <Button clicked={this.goToCategory}>{t('button.proceed')}</Button>
                </Aux>
              : <div>
                <h1>{t(`arrowMessage.${this.state.arrowMessage}`)}</h1>
                <img src={this.state.arrowDirection} alt="arrow"/>
                </div>
              }
          </div>
      )
    }
  }
}

export default withTranslation('common')(Categories);
