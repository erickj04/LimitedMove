import { createContext, useContext } from "react";
import { levels } from './Levels';
import * as React from 'react';
import ManagePlayer from "./ManagePlayer";
import { useReducer } from "react";

export const useContextGame = () => useContext(ContextGame);
const ContextGame = createContext(null);
export function ContextProvider({children, currentLevel, setCurrentLevel}){
    const initialBody = levels[currentLevel].initialBody;
    const walls = levels[currentLevel].walls;
    const goal = levels[currentLevel].goal;
    const gridSize = levels[currentLevel].gridSize;
    const superJump = levels[currentLevel].superJump;
    const switchClockwise = levels[currentLevel].switchClockwise;
    const finished = levels[currentLevel].finished;
    const [player, dispatch] = useReducer(
        ManagePlayer,
        {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
    );

    function moveDirection(e){
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
                can = player.stepRemaining.leftStep > 0;
            }
            if(direction === 'right'){
                dx = player.stepRange;
                can = player.stepRemaining.rightStep > 0;
            }
            if(direction === 'up'){
                dy = -player.stepRange;
                can = player.stepRemaining.upStep > 0;
            }
            if(direction === 'down'){
                dy = player.stepRange;
                can = player.stepRemaining.downStep > 0;
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
                console.log('still works');
                dispatch({
                    type: 'movePlayer',
                    direction: direction
                });
                isSpecialBox({nextPlace});
            }
        }
    }

    function handleClickReset(){
        dispatch({
          type: 'reset',
          initialBody: {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
        })
    }

    return(
        <ContextGame.Provider value={{initialBody, walls, goal, gridSize, superJump, switchClockwise, finished, player, dispatch, currentLevel, setCurrentLevel, moveDirection, handleClickReset}}>
            {children}
        </ContextGame.Provider>
    )
}