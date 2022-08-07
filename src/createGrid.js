import  styled, {css} from "styled-components";
import { useEffect } from 'react';
import ClockwiseIcon from './Clockwise.svg';
import WallIcon from './Wall.jpg';
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
`
const SuperJumpBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: red;
`
const ClockwiseBox = styled(EmptyBox)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cyan;
    background-image: url(${ClockwiseIcon});
    background-size: cover;
`
function boxType({type, id}){
    if(type === 'player')return(<PlayerBox key={id}>You</PlayerBox>);
    else if(type === 'wall')return(<WallBox key={id} />);
    else if(type === 'goal')return(<GoalBox key={id}>Goal</GoalBox>);
    else if(type === 'superJump')return(<SuperJumpBox key={id}>2X</SuperJumpBox>);
    else if(type === 'clockwise')return(<ClockwiseBox key={id}>Clockwise</ClockwiseBox>);
    else  return(<EmptyBox key={id}/>)
}
export default function Grid({player, gridSize, walls, goal, superJump, switchClockwise, boxes, setBoxes}){
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
                else newBoxes[i].push({type: 'empty', id:{nextId}});
                nextId++;
            }
        }
        setBoxes(newBoxes);
    }, [player]);
    return(
        <Container>
            {boxes.map((row, i)=> {
                    return(
                        <Baris key={i} >
                            {row.map(box => boxType({type: box.type, id:box.id}))}
                        </Baris>
                    )
                })
            }
        </Container>
    )
}