// Message (Noun) should be more accurate
export default function ShowMessage({player}){
    let upStep = `(press w) up: ${player.stepRemaining.upStep}`;
    let downStep = `(press s) down: ${player.stepRemaining.downStep}`;
    let rightStep = `(press d) right: ${player.stepRemaining.rightStep}`;
    let leftStep = `(press a) left: ${player.stepRemaining.leftStep}`;
    return(
        <div>
            {upStep}
            {/* 1) component kosong biasa ditulisnya <br /> */}
            {/* 2) gimana kalo ditulis penuh disini instead pake variable diatas ya? instead of {rightStep} prefer kayak (press d) right: ${player.stepRemaining.rightStep}*/}
            {/* Agak ga konsisten sebagian jadi variabel sebagian jadi html */}
            <br></br>
            {rightStep}
            <br></br>
            {downStep}
            <br></br>
            {leftStep}
            <br></br>
            <h2>Box Infos:</h2>
            Green Box: You
            <br></br>
            Gold Box: Your Goal
            <br></br>
            Red Box: Will Activate Super Jump (Doubles Your Step Range)
            <br></br>
            Blue Box: Will Switch All The Remaining Move Clockwise
            <br></br>
            <br></br>
        </div>
    )
}