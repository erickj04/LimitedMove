import  styled, {css} from "styled-components";
import { useEffect, useState } from 'react';

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

const Box = styled.div`
    border-color: black;
    border-style: solid;
    box-sizing: border-box;
    flex-grow: 1;
    ${props => props.type == 'player' && css`
        background: lightgreen;
    `}
    ${props => props.type == 'wall' && css`
        background: black;
    `}
    ${props => props.type == 'goal' && css`
        background: gold;
    `}
    ${props => props.type == 'timesTwo' && css`
        background: red;
    `}
`;

const Baris = styled.div`
    display: flex;
    flex-grow: 1;
`

export default function CreateGrid({player, length, walls, goal, timesTwo}){
    const [boxes, setBoxes] = useState([]);
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
                else if(timesTwo.find(twotimes => twotimes.koorX === now.koorX && twotimes.koorY === now.koorY)){
                    newBoxes[i].push({type: 'timesTwo', id:{nextId}});
                }
                else newBoxes[i].push({type: 'empty', id:{nextId}});
                nextId++;
            }
        }
        setBoxes(newBoxes);
    }, [player]);
    return(
        <Container>
            {
                boxes.map((row, i)=> {
                    return(
                        <Baris key={i} >
                        {
                            row.map(box => {
                                return(
                                    <Box key={box.id} type={box.type}></Box>
                                )
                            })
                        }
                        </Baris>
                    )
                })
            }
        </Container>
    )
}