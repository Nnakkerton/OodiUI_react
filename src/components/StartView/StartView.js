import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Button from '../Button/Button';
import classes from './StartView.module.css';

class StartView extends Component {
  state = {
    showStart: true,
    showStartBtn: true
  }

  updateStartHandler = () => {
    this.setState({showStart: false});
    this.setState({showStartBtn: false});
  }

  render() {
    let intro;
    if (this.state.showStart) {
      intro = (
      <Aux>
        <div className={classes.StartView}>
          <header>
            <h1 className={classes.h1}><strong>Hey!</strong></h1>
            <h2>I am a book robot.<br />I will guide you to a non-fiction book&#39;s location. <br />I can only find non-fiction books.</h2>
          </header>
        </div>
      </Aux> );
    } else {
      intro = <div></div>
    }
    return (
      <div>
        {intro}
        {this.state.showStartBtn
        ? <Button clicked={this.updateStartHandler}>Start Here</Button>
        : null}

      </div>
    );
  }

}

export default StartView;
