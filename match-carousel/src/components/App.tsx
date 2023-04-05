import React, { useEffect, useState } from 'react';
import './App.css';
import MatchCarousel from './MatchCarousel';

const App = () => {
  const [switchTabs, setSwitchTabs] = useState<boolean>(false);

  useEffect(() => {
    console.log(switchTabs);
  }, [switchTabs]);
  return (
    <>
      <div className="app">
        <div className="tab" onClick={() => setSwitchTabs(!switchTabs)}>
          <p>Switch Tabs</p>
        </div>
       <section style={{ display: switchTabs ? 'block' : 'none' }}>
          <MatchCarousel max={15} />
        </section>
        <section style={{ display: !switchTabs ? 'block' : 'none' }}>
          <MatchCarousel sportId={2} />
        </section>
      </div>
    </>
  );
};

export default App;
