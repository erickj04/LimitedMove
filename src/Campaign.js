import Grid from "./createGrid";
import { useState } from 'react';
import { useEffect } from 'react';
import ShowMessage from './ShowMessage.js';
import {GameSpot, Button, RightSide, useContextGame} from "./LevelHandling";

export default function Campaign({creativeMode, setCreativeMode}){
  const [boxes, setBoxes] = useState([]);
  const {initialBody, player, dispatch, moveDirection} = useContextGame();
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });
  function handleClickReset(){
    dispatch({
      type: 'reset',
      initialBody: {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
    })
  }
  function handleCreativeMode(){
    setCreativeMode(!creativeMode);
  }
  return(
    <div>
        <h2>CAMPAIGN</h2>
        <GameSpot>
          <Grid player={player} boxes={boxes} setBoxes={setBoxes} />
          <RightSide>
            <ShowMessage player={player}/>
            <Button onClick={handleClickReset}> RESET </Button>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}