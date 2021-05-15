import { composeClasses } from '../App/helpers'
import './Scss/Grid.scss'
interface Props {
   coordinate : string;
   draw : string;
} 
export default function Screen(props : Props) {
    const {draw, coordinate} = props
    
    return (
        <div className={composeClasses('Cell', draw)}>
            
        </div>
    ) 
}