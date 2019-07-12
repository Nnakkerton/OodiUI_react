import React, { Component } from 'react';

import Category from '../Category/Category';
import classes from './Categories.module.css';

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
    showCategories: true
  }

  hideCategoriesHandler = (event) => {
    console.log("hideCategoriesHandler activated");
    this.setState({showCategories: false});
  }

  render() {

    return (
      this.state.categories.map( category => {
        return (
          <div key={category.id}>
            {this.state.showCategories
              ?<Category
                className={classes.Categories}
                title={category.title}
                />
              : null
            }
          </div>
        );
      })
    );
  }
}

export default Categories;
