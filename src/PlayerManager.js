export default function PlayerManager(player, action){
    switch (action.type){
        case 'movePlayer': {
            const playerCopy = {...player};
            const range = playerCopy.stepRange;
            const reduce = 1;
            switch(action.direction){
                case 'left': {
                    playerCopy.position.koorX -= range;
                    playerCopy.stepRemaining.leftStep -= reduce;
                }; break;
                case 'right': {
                    playerCopy.position.koorX += range;
                    playerCopy.stepRemaining.rightStep -= reduce;
                }; break;
                case 'up': {
                    playerCopy.position.koorY -= range;
                    playerCopy.stepRemaining.upStep -= reduce;
                }; break;
                case 'down': {
                    playerCopy.position.koorY += range;
                    playerCopy.stepRemaining.downStep -= reduce;
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