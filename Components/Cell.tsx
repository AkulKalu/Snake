import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { composeClasses } from '../App/helpers'
import { Snake } from '../App/Hooks/useSnake'
import { addEatable, eatableSelector } from '../store/snakeReducer';
import './Scss/Grid.scss'
interface Props {
   coordinate : string;
   snake : Snake
} 
export default function Screen({snake, coordinate} : Props) {
    const hasEatable = useSelector(eatableSelector, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        if(hasEatable === coordinate && snake.head === coordinate) {
            console.log('x');
            
           dispatch(addEatable([]))
        }
    })
    
    return (
        <div className={composeClasses('Cell', snake.draw(coordinate), hasEatable === coordinate ? 'Eatable' : '')}>
            
        </div>
    ) 
}