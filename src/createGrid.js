import  styled, {css} from "styled-components";
import { useEffect } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-width: 1vw;
    border-color: green;
    border-style: solid;
    box-sizing: border-box;
    width: 50vw;
    height: 50vw;
`
const EmptyBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
`;
const Baris = styled.div`
    display: flex;
    flex-grow: 1;
`
const PlayerBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    background: green;
`
const WallBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    background: black;
`
const GoalBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    background: gold;
`
const SuperJumpBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    background: red;
`
const ClockwiseBox = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    background: blue;
`
function boxType({type, id}){
    if(type === 'player')return(<PlayerBox key={id}></PlayerBox>);
    else if(type === 'wall')return(<WallBox key={id} />);
    else if(type === 'goal')return(<GoalBox key={id} />);
    else if(type === 'superJump')return(<SuperJumpBox key={id} />);
    else if(type === 'clockwise')return(<ClockwiseBox key={id} />);
    else  return(<EmptyBox key={id}/>)
}
export default function Grid({player, length, walls, goal, superJump, switchClockwise, boxes, setBoxes}){
    useEffect(() => {
        let nextId = 0;
        const newBoxes = [];
        for(let i = 1 ; i <= length ; i++){
            newBoxes[i] = [];
            for(let j = 1 ; j <= length ; j++){
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