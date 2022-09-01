import { useCreativeContext } from './CreativeHandling';
import { InputStep, Title } from './StyledComponents';
export default function ShowCreativeMessage(){
    const {player} = useCreativeContext();
    return(
        <div>
            <Title>Remaining Moves</Title>
            {`(press w) up: `}
            <InputStep></InputStep>
            <br/>
            {`(press d) right: `}
            <InputStep></InputStep>
            <br />
            {`(press s) down: `}
            <InputStep></InputStep>
            <br />
            {`(press a) left: `}
            <InputStep></InputStep>
            <br />
            <Title>Box Infos:</Title>
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