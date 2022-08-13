import { createContext, useContext } from "react";
import { levels } from './Levels';
import * as React from 'react';
import styled, {css} from "styled-components";
import ManagePlayer from "./ManagePlayer";
import { useReducer } from "react";
import WallIcon from './Wall.jpg';
import ClockwiseIcon from './Clockwise.svg';
import FinishPicture from './Finish.jpg';

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

export const GameSpot = styled.div`
    display:flex;
    gap: 2vw;
`
export const Button = styled.button`
    height: 3vw;
`
export const RightSide = styled.div`
    display:flex;
    gap: 1vw;
    flex-direction: column;
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-width: 1vw;
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    width: 50vw;
    height: 50vw;
`
export const Baris = styled.div`
    display: flex;
    flex: 1;
`
export const EmptyBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex: 1;
`
export const PlayerBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: green;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
export const WallBox = styled(EmptyBox)`
    display: flex;
    background-image: url(${WallIcon});
    background-size: cover;
`
export const GoalBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: gold;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
export const SuperJumpBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: red;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
export const ClockwiseBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cyan;
    background-image: url(${ClockwiseIcon});
    background-size: cover;
`
export const FinishBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cyan;
    background-image: url(${FinishPicture});
    background-size: cover;
`
export const WallButton=styled.button`
    display: flex;
    width: 8vw;
    height: 6vw;
    background-image: url(${WallIcon});
    background-size: cover;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const ClockwiseButton=styled.button`
    display: flex;
    width: 8vw;
    height: 6vw;
    background-image: url(${ClockwiseIcon});
    background-size: cover;
    background-color: cyan;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const PlayerButton=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: green;
    font-weight: bold;
    width: 8vw;
    height: 6vw;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const GoalButton=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: gold;
    width: 8vw;
    height: 6vw;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const SuperJumpButton=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: red;
    width: 8vw;
    height: 6vw;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const CreativeContainer = styled.div`
    display: flex;
    padding: 1vw 5vw;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    border-width: 1vw;
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    width: 45vw;
    height: 18vw;
`
export const InputSize = styled.input`
    width: 30vw;
`