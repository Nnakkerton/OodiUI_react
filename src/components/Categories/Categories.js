import React, { Component } from 'react';

import Category from '../Category/Category';
import classes from './Categories.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

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
    chosenCategory: undefined
  }

  categoryPickedHandler = (category) => {
    console.log("categoryPickedHandler activated");
    this.setState({showCategories: false, chosenCategory: category});

  }

  goBackHandler = () => {
    this.setState({showCategories: true})
  }

  render() {

    if (this.state.showCategories) {

      return (
        <>
        <h1>Look for a book category</h1>
          {this.state.categories.map( category => {
            return (
                <Category
                  key={category.id}
                  id={category.id}
                  className={classes.Categories}
                  title={category.title}
                  onClick={this.categoryPickedHandler}
                  clicked={this.props.clicked}
                  />
            )
          })
        }
      </>
      );
    }
    else {
      return (
        <Aux>
          <div>
            <h1>Would you like to be guided to the category: <strong>{Object.entries(this.state.chosenCategory)[1][1]}</strong></h1>
            <Button btnType="Back" clicked={() => {this.goBackHandler(); this.props.search()}}>Go Back</Button>
            <Button>Proceed</Button>

          </div>
        </Aux>
      )
    }
  }
}

export default Categories;
