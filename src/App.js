import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import MenuSelector from './containers/MenuSelector/MenuSelector';
import Button from './components/Button/Button';
import { withTranslation, Trans } from 'react-i18next';
import classes from './App.module.css';
//import MenuSelector from './containers/MenuBuilder/MenuSelector/MenuSelector';

class App extends Component {
  state = {
    showFi: false,
    showSe: true,
    showEn: true,
    showLanguages: true
  }

  switchLngButton = (lng) => {
    if (lng === "en") {
      this.setState({showFi: true});
      this.setState({showEn: false});
      this.setState({showSe: true});
    }
    else if (lng === "se") {
      this.setState({showFi: true});
      this.setState({showEn: true});
      this.setState({showSe: false});
    }
    else {
      this.setState({showFi: false});
      this.setState({showEn: true});
      this.setState({showSe: true});
    }
  }

  hideLanguages = () => {
    this.setState({showLanguages: false});
  }

  showLanguages = () => {
    this.setState({showLanguages: true})
  }

  render() {
    const { t, i18n } = this.props;
    console.log("i18n has", i18n);

    return (
      <div>
        <Layout>
          <MenuSelector hideLng={this.hideLanguages} showLng={this.showLanguages} />
          {this.state.showLanguages
            ?<div className={classes.Languages}>
              <button onClick={() => i18n.changeLanguage('fi')} className={classes.Language}>Suomi</button>
              <button onClick={() => i18n.changeLanguage('en')} className={classes.Language}>English</button>
              <button onClick={() => i18n.changeLanguage('se')} className={classes.Language}>Svenska</button>
            </div>
            : null
        }
        </Layout>
      </div>
    );
  }
}

export default withTranslation('common')(App);
