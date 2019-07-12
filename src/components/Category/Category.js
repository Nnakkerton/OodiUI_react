import React, { Component } from 'react';

import Button from '../Button/Button';
//import classes from './Category.module.css';

class Category extends Component {
  state = {
    category: true
  }

  changeCategoryHandler = () => {
    this.props.onClick({id: this.props.id, title: this.props.title});
  }

  render() {
    return (
      <div>
      {this.state.category
        ? <Button
            btnType="Category"
            style={{alignItems: 'center'}}
            clicked={this.changeCategoryHandler}
            id={this.props.id}
            value={this.props.title}>
            {this.props.title}
          </Button>
        : null};
      </div>

    );
  }
}

export default Category;
