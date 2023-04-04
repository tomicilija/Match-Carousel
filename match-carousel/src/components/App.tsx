import React, { useState } from 'react';
import './App.css';
import MatchCarousel from './MatchCarousel';

const App = () => {
  const [switchTabs, setSwitchTabs] = useState<boolean>(false);
  return (
    <>
      <div className="app">
        <div className="tab" onClick={() => setSwitchTabs(!switchTabs)}>
          <p>Switch Tabs</p>
        </div>
        <MatchCarousel max={15} sportId={2} />
      </div>
    </>
  );
};

export default App;