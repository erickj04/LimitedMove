import { createContext, useContext, useState } from "react";
import * as React from 'react';
import ManagePlayer from "./ManagePlayer";
import { useReducer } from "react";

export const useCreativeContext = () => useContext(CreativeContext);
const CreativeContext = createContext(null);
export function CreativeContextProvider({children, selectedBox, setSelectedBox}){
    const [initialBody, setInitialBody]= useState({
        position:{koorX: 0, koorY: 0},
        stepRange: 1,
        stepRemaining: {leftStep: 0, rightStep: 0, upStep: 0, downStep: 0}
    });
    const [gridSize, setGridSize] = useState(null);
    const [walls, setWalls] = useState([]);
    const [goal, setGoal] = useState({});
    const [superJump, setSuperJump] = useState([]);
    const [switchClockwise, setSwitchClockwise] = useState([]);
    const [finished, setFinished] = useState(false);
    const [player, dispatch] = useReducer(
        ManagePlayer,
        {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
    );
    function moveDirection(e){
        function isPossible({nextPlace, can}){
            if(walls.find(wall => wall.koorX === nextPlace.koorX && wall.koorY === nextPlace.koorY))can = false;
            return nextPlace.koorX > 0 && nextPlace.koorX  <= gridSize && nextPlace.koorY > 0 && nextPlace.koorY <= gridSize && can;
        }
        function isGoal({nextPlace}){
            return nextPlace.koorX === goal.koorX && nextPlace.koorY === goal.koorY;
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
            console.log(can);
            if(isPossible({nextPlace, can})){
                console.log('still works');
                dispatch({
                    type: 'movePlayer',
                    direction: direction
                });
                if(isGoal({nextPlace})){
                    setFinished(true);
                }
                isSpecialBox({nextPlace});
            }
        }
    }
    function handleClickClear(){
        setFinished(false);
        setGoal({});
        setInitialBody({
            position:{koorX: 0, koorY: 0},
            stepRange: 1,
            //remember to change to 0
            stepRemaining: {leftStep: 5, rightStep: 5, upStep: 5, downStep: 5}
        })
        setSuperJump([]);
        setSwitchClockwise([]);
        setWalls([]);
        dispatch({
            type: 'deletePlayer'
        })
    }
    function handleClickReset(){
        dispatch({
          type: 'reset',
          initialBody: {position: {...initialBody.position}, stepRemaining: {...initialBody.stepRemaining}, stepRange: initialBody.stepRange}
        })
    }

    return(
        <CreativeContext.Provider value={{initialBody, walls, goal, gridSize, superJump, switchClockwise, finished, player, dispatch, moveDirection, handleClickReset, setGoal, setGridSize, setSuperJump, setSwitchClockwise, setWalls, setFinished, setInitialBody, selectedBox, setSelectedBox, handleClickClear}}>
            {children}
        </CreativeContext.Provider>
    )
}