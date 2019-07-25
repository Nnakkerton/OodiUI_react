import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button/Button';
import Aux from '../../hoc/Aux';
import classes from './InfoBar.module.css';

class InfoBar extends Component {
  state = {
    notSearching: true,
    askGuidance: false
  }

  sendSelectedBookHandler = () => {
    this.setState({notSearching: false});
    this.setState({askGuidance: true});
    let bookId = this.props.id
    axios
      .post('http://localhost:3001/selected_book', {bookId})
      .then(() => console.log("Id was sent succesfully"))
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    return(
      <div>
        {this.state.askGuidance === false
          ? <Aux>
              <div>
              Title: <strong>{this.props.title}</strong><br />
              Author: <strong>{this.props.author}</strong>
              </div>
              <Button clicked={() => {this.sendSelectedBookHandler(); this.props.clicked()}}>{this.props.title}</Button>
            </Aux>
          :  <div>Would you like to look for the following book: {this.props.title}</div>
          }
      </div>
    )

  }


}

export default InfoBar;
