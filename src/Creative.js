import { useEffect } from "react";
import ShowCreativeMessage from './ShowCreativeMessage.js';
import ChooseBoxContainer from "./ChooseBoxContainer";
import CreativeGrid from './CreativeGrid';
import {GameSpot, Button, RightSide, InputSize, InputGridSize} from './StyledComponents'; 
import { useCreativeContext } from './CreativeHandling';
export default function Creative({creativeMode, setCreativeMode}){
  const {gridSize, setGridSize, finished, player, dispatch, selectedBox, setSelectedBox, moveDirection, setFinished, handleClickClear} = useCreativeContext();
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });
  function handleCreativeMode(){
    setCreativeMode(!creativeMode);
  }
  function handleInputGridSize(e){
    setGridSize(e.target.value);
  }
  function handleStartNewGame(){
    setFinished(false);
    dispatch({
      type: 'spawnPlayer',
      position: {...player.initialBody.position}
    });
  }
  return(
    <div>
        <h2>CREATIVE MODE</h2>
        <GameSpot>
          <CreativeGrid gridSize={gridSize} player={player} finished={finished} selectedBox={selectedBox} dispatch={dispatch} />
          <RightSide>
            <ChooseBoxContainer selectedBox={selectedBox} setSelectedBox={setSelectedBox}/>
            <InputGridSize>
              {'Grid Size: '}
              <InputSize placeholder='Input Grid Size (MAX 30)' value={gridSize} onChange={(e) => handleInputGridSize(e)}/>
            </InputGridSize>
            <ShowCreativeMessage />
            <Button onClick={handleClickClear}>CLEAR</Button>
            <Button onClick={handleStartNewGame}>START NEW GAME</Button>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}