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
    ${props => props.body && css`
        background: lightgreen;
    `}
`;

const Baris = styled.div`
    display: flex;
    flex-grow: 1;
`

export default function CreateGrid({player}){
    const length = 10;
    const [boxes, setBoxes] = useState([]);
    useEffect(() => {
        let nextId = 0;
        const newBoxes = [];
        for(let i = 1 ; i <= length ; i++){
            newBoxes[i] = [];
            for(let j = 1 ; j <= length ; j++){
                let now = {koorX: j, koorY: i};
                if(player.koorX === now.koorX && player.koorY === now.koorY){
                    newBoxes[i].push({type: 'body', id:{nextId}});
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
                                    box.type === 'empty' ? (
                                        <Box key={box.id} />
                                    ): (
                                    <Box  key={box.id} body />
                                ))
                            })
                        }
                        </Baris>
                    )
                })
            }
        </Container>
    )
}