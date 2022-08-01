export default function PlayerManager(player, action){
    switch (action.type){
        case 'movePlayer': {
            const playerCopy = {...player};
            const range = playerCopy.stepRange;
            switch(action.direction){
                case 'left': {
                    playerCopy.position.koorX -= range;
                    playerCopy.stepRemaining.leftStep -= 0.5;
                }; break;
                case 'right': {
                    playerCopy.position.koorX += range;
                    playerCopy.stepRemaining.rightStep -= 0.5;
                }; break;
                case 'up': {
                    playerCopy.position.koorY -= range;
                    playerCopy.stepRemaining.upStep -= 0.5;
                }; break;
                case 'down': {
                    playerCopy.position.koorY += range;
                    playerCopy.stepRemaining.downStep -= 0.5;
                }; break;
                default: console.log('WTF!');
            }
            return {...playerCopy};
        }
        case 'superJump': {
            return {
                ...player,
                stepRange: 2
            }
        }
        case 'switchClockwise': {
            console.log('yay');
            return {
                ...player,
                stepRemaining: {
                    ...player.stepRemaining,
                    upStep: player.stepRemaining.leftStep,
                    rightStep: player.stepRemaining.upStep,
                    downStep: player.stepRemaining.rightStep,
                    leftStep: player.stepRemaining.downStep,
                }
            }
        }
        case 'reset': {
            return {...action.initialBody};
        }
        default: {
            console.log('WHAT!');
        }
    }
}