import { useCreativeContext } from './CreativeHandling';
import React from 'react'
import { InputStep, Title } from './StyledComponents';
export default function ShowCreativeMessage(){
    const {player, dispatch} = useCreativeContext();
    return(
        <div>
            <Title>Remaining Moves</Title>
            {`(press w) up: `}
            <InputStep 
                value={player.stepRemaining.upStep}
                onChange={(e) => dispatch({
                    type: 'changeStep',
                    stepType: 'up',
                    num: e.target.value
                }) 
            } />
            <br/>
            {`(press d) right: `}
            <InputStep 
                value={player.stepRemaining.rightStep}
                onChange={(e) => dispatch({
                    type: 'changeStep',
                    stepType: 'right',
                    num: e.target.value
                })
            } />
            <br />
            {`(press s) down: `}
            <InputStep 
                value={player.stepRemaining.downStep}
                onChange={(e) => dispatch({
                    type: 'changeStep',
                    stepType: 'down',
                    num: e.target.value
                })
            } />
            <br />
            {`(press a) left: `}
            <InputStep 
                value={player.stepRemaining.leftStep}
                onChange={(e) => dispatch({
                    type: 'changeStep',
                    stepType: 'left',
                    num: e.target.value
                })
            } />
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