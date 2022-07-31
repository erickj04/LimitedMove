import createGrid from "./createGrid";
import { useState } from 'react';
import { useReducer } from 'react';
import  PlayerManager from "./PlayerManager";
import { useEffect } from "react";
import showStepRemaining from './ShowStepRemaining.js';
import { levels } from './Levels';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const initialBody = levels[currentLevel].initialBody;
  const walls = levels[currentLevel].walls;
  const goal = levels[currentLevel].goal;
  const length = levels[currentLevel].length;
  const timesTwo = levels[currentLevel].timesTwo;

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
        setCurrentLevel(level => level + 1);
        dispatch({
          type: 'reset',
          initialBody: {...initialBody}
        });
      }
      else if(isPossible({nextPlace, can})){
        dispatch({
          type: 'movePlayer',
          direction: direction
        });
      }
    }
  }
  console.log('level: ' + currentLevel);
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });

  // useEffect(() => {
  //   console.log(player);
  // }, [player]);

  console.log(initialBody);
  function handleClickReset(){
    dispatch({
      type: 'reset',
      initialBody: {...initialBody, position: {...initialBody.position}}
    })
  }

  return (
    <div>
        {createGrid({player, length, walls, goal, timesTwo})}
        {showStepRemaining({player})}
        <button onClick={handleClickReset}> reset </button>
    </div>
  );
}