import React, { Component } from 'react';
import axios from 'axios';

import classes from './SearchForm.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

class SearchForm extends Component {
  state = {
    searchTerm: '',
    notSearching: true
  }

  searchTermHandler = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  sendDataHandler = () => {
    this.setState({notSearching: false})
    console.log(this.state.searchTerm);
    let searchTerm = this.state.searchTerm;
    axios
      .post('http://localhost:3001/search', {searchTerm})
      .then(() => console.log("searchTerm passed on to server!"))
      .catch(err => {
        console.error(err);
      });
  };

  changeNotSearchingHandler = () => {
    this.setState({notSearching: true});
    this.setState({searchTerm: ''});
  }

  render() {
    let form;
    if (this.state.notSearching) {
      form = (
        <Aux>
          <h1>Find a non-fiction book</h1>
          <form>
            <input
              type="text"
              placeholder="Name of author or book"
              onChange={this.searchTermHandler}
              values={this.state.searchTerm}
              className={classes.SearchForm}/>
            <Button btnType="Search" clicked={() => {this.sendDataHandler(); this.props.clicked()}}></Button>
          </form>
        </Aux>
      )
    }
    else {
      form = <div>Available books with the keyword: <strong>{this.state.searchTerm}</strong></div>
    }

    return (
      <div>
        {form}
          {this.state.notSearching
          ? null
          : <Aux>
              <Button btnType="Back" clicked={() => {this.changeNotSearchingHandler(); this.props.showCategories()}}>Go Back</Button>
              <Button>Proceed</Button>
            </Aux>
          }
      </div>
    )
  }
};

export default SearchForm;
