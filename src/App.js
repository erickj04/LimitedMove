import createGrid from "./createGrid";
import { useState } from 'react';
import { useReducer } from 'react';
import BoxManager from "./BoxManager";
import { useEffect } from "react";


export default function App() {
  const initialBody = {
    koorX: 1, 
    koorY: 1,
    stepRange: 1,
    rightStep: 100,
    leftStep: 100,
    downStep: 100,
    upStep: 100
  };
  const [player, dispatch] = useReducer(
    BoxManager,
    initialBody
  );

  function moveDirection(e){
    if(e.key == 'a' || e.key == 'd' || e.key == 'w' || e.key == 's'){
      let direction = 'null';
      if(e.key === 'a')direction = 'left';
      if(e.key === 'd')direction = 'right';
      if(e.key === 'w')direction = 'up';
      if(e.key === 's')direction = 'down';
      dispatch({
        type: 'movePlayer',
        direction: direction
      });
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });

  useEffect(() => {
    console.log(player);
  }, [player]);

  return (
    <div>
        {createGrid({player})}
    </div>
  );
}