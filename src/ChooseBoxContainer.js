import { WallButton, PlayerButton, GoalButton, ClockwiseButton, SuperJumpButton, DeleteButton, CreativeContainer} from './StyledComponents';
export default function ChooseBoxContainer({selectedBox, setSelectedBox}){
    function handleSelectedBox(type){
        setSelectedBox(type);
    }
    return(
        <CreativeContainer>
            {selectedBox === 'wall' ? <WallButton clicked /> : <WallButton onClick={() => handleSelectedBox('wall')} />}
            {selectedBox === 'player' ? <PlayerButton clicked>You</PlayerButton> : <PlayerButton onClick={() => handleSelectedBox('player')}>You</PlayerButton>}
            {selectedBox === 'goal' ? <GoalButton clicked>Goal</GoalButton> : <GoalButton onClick={() => handleSelectedBox('goal')}>Goal</GoalButton>}
            {selectedBox === 'clockwise' ? <ClockwiseButton clicked /> : <ClockwiseButton onClick={() => handleSelectedBox('clockwise')} />}
            {selectedBox === 'superJump' ? <SuperJumpButton clicked>2X</SuperJumpButton> : <SuperJumpButton onClick={() => handleSelectedBox('superJump')}>2X</SuperJumpButton>}
            {selectedBox === 'delete' ? <DeleteButton clicked>DELETE</DeleteButton> : <DeleteButton onClick={() => handleSelectedBox('delete')}>DELETE</DeleteButton>}
        </CreativeContainer>
    )
}