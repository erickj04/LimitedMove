import { useEffect } from "react";
import ShowCreativeMessage from './ShowCreativeMessage.js';
import ChooseBoxType from "./ChooseBoxType";
import CreativeGrid from './CreativeGrid';
import {GameSpot, Button, RightSide, InputSize} from './StyledComponents'; 
import { useCreativeContext } from './CreativeHandling';
export default function Creative({creativeMode, setCreativeMode}){
  const {gridSize, setGridSize, finished, player, dispatch, selectedBox, setSelectedBox, moveDirection, setFinished, initialBody} = useCreativeContext();
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
      koorX: initialBody.position.koorX,
      koorY: initialBody.position.koorY
    });
  }
  return(
    <div>
        <h2>CREATIVE MODE</h2>
        <GameSpot>
          <CreativeGrid gridSize={gridSize} player={player} finished={finished} selectedBox={selectedBox} dispatch={dispatch} />
          <RightSide>
            <ChooseBoxType selectedBox={selectedBox} setSelectedBox={setSelectedBox}/>
            <InputSize placeholder='Input Grid Size (MAX 30)' value={gridSize} onChange={(e) => handleInputGridSize(e)}/>
            <ShowCreativeMessage />
            <Button onClick={handleStartNewGame}>START NEW GAME</Button>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}