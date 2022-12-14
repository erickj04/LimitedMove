import React, { useState } from 'react';
import Campaign from "./Campaign";
import Creative from './Creative';
import { ContextProvider } from './LevelHandling';
import { CreativeContextProvider } from './CreativeHandling';
import MessageForm from './MessageFormComponent';
export default function App() {
  const [creativeMode, setCreativeMode] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedBox, setSelectedBox] = useState('empty');
  return (
    <div>
        {!creativeMode ?
          <ContextProvider currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} creativeMode={creativeMode}>
            <Campaign creativeMode={creativeMode} setCreativeMode={setCreativeMode} currentLevel={currentLevel}/>
          </ContextProvider>
          :
          <CreativeContextProvider selectedBox={selectedBox} setSelectedBox={setSelectedBox}>
            <Creative creativeMode={creativeMode} setCreativeMode={setCreativeMode} />
          </CreativeContextProvider>
        }
        <MessageForm />
    </div>
  );
}