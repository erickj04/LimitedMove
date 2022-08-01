import createGrid from "./createGrid";
import { useState } from 'react';
import { useReducer } from 'react';
import  PlayerManager from "./PlayerManager";
import { useEffect } from "react";
import ShowMessage from './ShowMessage.js';
import { levels } from './Levels';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const initialBody = levels[currentLevel].initialBody;
  const walls = levels[currentLevel].walls;
  const goal = levels[currentLevel].goal;
  const length = levels[currentLevel].length;
  const superJump = levels[currentLevel].superJump;
  const switchClockwise = levels[currentLevel].switchClockwise;
  const [player, dispatch] = useReducer(
    PlayerManager,
    {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
  );
  
  function isPossible({nextPlace, can}){
    if(walls.find(wall => wall.koorX === nextPlace.koorX && wall.koorY === nextPlace.koorY))can = false;
    return nextPlace.koorX > 0 && nextPlace.koorX  <= length && nextPlace.koorY > 0 && nextPlace.koorY <= length && can;
  }
  function isGoal({nextPlace, can}){
    return nextPlace.koorX === goal.koorX && nextPlace.koorY === goal.koorY & can;
  }
  function isSuperJump({nextPlace}){
    if(superJump.find(twoTimes => twoTimes.koorX === nextPlace.koorX && twoTimes.koorY === nextPlace.koorY)){
      return true;
    }
    return false
  }
  function isSwitchClockwise({nextPlace}){
    return switchClockwise.find(clockwise => clockwise.koorX === nextPlace.koorX && clockwise.koorY === nextPlace.koorY);
  }
  function moveDirection(e){
    if(e.key === 'a' || e.key === 'd' || e.key === 'w' || e.key === 's'){
      let direction = 'null';
      if(e.key === 'a')direction = 'left';
      if(e.key === 'd')direction = 'right';
      if(e.key === 'w')direction = 'up';
      if(e.key === 's')direction = 'down';
      let dx = 0;
      let dy = 0;
      let can = true;
      const nextPlace = {...player.position};
      if(direction === 'left'){
        dx = -player.stepRange;
        can = player.stepRemaining.leftStep !== 0;
      }
      if(direction === 'right'){
        dx = player.stepRange;
        can = player.stepRemaining.rightStep !== 0;
      }
      if(direction === 'up'){
        dy = -player.stepRange;
        can = player.stepRemaining.upStep !== 0;
      }
      if(direction === 'down'){
        dy = player.stepRange;
        can = player.stepRemaining.downStep !== 0;
      }
      nextPlace.koorX += dx;
      nextPlace.koorY += dy;
      if(isGoal({nextPlace, can})){
        setCurrentLevel(currentLevel + 1);
        dispatch({
          type: 'reset',
          initialBody: {...levels[currentLevel + 1].initialBody}
        });
      }
      else if(isPossible({nextPlace, can})){
        dispatch({
          type: 'movePlayer',
          direction: direction
        });
        if(isSuperJump({nextPlace}))dispatch({type: 'superJump'})
        if(isSwitchClockwise({nextPlace}))dispatch({type: 'switchClockwise'})
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });
  // console.log(initialBody);
  // useEffect(() => {
  //   console.log(player);
  // }, [player]);

  function handleClickReset(){
    dispatch({
      type: 'reset',
      initialBody: {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
    })
  }

  return (
    <div>
        {createGrid({player, length, walls, goal, superJump, switchClockwise})}
        {ShowMessage({player})}
        <button onClick={handleClickReset}> reset </button>
    </div>
  );
}