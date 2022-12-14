import React from 'react';
import { useContextGame } from './LevelHandling';
export default function ShowMessage(){
    const {player} = useContextGame();
    return(
        <div>
            <h2>Remaining Moves</h2>
            {`(press w) up: ${player.stepRemaining.upStep}`}
            <br/>
            {`(press d) right: ${player.stepRemaining.rightStep}`}
            <br />
            {`(press s) down: ${player.stepRemaining.downStep}`}
            <br />
            {`(press a) left: ${player.stepRemaining.leftStep}`}
            <br />
            <h2>{'Box Infos:'}</h2>
            {'Green Box: You'}
            <br />
            {'Gold Box: Your Goal'}
            <br />
            {'Blue Box: Will Switch All The Remaining Move Clockwise (up -> right -> down -> left -> up)'}
            <br />
            {'Red Box: Will Activate Super Jump (Doubles Your Step Range & Can Jump Over Walls) For The Rest Of The Level'}
        </div>
    )
}