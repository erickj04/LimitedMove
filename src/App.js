import { useState } from 'react';
import Campaign from "./Campaign";
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
      {!creativeMode ? (
        <div>
          <Campaign />
        </div>
        ):(
          <div>
            <div>CREATIVE MODE</div>
          </div>
          )
      }
      {!creativeMode ? <button onClick={handleCreativeMode}> CREATIVE MODE </button> : <button onClick={handleCampaign}> CAMPAIGN </button>}
    </div>
  );
}