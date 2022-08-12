import { createContext, useContext } from "react";
import { levels } from './Levels';
import * as React from 'react';
import styled from "styled-components";
import ManagePlayer from "./ManagePlayer";
import { useReducer } from "react";
import WallIcon from './Wall.jpg';
import ClockwiseIcon from './Clockwise.svg';
import FinishPicture from './Finish.jpg';
export const useContextGame = () => useContext(ContextGame);
const ContextGame = React.createContext(null);
export default function ContextProvider({children, currentLevel}){
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
    return(
        <ContextGame.Provider value={{initialBody, walls, goal, gridSize, superJump, switchClockwise, finished, player}}>
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
    gap: 2vw;
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