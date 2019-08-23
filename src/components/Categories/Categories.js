import React, { Component } from 'react';
import axios from 'axios';

import Category from '../Category/Category';
import classes from './Categories.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

import LeftArrow from '../../assets/images/Icon-Arrow-Left.svg';
import RightArrow from '../../assets/images/Icon-Arrow-Right.svg';
import UpArrow from '../../assets/images/Icon-Arrow-Up.svg';
import HomeImage from '../../assets/images/Icon-Home.svg';
import BookLogo from '../../assets/images/Icon-Book.svg';
import StartLogo from '../../assets/images/Border-Image.png';
import Oodi from '../../assets/images/Icon-Oodi-Black.svg';

import { withTranslation } from 'react-i18next';

class Categories extends Component {
  state = {
    mainCategories: [
      {mainCategory: 'Non-fiction', subCategories: [
        {id: '100' , title: 'Philosophy, Psychology, Religion'},
        {id: '300', title: 'Society'},
        {id: '400', title: 'Geography & Traveling'},
        {id: '500', title: 'Natural Sciences'},
        {id: '610', title: 'Medicine'},
        {id: '620', title: 'Tech & Industry'},
        {id: '653', title: 'Gardening & Pets'},
        {id: '683', title: 'Handicrafts'},
        {id: '690', title: 'Cookbooks'},
        {id: '700', title: 'Architecture & Art'},
        {id: '790', title: 'Sports & Fitness'},
        {id: '800', title: 'Literature Studies'},
        {id: '850', title: 'Languages'},
        {id: '884', title: 'Learn Finnish'},
        {id: '900', title: 'History'},
        {id: '990', title: 'Biographies'}
      ] },
      {mainCategory: 'Fiction', subCategories: [
        {id: '', title: 'Audio Books'},
        {id: '', title: 'Plain Language Books'},
        {id: '1', title: 'Poetry & Plays'},
        {id: '1.4', title: 'Thriller'},
        {id: '1.4', title: 'Comedy'},
        {id: '1.4', title: 'Scifi & Fantasy'},
        {id: '1.4', title: 'Horror'},
        {id: '', title: 'General'},
        {id: '2', title: 'Swedish'},
        {id: '4', title: 'English'},
        {id: '', title: 'Other Languages'}
      ] },
      {mainCategory: 'Music', subCategories: [
        {id: '780', title: 'Biographies'},
        {id: '780', title: 'Sheet Music'},
        {id: '780', title: 'Music Theory'}
      ] }
    ],
    categories: [],
    showCategories: true,
    chosenCategory: undefined,
    startGuidance: false,
    searchingCategory: '',
    arrowMessage: '',
    arrowSubMessage: '',
    arrowDirection: '',
    subCategories: [],
    showMainCategories: true,
    showSubCategories: false,
    categoriesTitleText: "Book Categories"
  }

  categoryPickedHandler = (category) => {
    console.log("categoryPickedHandler activated");
    this.setState({showCategories: false, chosenCategory: category});
  }

  goBackHandler = () => {
    this.setState({showCategories: true})
  }

