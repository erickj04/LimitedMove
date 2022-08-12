import { createContext, useContext } from "react";
import { levels } from './Levels';
import * as React from 'react';
import styled from "styled-components";

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
    return(
        <ContextGame.Provider value={{initialBody, walls, goal, gridSize, superJump, switchClockwise, finished}}>
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