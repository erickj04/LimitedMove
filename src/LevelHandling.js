import { createContext, useContext } from "react";
import { levels } from './Levels';
export const useInitialBody = () => useContext(ContextGame.initialBody);
export const useWalls = () => useContext(ContextGame.walls);
export const useSuperJump = () => useContext(ContextGame.superJump);
export const useGridSize = () => useContext(ContextGame.gridSize);
export const useSwitchClockwise = () => useContext(ContextGame.switchClockwise);
export const useFinished = () => useContext(ContextGame.finished);
export const useContextGame = () => useContext(ContextGame);
const ContextGame = createContext(null);
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
