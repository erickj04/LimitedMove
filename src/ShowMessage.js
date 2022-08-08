export default function ShowMessage({player}){
    return(
        <div>
            Remaining Moves
            <br />
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
            {'Red Box: Will Activate Super Jump (Doubles Your Step Range & Can Jump Over Walls)'}
            <br />
            {'Blue Box: Will Switch All The Remaining Move Clockwise (up -> right -> down -> left -> up)'}
        </div>
    )
}