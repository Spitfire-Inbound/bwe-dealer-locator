import React from 'react';
import './App.scss';
import StoreLocator from './components/StoreLocator';

function App({ moduleData }) {
  // eslint-disable-next-line no-console
  console.log(
    'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
    moduleData,
  );

  return (
    <div>
      <StoreLocator moduleData={moduleData} />
    </div>
  );
}

export default App;
