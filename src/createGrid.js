import { useEffect } from 'react';
import { useContextGame } from "./LevelHandling";
import { Container, Baris, PlayerBox, WallBox, GoalBox, SuperJumpBox, ClockwiseBox, FinishBox, EmptyBox} from './LevelHandling';

export default function Grid({boxes, setBoxes}){
    const {gridSize, walls, goal, superJump, switchClockwise, finished, player} = useContextGame();
    function boxType({type, id}){
        if(type === 'player')return(<PlayerBox gridSize={gridSize} key={id}>You</PlayerBox>);
        else if(type === 'wall')return(<WallBox key={id} />);
        else if(type === 'goal')return(<GoalBox gridSize={gridSize} key={id}>Goal</GoalBox>);
        else if(type === 'superJump')return(<SuperJumpBox gridSize={gridSize} key={id}>2X</SuperJumpBox>);
        else if(type === 'clockwise')return(<ClockwiseBox gridSize={gridSize} key={id}></ClockwiseBox>);
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