export default function showStepRemaining({player}){
    let upStep = `up: ${player.stepRemaining.upStep}`;
    let downStep = `down: ${player.stepRemaining.downStep}`;
    let rightStep = `right: ${player.stepRemaining.rightStep}`;
    let leftStep = `left: ${player.stepRemaining.leftStep}`;
    return(
        <div>
            {upStep}
            <br></br>
            {downStep}
            <br></br>
            {rightStep}
            <br></br>
            {leftStep}
        </div>
    )
}