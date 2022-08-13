import { WallButton, PlayerButton, GoalButton, ClockwiseButton} from './LevelHandling';
import { useState } from 'react';
import { CreativeContainer } from './LevelHandling';
export default function ChooseBoxType(){
    const [selectedBox, setSelectedBox] = useState('empty');
    function handleSelectedBox(type){
        setSelectedBox(type);
    }
    return(
        <CreativeContainer>
            {selectedBox === 'wall' ? <WallButton clicked /> : <WallButton onClick={() => handleSelectedBox('wall')} />}
            {selectedBox === 'player' ? <PlayerButton clicked>You</PlayerButton>: <PlayerButton onClick={() => handleSelectedBox('player')}>You</PlayerButton>}
            {selectedBox === 'goal' ? <GoalButton clicked>Goal</GoalButton>: <GoalButton onClick={() => handleSelectedBox('goal')}>Goal</GoalButton>}
            {selectedBox === 'clockwise' ? <ClockwiseButton clicked /> : <ClockwiseButton onClick={() => handleSelectedBox('clockwise')} />}
        </CreativeContainer>
    )
}