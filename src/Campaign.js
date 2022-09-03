import Grid from "./Grid";
import { useEffect } from 'react';
import ShowMessage from './ShowMessage.js';
import { useContextGame} from "./LevelHandling";
import {GameSpot, Button, RightSide, Title} from './StyledComponents';
export default function Campaign({creativeMode, setCreativeMode}){
  const {moveDirection, handleClickReset, currentLevel} = useContextGame();
  useEffect(() => {
    document.addEventListener('keydown', moveDirection);
    return () => {
      document.removeEventListener('keydown', moveDirection);
    }
  });
  function handleCreativeMode(){
    setCreativeMode(!creativeMode);
  }
  return(
    <div>
        <h2>CAMPAIGN</h2>
        <GameSpot>
          <Grid />
          <RightSide>
            <ShowMessage />
            <Title>Level : {`${currentLevel}`}</Title>
            <Button onClick={handleClickReset}> RESET </Button>
            {!creativeMode ? <Button onClick={handleCreativeMode}> CREATIVE MODE </Button> : <Button onClick={handleCreativeMode}> CAMPAIGN </Button>}
          </RightSide>
        </GameSpot>
    </div>
  )
}