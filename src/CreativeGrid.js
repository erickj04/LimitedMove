import { useEffect, useState, useReducer } from 'react';
import { useCreativeContext } from './CreativeHandling';
import { Container, Baris, PlayerBox, WallBox, GoalBox, SuperJumpBox, ClockwiseBox, FinishBox, EmptyBox} from './StyledComponents';

export default function CreativeGrid(){
    const {gridSize, player, finished, selectedBox, dispatch, walls, goal, superJump, switchClockwise, setWalls, setGoal, setSuperJump, setSwitchClockwise} = useCreativeContext();
    const [boxes, setBoxes] = useState([]);
    function handleChangeBox({koorX, koorY}){
        if(selectedBox === 'wall'){
            setWalls([...walls, {koorX, koorY}]);
        }
        if(selectedBox === 'goal'){
            setGoal({koorX, koorY});
        }
        if(selectedBox === 'player'){
            dispatch({
                type: 'spawnPlayer',
                koorX,
                koorY
            })
        }
        if(selectedBox === 'superJump'){
            setSuperJump([...superJump, {koorX, koorY}]);
        }
        console.log(selectedBox);
        if(selectedBox === 'clockwise'){
            setSwitchClockwise([...switchClockwise, {koorX, koorY}]);
        }
    }
    function HandleDeleteBox({targetBox, koorX, koorY}){
        
        if(selectedBox === 'delete'){
            if(targetBox === 'player'){
                dispatch({
                    type: 'deletePlayer'
                })
            }
            if(targetBox === 'wall'){
                setWalls(walls.filter(wall => wall.koorX !== koorX || wall.koorY !== koorY));
            }
            if(targetBox === 'goal'){
                setGoal({});
            }
            if(targetBox === 'superJump'){
                setSuperJump(superJump.filter(sp => sp.koorX !== koorX || sp.koorY !== koorY))
            }
            if(targetBox === 'clockwise'){
                setSwitchClockwise(switchClockwise.filter(clockwise => clockwise.koorX !== koorX || clockwise.koorY !== koorY))
            }
        }
    }
    function boxType({type, id, koorX, koorY}){
        if(type === 'finished')return(<FinishBox key={id}/>);
        else if(type === 'player')return(<PlayerBox onClick = {() => HandleDeleteBox({targetBox: 'player', koorX, koorY})} gridSize={gridSize} key={id}>You</PlayerBox>);
        else if(type === 'wall')return(<WallBox onClick = {() => HandleDeleteBox({targetBox: 'wall', koorX, koorY})} key={id} />);
        else if(type === 'goal')return(<GoalBox onClick = {() => HandleDeleteBox({targetBox: 'goal', koorX, koorY})} gridSize={gridSize} key={id}>Goal</GoalBox>);
        else if(type === 'superJump')return(<SuperJumpBox onClick = {() => HandleDeleteBox({targetBox: 'superJump', koorX, koorY})} gridSize={gridSize} key={id}>2X</SuperJumpBox>);
        else if(type === 'switchClockwise')return(<ClockwiseBox gridSize={gridSize} key={id}></ClockwiseBox>);
        else  return(<EmptyBox onClick={() => handleChangeBox({koorX, koorY})} key={id} />)
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
    }, [player, gridSize, walls, goal, superJump, switchClockwise]);
    return(
        <Container>
            {boxes.map((row, i)=> {
                    return(<Baris key={i}>
                        {row.map(box => boxType({type: box.type, id:box.id, koorX: box.koorX, koorY: box.koorY}))}
                    </Baris>)
                })
            }
        </Container>
    )
}
