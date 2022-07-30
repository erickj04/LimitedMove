export default function BoxManager(player, action){
    switch (action.type){
        case 'movePlayer': {
            let dx = 0;
            let dy = 0;
            switch(action.direction){
                case 'left': {
                    dx = -1;
                }; break;
                case 'right': {
                    dx = 1;
                }; break;
                case 'up': {
                    dy = -1;
                }; break;
                case 'down': {
                    dy = 1;
                }; break;
                default: console.log('WTF!');
            }
            return {
                ...player,
                koorX: player.koorX + dx,
                koorY: player.koorY + dy
            };
        }
        case 'eatApple': {

        }
        case 'hitWall': {

        }
        case 'reset': {
            return action.initialBody;
        }
        default: {
            console.log('WHAT!');
        }
    }
}