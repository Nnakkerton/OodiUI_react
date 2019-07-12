import React from 'react';


import Layout from './components/Layout/Layout';
import MenuSelector from './containers/MenuSelector/MenuSelector';
//import MenuSelector from './containers/MenuBuilder/MenuSelector/MenuSelector';

function App() {
  return (
    <div>
      <Layout>
        <MenuSelector />
      </Layout>
    </div>
  );
}

export default App;
