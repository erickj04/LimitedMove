import { useState } from 'react';
import Campaign from "./Campaign";
import Creative from './Creative';
import {ContextProvider} from './LevelHandling';
export default function App() {
  const [creativeMode, setCreativeMode] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  return (
    <ContextProvider currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} creativeMode={creativeMode}>
      {!creativeMode ? 
        <Campaign creativeMode={creativeMode} setCreativeMode={setCreativeMode} currentLevel={currentLevel}/>
      :
        <Creative creativeMode={creativeMode} setCreativeMode={setCreativeMode} />
      }
    </ContextProvider>
  );
}