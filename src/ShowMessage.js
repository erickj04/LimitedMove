export default function ShowMessage({player}){
    return(
        <div>
            {`(press w) up: ${player.stepRemaining.upStep}`}
            <br/>
            {`(press s) down: ${player.stepRemaining.downStep}`}
            <br />
            {`(press d) right: ${player.stepRemaining.rightStep}`}
            <br />
            {`(press a) left: ${player.stepRemaining.leftStep}`}
            <br />
            <h2>Box Infos:</h2>
            Green Box: You
            <br />
            Gold Box: Your Goal
            <br />
            Red Box: Will Activate Super Jump (Doubles Your Step Range)
            <br />
            Blue Box: Will Switch All The Remaining Move Clockwise
        </div>
    )
}