import {useEffect} from 'react';
import { useSnake  } from '../App/Hooks/useSnake';
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
export default function Grid(props : Props) {
    const snake = useSnake();
    useEffect(() => {
        // snake.move()
    }, [snake])
    const grid = getCoordinates(20, 20).map((coordinate, i) => {
        return (
            <Cell 
                key = {'c' + i}
                draw = {snake.draw(coordinate)}
                coordinate = {coordinate}/>
        )
    });
    return (
        <div data-testid = 'grid' className="Grid">
            {grid}
        </div>
    )
}