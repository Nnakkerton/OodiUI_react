import React, { Component } from 'react';

import Button from '../../components/Button/Button';
import Categories from '../../components/Categories/Categories';
import SearchForm from '../../components/SearchForm/SearchForm';
import Aux from '../../hoc/Aux';
import StartMenu from '../../components/MenuViews/StartMenu';

class MenuSelector extends Component {
  state = {
    showStart: true,
    showStartBtn: true,
    menuType: ''
  }

  updateStartHandler = () => {
    this.setState({showStart: false});
    this.setState({showStartBtn: false});
    this.setState({menuType:'main'});
  }

  render () {
    let menu;

    switch (this.state.menuType) {
      case ('main'):
        menu = (
          <div>
            <h1>Find a non-fiction book</h1>
            <SearchForm />
            <h1>Look for a book category</h1>
            <Categories />
          </div>
        );
        break;
      case ('book-search'):
        menu = (
          <div>
            <h1>Available books with the keyword: <strong>blaablaa</strong></h1>
            <Button />
          </div>
        );
        break;
      case ('book-guidance'):
        menu = (
          <div>
            <h1>Would you like to be guided to the book: <strong>blaablaa</strong></h1>
            <Button btnType="Back" />
            <Button />
          </div>
        );
        break;
      case ('category-guidance'):
        menu = (
          <div>
            <h1>Would you like to be guided to the category: <strong>blaablaa</strong></h1>
            <Button btnType="Back">Go Back</Button>
            <Button>Proceed</Button>
          </div>
        );
        break;
      case ('guidance'):
        menu = (
          <div>
          <h1>Let&#39;s go!</h1>
          </div>
        );
        break;
      default:
        menu = <StartMenu />
    }
    return menu;
  }
};

export default MenuSelector;
