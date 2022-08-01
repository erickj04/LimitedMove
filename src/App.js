import createGrid from "./createGrid";
import { useState } from 'react';
import { useReducer } from 'react';
import  PlayerManager from "./PlayerManager";
import { useEffect } from "react";
import ShowMessage from './ShowMessage.js';
import { levels } from './Levels';

// Ada errors di console:
// react-dom.development.js:86 Warning: Encountered two children with the same key, `[object Object]`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
// at div

// pas kelar muncul ini, keknya dia akses array index yang terlalu kanan?
// perlu bikin corner case buat handle ini
// App.js:11 Uncaught TypeError: Cannot read properties of undefined (reading 'initialBody')

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  // mungkin player movement handling sama setup handling bisa dipisah, player movement handling mungkin bisa di context? https://reactjs.org/docs/hooks-reference.html#usecontext
  // board handling di context terpisah mubgkin juga bisa
  const initialBody = levels[currentLevel].initialBody;
  const walls = levels[currentLevel].walls;
  const goal = levels[currentLevel].goal;
  const length = levels[currentLevel].length; // naming can be improved. ini length apa? probably something like gridDimension?
  const superJump = levels[currentLevel].superJump;
  const switchClockwise = levels[currentLevel].switchClockwise;

  // why do you decide buat pake reducer?
  const [player, dispatch] = useReducer(
    PlayerManager,
    {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
  );

  // function2 gini keknya enak dipisah jadi utils function aja kali biar gampang liatnya
  // wait itu di MoveDirection file ada function2 yang mirip gini....
  function isPossible({nextPlace, can}){
    if(walls.find(wall => wall.koorX === nextPlace.koorX && wall.koorY === nextPlace.koorY))can = false;
    return nextPlace.koorX > 0 && nextPlace.koorX  <= length && nextPlace.koorY > 0 && nextPlace.koorY <= length && can;
  }
  function isGoal({nextPlace, can}){
    return nextPlace.koorX === goal.koorX && nextPlace.koorY === goal.koorY & can;
  }
  function isSuperJump({nextPlace}){
    // sama aja kek return superJump.find(twoTimes => twoTimes.koorX === nextPlace.koorX && twoTimes.koorY === nextPlace.koorY)
    if(superJump.find(twoTimes => twoTimes.koorX === nextPlace.koorX && twoTimes.koorY === nextPlace.koorY)){
      return true;
    }
    return false
  }
  function isSwitchClockwise({nextPlace}){
    return switchClockwise.find(clockwise => clockwise.koorX === nextPlace.koorX && clockwise.koorY === nextPlace.koorY);
  }
  function moveDirection(e){
    // Instead of if(condition) { ... very long logic .... } prefer if(!condition) return;
    // Soalnya kalo orang baca, dia perlu inget kalo "ini di dalam if" sampe baca logicnya selesai
    if(e.key === 'a' || e.key === 'd' || e.key === 'w' || e.key === 's'){
      // keknya instead pake string 'left' 'right' gitu2 lebih bagus pake enum (at least constant kek diluar ada `const LEFT_DIRECTION = 1` dll)
      // soalnya kalo pake simple string kalo typo gg debugnya susah
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
  console.log(initialBody);

  function handleClickReset(){
    dispatch({
      type: 'reset',
      initialBody: {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
    })
  }

  return (
    <div>
      {/* ah cara pakenya ga gini kalo bikin functional components */}
      {/* function Component({a, b}){} gitu pakenya <Component a={} b={} /> */}
        {createGrid({player, length, walls, goal, superJump, switchClockwise})}
        {ShowMessage({player})}
        <button onClick={handleClickReset}> RESET </button>
    </div>
  );
}