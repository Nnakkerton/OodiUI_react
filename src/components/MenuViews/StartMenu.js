import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Button from '../Button/Button';

class StartMenu extends Component {
  state = {
    showStartBtn: true
  }

  updateStartHandler = () => {
    this.setState({showStartBtn: false});
  }

  render() {

    return(
      <div>
        {this.state.showStartBtn
        ? <Aux>
            <header>
              <h1>heheheh</h1>
              <h1><strong>Hey!</strong></h1>
              <h2>I am a book robot.<br />I will guide you to a non-fiction book&#39;s location. <br />I can only find non-fiction books.</h2>
              </header>
              <Button clicked={this.updateStartHandler}>Start Here</Button>
          </Aux>
        : null}
      </div>);
    }
}

export default StartMenu;
