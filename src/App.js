import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import MenuSelector from './containers/MenuSelector/MenuSelector';
import Button from './components/Button/Button';
import { withTranslation, Trans } from 'react-i18next';
//import MenuSelector from './containers/MenuBuilder/MenuSelector/MenuSelector';

class App extends Component {
  render() {
    const { t, i18n } = this.props;
    console.log("i18n has", i18n);

    return (
      <div>
        <Layout>
          <MenuSelector />
          <Button clicked={() => i18n.changeLanguage('fi')}>fi</Button>
          <Button clicked={() => i18n.changeLanguage('en')}>en</Button>
          <Button clicked={() => i18n.changeLanguage('se')}>se</Button>
        </Layout>
      </div>
    );
  }
}

export default withTranslation('common')(App);
