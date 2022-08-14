import WallIcon from './Wall.jpg';
import ClockwiseIcon from './Clockwise.svg';
import FinishPicture from './Finish.jpg';
import styled, {css} from "styled-components";

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
    font-weight: bold;
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
    font-weight: bold;
    ${props => props.clicked && css`
        scale: 0.9;
        border-color: red;
        border-style: solid;
    `}
`
export const DeleteButton=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vw;
    height: 6vw;
    font-weight: bold;
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