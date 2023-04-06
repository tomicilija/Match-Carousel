import React, { useEffect, useState } from 'react';
import './App.css';
import MatchCarousel from './MatchCarousel';

const App = () => {
  const [switchTabs, setSwitchTabs] = useState<boolean>(true);

  useEffect(() => {
    //console.log(switchTabs);
  }, [switchTabs]);
  return (
    <>
      <div className="app">
        <div className="tab" onClick={() => setSwitchTabs(!switchTabs)}>
          <p>Switch Tabs</p>
        </div>
       <section style={{ display: switchTabs ? 'block' : 'none' }}>
          <MatchCarousel max={10} />
        </section>
        <section style={{ display: !switchTabs ? 'block' : 'none' }}>
          <MatchCarousel sportId={1} />
          <MatchCarousel sportId={2} />
        </section>
      </div>
    </>
  );
};

export default App;
