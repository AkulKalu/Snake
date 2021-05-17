import {useEffect, useLayoutEffect} from 'react';
import { Snake, useSnake  } from '../App/Hooks/useSnake';
import Cell from './Cell';
interface Props {
    snake : object[]
}
export function getCoordinates(sizeX : number, sizeY : number) {
    const grid : Array<string>  = [];

    for(let y = sizeY - 1; y >= 0; y--) {
        for(let x = 0; x < sizeX; x++) {
            grid.push( `${x},${y}` )
        }
    }
    
    return grid;
}
function navigateSnake(snake : Snake) {
    return (ev : KeyboardEvent) => {
        if(ev.key === 'a') {
            snake.direct('x', -1);
        }else if(ev.key === 'd') {
            snake.direct('x', 1);
        }else if(ev.key === 'w') {
            snake.direct('y', 1);
        }else if(ev.key === 's') {
            snake.direct('y', -1);
        }
    }
}
export default function Grid(props : Props) {
    const snake = useSnake();
    console.log('ss');
    
    useLayoutEffect(() => {
        window.onkeydown = navigateSnake(snake)
        snake.move()
    }, [snake])
    const grid = getCoordinates(20, 20).map((coordinate, i) => {
        return (
            <Cell 
                key = {'c' + i}
                snake = {snake}
                coordinate = {coordinate}/>
        )
    });
    return (
        <div  data-testid = 'grid' className="Grid">
            {grid}
        </div>
    )
}