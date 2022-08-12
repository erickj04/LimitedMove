import WallIcon from './Wall.jpg'
import  styled from "styled-components";
const Button=styled.button`
  display: flex;
  width: 8vw;
  height: 6vw;
`
const WallButton=styled(Button)`
    background-image: url(${WallIcon});
    background-size: cover;
`
export default function ChooseBoxType(){
    return(
        <div>
            <WallButton />
        </div>
    )
}