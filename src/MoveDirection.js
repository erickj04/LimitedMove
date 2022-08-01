// filename should be utils?
// PascalCase cuma dipake kalo dia mainnya Component, dan ditulis dalam Noun
// kalo utils atau helper functions pakenya camelCase
function isPossible({nextPlace, can, walls, length}){
if(walls.find(wall => wall.koorX === nextPlace.koorX && wall.koorY === nextPlace.koorY))can = false;
    return nextPlace.koorX > 0 && nextPlace.koorX  <= length && nextPlace.koorY > 0 && nextPlace.koorY <= length && can;
}
function isGoal({nextPlace, can, goal}){
    return nextPlace.koorX === goal.koorX && nextPlace.koorY === goal.koorY & can;
}

export default function moveDirection(e, {player, walls, length, goal, setCurrentLevel, dispatch, initialBody}){
    if(e.key === 'a' || e.key === 'd' || e.key === 'w' || e.key === 's'){
      let direction = 'null';
      if(e.key === 'a')direction = 'left';
      if(e.key === 'd')direction = 'right';
      if(e.key === 'w')direction = 'up';
      if(e.key === 's')direction = 'down';
      let dx = 0;
      let dy = 0;
      let can = true;
      const nextPlace = {...player.position};
      if(direction === 'left'){
        dx = -player.stepRange;
        can = player.stepRemaining.leftStep !== 0;
      }
      if(direction === 'right'){
        dx = player.stepRange;
        can = player.stepRemaining.rightStep !== 0;
      }
      if(direction === 'up'){
        dy = -player.stepRange;
        can = player.stepRemaining.upStep !== 0;
      }
      if(direction === 'down'){
        dy = player.stepRange;
        can = player.stepRemaining.downStep !== 0;
      }
      nextPlace.koorX += dx;
      nextPlace.koorY += dy;
      if(isGoal({nextPlace, can, goal})){
        setCurrentLevel(level => level + 1);
        dispatch({
          type: 'reset',
          initialBody: {...initialBody}
        });
      }
      else if(isPossible({nextPlace, can, walls, length})){
        dispatch({
          type: 'movePlayer',
          direction: direction
        });
      }
    }
  }