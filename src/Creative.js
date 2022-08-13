import { useState } from 'react';
import { useReducer } from 'react';
import  ManagePlayer from "./ManagePlayer";
import { useEffect } from "react";
import ShowMessage from './ShowMessage.js';
import ChooseBoxType from "./ChooseBoxType";
import CreativeGrid from './CreativeGrid';
import { GameSpot, Button, RightSide, Container, useContextGame, InputSize } from "./LevelHandling";

export default function Creative({creativeMode, setCreativeMode}){
  const {moveDirection} = useContextGame();
  const initialBody= {
    position:{koorX: 0, koorY: 0},
    stepRange: 1,
    stepRemaining: {leftStep: 0, rightStep: 0, upStep: 0, downStep: 0}
  };
  const [gridSize, setGridSize] = useState(null);
  const finished = false;
  const [player, dispatch] = useReducer(
    ManagePlayer,
    {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
  );
  const [selectedBox, setSelectedBox] = useState('empty');
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });
  function handleCreativeMode(){
    setCreativeMode(!creativeMode);
  }
  function handleInputGridSize(e){
    setGridSize(e.target.value);
  }
  return(
    <div>
        <h2>CREATIVE MODE</h2>
        <GameSpot>
          <CreativeGrid gridSize={gridSize} player={player} finished={finished} selectedBox={selectedBox} dispatch={dispatch} />
          <RightSide>
            <ChooseBoxType selectedBox={selectedBox} setSelectedBox={setSelectedBox}/>
            <InputSize placeholder='Input Grid Size (MAX 30)' value={gridSize} onChange={(e) => handleInputGridSize(e)}/>
            <ShowMessage player={player}/>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}