import  styled from "styled-components";
import { useEffect } from 'react';
import ClockwiseIcon from './Clockwise.svg';
import WallIcon from './Wall.jpg';
import FinishPicture from './Finish.jpg';
import useContextGame from "./LevelHandling";

// import { useInitialBody, useWalls, useSuperJump, useGridSize, useSwitchClockwise, useFinished } from "./LevelHandling";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-width: 1vw;
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    width: 50vw;
    height: 50vw;
`
const Baris = styled.div`
    display: flex;
    flex: 1;
`
const EmptyBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex: 1;
`;
const PlayerBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: green;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
const WallBox = styled(EmptyBox)`
    display: flex;
    background-image: url(${WallIcon});
    background-size: cover;
`
const GoalBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: gold;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
const SuperJumpBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: red;
    font-weight: bold;
    font-size: ${(props) => 10/(props.gridSize)}vw;
`
const ClockwiseBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cyan;
    background-image: url(${ClockwiseIcon});
    background-size: cover;
`
const FinishBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cyan;
    background-image: url(${FinishPicture});
    background-size: cover;
`
export default function Grid({player, boxes, setBoxes}){
    const {temp} = useContextGame;
    console.log(temp);
    const gridSize = temp.gridSize;
    const walls = [];
    const goal = {};
    const superJump = [];
    const switchClockwise = [];
    const finished = false;
    console.log('gridSize: ' + gridSize);
    function boxType({type, id}){
        if(type === 'player')return(<PlayerBox gridSize={gridSize} key={id}>You</PlayerBox>);
        else if(type === 'wall')return(<WallBox key={id} />);
        else if(type === 'goal')return(<GoalBox gridSize={gridSize} key={id}>Goal</GoalBox>);
        else if(type === 'superJump')return(<SuperJumpBox gridSize={gridSize} key={id}>2X</SuperJumpBox>);
        else if(type === 'clockwise')return(<ClockwiseBox gridSize={gridSize} key={id}></ClockwiseBox>);
        else if(type === 'finished')return(<FinishBox key={id}/>);
        else  return(<EmptyBox key={id}/>)
    }
    useEffect(() => {
        let nextId = 0;
        const newBoxes = [];
        for(let i = 1 ; i <= gridSize ; i++){
            newBoxes[i] = [];
            for(let j = 1 ; j <= gridSize ; j++){
                let now = {koorX: j, koorY: i};
                if(player.position.koorX === now.koorX && player.position.koorY === now.koorY){
                    newBoxes[i].push({type: 'player', id:{nextId}});
                }
                else if(walls.find(wall => wall.koorX === now.koorX && wall.koorY === now.koorY)){
                    newBoxes[i].push({type: 'wall', id:{nextId}});
                }
                else if(goal.koorX === now.koorX && goal.koorY === now.koorY){
                    newBoxes[i].push({type: 'goal', id:{nextId}});
                }
                else if(superJump.find(twoTimes => twoTimes.koorX === now.koorX && twoTimes.koorY === now.koorY)){
                    newBoxes[i].push({type: 'superJump', id:{nextId}});
                }
                else if(switchClockwise.find(clockwise => clockwise.koorX === now.koorX && clockwise.koorY === now.koorY)){
                    newBoxes[i].push({type: 'clockwise', id:{nextId}});
                }
                else if(finished){
                    newBoxes[i].push({type: 'finished', id:{nextId}});
                }
                else newBoxes[i].push({type: 'empty', id:{nextId}});
                nextId++;
            }
        }
        setBoxes(newBoxes);
    }, [player]);
    return(
        <Container>
            {boxes.map((row, i)=> {
                    return(<Baris key={i}>{row.map(box => boxType({type: box.type, id:box.id}))}</Baris>)
                })
            }
        </Container>
    )
}