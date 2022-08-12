import { useState } from 'react';
import Campaign from "./Campaign";
import Creative from './Creative';
import {ContextProvider} from './LevelHandling';
export default function App() {
  const [creativeMode, setCreativeMode] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  return (
    <ContextProvider currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}>
      {!creativeMode ? 
        <Campaign creativeMode={creativeMode} setCreativeMode={setCreativeMode} />
      :
        <Creative creativeMode={creativeMode} setCreativeMode={setCreativeMode} />
      }
    </ContextProvider>
  );
}