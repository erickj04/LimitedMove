import { useState } from 'react';
import Campaign from "./Campaign";
import Creative from './Creative';
import ContextProvider from './LevelHandling';
export default function App() {
  const [creativeMode, setCreativeMode] = useState(false);
  function handleCreativeMode(){
    setCreativeMode(true);
  }
  function handleCampaign(){
    setCreativeMode(false);
  }
  return (
    <div>
      {!creativeMode ? <Campaign />:<Creative />}
      {!creativeMode ? <button onClick={handleCreativeMode}> CREATIVE MODE </button> : <button onClick={handleCampaign}> CAMPAIGN </button>}
    </div>
  );
}