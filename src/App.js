import Grid from "./createGrid";
import { useState } from 'react';
import { useReducer } from 'react';
import  ManagePlayer from "./ManagePlayer";
import { useEffect } from "react";
import ShowMessage from './ShowMessage.js';
import { levels } from './Levels';
export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const initialBody = levels[currentLevel].initialBody;
  const walls = levels[currentLevel].walls;
  const goal = levels[currentLevel].goal;
  const gridSize = levels[currentLevel].gridSize;
  const superJump = levels[currentLevel].superJump;
  const switchClockwise = levels[currentLevel].switchClockwise;
  const finished = levels[currentLevel].finished;
  const [boxes, setBoxes] = useState([]);
  const [player, dispatch] = useReducer(
    ManagePlayer,
    {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
  );

  function isPossible({nextPlace, can}){
    if(walls.find(wall => wall.koorX === nextPlace.koorX && wall.koorY === nextPlace.koorY))can = false;
    return nextPlace.koorX > 0 && nextPlace.koorX  <= gridSize && nextPlace.koorY > 0 && nextPlace.koorY <= gridSize && can;
  }
  function isGoal({nextPlace, can}){
    return nextPlace.koorX === goal.koorX && nextPlace.koorY === goal.koorY & can;
  }
  function isSuperJump({nextPlace}){
    return superJump.find(twoTimes => twoTimes.koorX === nextPlace.koorX && twoTimes.koorY === nextPlace.koorY)
  }
  function isSwitchClockwise({nextPlace}){
    return switchClockwise.find(clockwise => clockwise.koorX === nextPlace.koorX && clockwise.koorY === nextPlace.koorY);
  }
  function isSpecialBox({nextPlace}){
    if(isSuperJump({nextPlace}))dispatch({type: 'superJump'});
    if(isSwitchClockwise({nextPlace}))dispatch({type: 'switchClockwise'});
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
          initialBody: {position: {...levels[currentLevel + 1].initialBody.position}, stepRemaining: {...levels[currentLevel + 1].initialBody.stepRemaining}, stepRange: levels[currentLevel + 1].initialBody.stepRange}
        });
      }
      else if(isPossible({nextPlace, can})){
        dispatch({
          type: 'movePlayer',
          direction: direction
        });
        isSpecialBox({nextPlace});
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
      {Grid({player, gridSize, walls, goal, superJump, switchClockwise, boxes, setBoxes, finished})}
      {ShowMessage({player})}
      <button onClick={handleClickReset}> RESET </button>
    </div>
  );
}