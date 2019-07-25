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
    showMain: true,
    menuType: '',
    showSearchForm: true,
    showCategories: true
  }

  updateStartHandler = () => {
    console.log("state changed");
    this.setState({showStartBtn: false});
    this.setState({menuType:'main'});
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

  render () {
    let menu;

    switch (this.state.menuType) {
      case ('main'):
      if (this.state.showMain){
        menu = (
          <Aux>
            <div>
            {this.state.showSearchForm
              ?<SearchForm
                clicked={this.updateToBookSearchHandler}
                showCategories={this.showCa}/>
              : null}
            </div>
            <div>
              {this.state.showCategories
                ?<Categories
                  clicked={this.updateToCategorySearchHandler}
                  search={this.showSearchFormHandler}/>
                : null}
            </div>
          </Aux>
        );}
      else {
        menu = <Categories />;
      }
        break;
      default:
        menu = (
          <div>
            {this.state.showStartBtn
            ? <Aux>
                <header>
                  <h1><strong>Hey!</strong></h1>
                  <h2>I am a book robot.<br />I will guide you to a non-fiction book&#39;s location. <br />I can only find non-fiction books.</h2>
                  </header>
                  <Button clicked={this.updateStartHandler}>Start Here</Button>
              </Aux>
            : null}
          </div>);
    }
    return menu;
  }
};

export default MenuSelector;