  goToCategory = () => {
    console.log("check what category is", this.state.chosenCategory.id);
    let chosenCategory = this.state.chosenCategory.id;
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
            this.setState({arrowDirection: LeftArrow});
            this.setState({arrowMessage: "Look to your left!"});
            this.setState({arrowSubMessage: "Please check the shelf on the left."})
            console.log("received left arrow");
          }
          else if (response.data.data === 'r') {
            this.setState({arrowDirection: RightArrow});
            this.setState({arrowMessage: "Look to your right!"});
            console.log("received right arrow");
          }
          else if (response.data.data === 'lr') {
            this.setState({arrowDirection: LeftArrow});
            this.setState({arrowMessage: "Look to your both sides!"});
            console.log("received leftright arrow");
          }
          else {
            this.setState({arrowDirection: UpArrow});
            this.setState({arrowMessage: "Follow me, please!"});
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

  addSubCategoriesHandler = (subcategories) => {
    this.setState({showMainCategories: false});
    this.setState({subCategories: subcategories });
    console.log("SUBCATEGORIES ARE",this.state.subCategories);
  }

  changeMainCategoriesToTrueHandler = () => {
    this.setState({showMainCategories: true})
    this.setState({showSubCategories: false})
  }

  showSubCategoriesHandler = () => {
    this.setState({showSubCategories: true});
  }

  render() {
    const { t } = this.props

    if (this.state.showCategories) {

      return (
        <Aux>
          <div className={classes.categoryHeader}>
            <img src={BookLogo} alt="Book" className={classes.BookLogo}/>
            <h1 className={classes.h1}>{t(`bookMenu.findCategory.${this.state.categoriesTitleText}`)}</h1>
          </div>
          <div>
          {this.state.showMainCategories === false
            ? <div className={classes.BottomBar}>
                <button className={classes.BackButton} onClick={() => this.changeMainCategoriesToTrueHandler()}>
                <img src={LeftArrow} alt="LeftArrow" className={classes.LeftArrow} />
                <h1 className={classes.BackButtonText}>Back</h1>
              </button>
              </div>
            : null}
          </div>

        <div className={classes.categoriesArranged}>
        {this.state.showMainCategories
        ? <div>
          {this.state.mainCategories.map( maincategory => {
              return (
                <button className={classes.MainCategories}
                onClick={() => {this.addSubCategoriesHandler(Object.values(maincategory.subCategories));      this.showSubCategoriesHandler();
                this.setState({categoriesTitleText: maincategory.mainCategory})}}>
                {maincategory.mainCategory}
                </button>
              )
            })
          }
          </div>
        : <div>
          {this.state.showSubCategories
          ? <div className={classes.categoriesArranged}>
          {this.state.subCategories.map( category => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  className={classes.SubCategories}
                  title={t(`categories.${category.title}`)}
                  onClick={this.categoryPickedHandler}
                  clicked={this.props.clicked}
                  />
                  )
                })
            }
            </div>
          : null}
          </div>
        }
        </div>
        </Aux>
      );
    }
    else {
      return (
          <Aux>
            {this.state.startGuidance === false
              ? <Aux>
                <h2>{this.state.chosenCategory.title} section ({this.state.chosenCategory.id})</h2>
                  <h1 className={classes.isGuidanceRequired}>{t('categorySearch.h1')}</h1>
                  <Button btnType="No" clicked={() => {this.goBackHandler(); this.props.search()}}>{t('button.back')}</Button>
                  <Button btnType="Proceed" clicked={this.goToCategory}>{t('button.proceed')}</Button>
                </Aux>
              : <Aux>
                  <div className={classes.OodiBox}>
                    <img src={Oodi} className={classes.rectangle} alt="Oodi" />
                  </div>
                <div>
                {this.state.arrowMessage === "Bye bye! I'm going back to the starting point!"
                  ? <Aux>
                      <img src={StartLogo} alt="StartLogo" className={classes.StartLogo}/>
                      <div className={classes.GuidanceContainer}>
                        <h1 className={classes.GuidanceMsgForHome}>{t(`arrowMessage.${this.state.arrowMessage}`)}</h1>
                        <h2 className={classes.GuidanceSubMsgForHome}>{t('categorySearch.chosenQuestion')}</h2>
                        <img className={classes.IconForHome} src={this.state.arrowDirection} alt="icon"/>
                      </div>
                    </Aux>
                  : <Aux>
                      <h1 className={classes.GuidanceMsg}>{t(`arrowMessage.${this.state.arrowMessage}`)}</h1>

                      {this.state.arrowDirection === ''
                        ? null
                        : <img className={classes.ArrowIcon} src={this.state.arrowDirection} alt="icon"/>}
                        </Aux>
                }
              </div>
              </Aux>


              }
          </Aux>
      )
    }
  }
}

export default withTranslation('common')(Categories);

{/*<Aux>
<div className={classes.GuidanceContainer}>
  <h1 className={classes.GuidanceMsg}>{t(`arrowMessage.${this.state.arrowMessage}`)}</h1>
  {this.state.arrowMessage === "Follow me, please!"
  ? <h2 className={classes.GuidanceSubMsg}>{t('categorySearch.chosenQuestion')} {t(`${this.state.chosenCategory.title}`)}
    {' '}({t(`${this.state.chosenCategory.id}`)}) {t('categorySearch.section')} </h2>
    : null}
  <img className={classes.Arrow} src={this.state.arrowDirection} alt="arrow"/>
  </div>
</Aux>*/}
