import { useEffect, useState, useReducer } from 'react';
import ManagePlayer from './ManagePlayer';
import { Container, Baris, PlayerBox, WallBox, GoalBox, SuperJumpBox, ClockwiseBox, FinishBox, EmptyBox} from './LevelHandling';

export default function CreativeGrid({gridSize, player, finished, walls, goal, superJump, switchClockwise, selectedBox}){
    const [boxes, setBoxes] = useState([]);
    function boxType({type, id}){
        if(type === 'player')return(<PlayerBox gridSize={gridSize} key={id}>You</PlayerBox>);
        else if(type === 'wall')return(<WallBox key={id} />);
        else if(type === 'goal')return(<GoalBox gridSize={gridSize} key={id}>Goal</GoalBox>);
        else if(type === 'superJump')return(<SuperJumpBox gridSize={gridSize} key={id}>2X</SuperJumpBox>);
        else if(type === 'switchClockwise')return(<ClockwiseBox gridSize={gridSize} key={id}></ClockwiseBox>);
        else if(type === 'finished')return(<FinishBox key={id}/>);
        else  return(<EmptyBox key={id}/>)
    }
    //too inefficient to move players
    useEffect(() => {
        let nextId = 0;
        const newBoxes = [];
        for(let i = 1 ; i <= gridSize ; i++){
            newBoxes[i] = [];
            for(let j = 1 ; j <= gridSize ; j++){
                let now = {koorX: j, koorY: i};
                let type = 'empty';
                if(player.position.koorX === now.koorX && player.position.koorY === now.koorY){
                    type = 'player';
                }
                else if(walls.find(wall => wall.koorX === now.koorX && wall.koorY === now.koorY)){
                    type = 'wall';
                }
                else if(goal.koorX === now.koorX && goal.koorY === now.koorY){
                    type = 'goal';
                }
                else if(superJump.find(twoTimes => twoTimes.koorX === now.koorX && twoTimes.koorY === now.koorY)){
                    type = 'superJump';
                }
                else if(switchClockwise.find(clockwise => clockwise.koorX === now.koorX && clockwise.koorY === now.koorY)){
                    type = 'switchClockwise';
                }
                else if(finished){
                    type = 'finished';
                }
                newBoxes[i].push({type: type, id:nextId, koorX: j, koorY: i});
                nextId++;
            }
        }
        setBoxes(newBoxes);
    }, [player, gridSize, finished, walls, goal, superJump, switchClockwise]);
    return(
        <Container>
            {boxes.map((row, i)=> {
                    console.log('yay');
                    return(<Baris key={i}>
                        {row.map(box => boxType({type: box.type, id:box.id}))}
                    </Baris>)
                })
            }
        </Container>
    )
}