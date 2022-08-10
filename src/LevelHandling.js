import { createContext } from "react";
import { levels } from './Levels';

export const initialBody = createContext(levels[currentLevel].initialBody);
export const walls = createContext(levels[currentLevel].walls);
export const goal = createContext(levels[currentLevel].goal);
export const gridSize = createContext(levels[currentLevel].gridSize);
export const superJump = createContext(levels[currentLevel].superJump);
export const switchClockwise = createContext(levels[currentLevel].switchClockwise);
export const finished = createContext(levels[currentLevel].finished);
export default function ContextProvider({children}){
    return(
        <ContextProvider.Provider value={initialBody}>
            {children}
        </ContextProvider.Provider>
    )
}