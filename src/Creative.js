import { useState } from 'react';
import { useReducer } from 'react';
import  ManagePlayer from "./ManagePlayer";
import { useEffect } from "react";
import ShowMessage from './ShowMessage.js';
import ChooseBoxType from "./ChooseBoxType";
import { GameSpot, Button, RightSide, Container, useContextGame } from "./LevelHandling";

export default function Creative({creativeMode, setCreativeMode}){
  const [boxes, setBoxes] = useState([]);
  const {moveDirection} = useContextGame();
  const initialBody = {
    position:{koorX: 0, koorY: 0},
    stepRange: 1,
    stepRemaining: {leftStep: 0, rightStep: 0, upStep: 0, downStep: 0}
  }
  const walls = [];
  const goal = {koorX: 0, koorY: 0};
  const gridSize = 10;
  const superJump = [];
  const switchClockwise = [];
  const finished = false;
  const [player, dispatch] = useReducer(
    ManagePlayer,
    {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
  );
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
        <h2>CREATIVE MODE</h2>
        <GameSpot>
          <Container />
          <RightSide>
            <ChooseBoxType />
            <ShowMessage player={player}/>
            <Button onClick={handleClickReset}> RESET </Button>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}