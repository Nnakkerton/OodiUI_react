import React from 'react';

import Layout from './components/Layout/Layout';
import MenuBuilder from './containers/MenuBuilder/MenuBuilder';

function App() {
  return (
    <div>
      <Layout>
        <MenuBuilder />
      </Layout>
    </div>
  );
}

export default App;
