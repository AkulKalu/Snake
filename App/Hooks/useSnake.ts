import { useState } from 'react';
interface SnakeConfig {
    position : Array<string>;
    speed : number;
    growSlot : string;
    direction : ['x' | 'y', number]
}
export class Snake {
    private position : string[];
    private speed : number;
    private growSlot : string;
    private snakeMap : globalThis.Set<string> = new Set();
    private direction : ['x' | 'y', number] = ['y', 1];
    private updateScreen : React.Dispatch<React.SetStateAction<SnakeConfig>>; 
    private timeout : undefined | NodeJS.Timeout = undefined;
    
    constructor(config : SnakeConfig, update : React.Dispatch<React.SetStateAction<SnakeConfig>>) {
        this.position = [...config.position];
        this.speed = config.speed;
        this.growSlot = config.growSlot;
        this.direction = [...config.direction]
        this.updateScreen = update;
        config.position.forEach((coordinate) => {
            this.snakeMap.add(coordinate)
        })
    }

    draw(coordinate: string) : string {
        if(coordinate === this.head) {
            return 'SnakeHead';
        }else if(coordinate === this.tail) {
            return 'SnakeTail';
        }else if(this.snakeMap.has(coordinate)) {
            return 'SnakeBody';
        }
        return ''
    }

    direct(axis : 'y' | 'x' = 'y', direction : number = 1) {
        if(this.assertDirectionIsValid(axis, direction)) {
            if(this.timeout) {
                clearTimeout(this.timeout);
            }
            this.direction = [axis, direction];
            this.move(0);
        }
    }

    move(speed = 50) {
        this.timeout = setTimeout(() => {
            const head = this.getCoordinateObject(this.head);
            const [axis, step] = this.direction;
            head[axis as keyof typeof head] += step;

            const isInBounds = head.x < 20 && head.y < 20 && head.x >= 0 && head.y >= 0 ;

            if(isInBounds) {
                this.growSlot = this.position.pop() || this.growSlot;
                this.position = [this.getCoordinateString(head), ...this.position];
            }else {
                this.position = ['10,10', '10,9', '10,8', '10,7',];
                this.growSlot = '10,6'
            }
            this.updateScreen({
                position : this.position,
                speed : this.speed,
                growSlot : this.growSlot,
                direction : this.direction
            })
        }, speed)
    }

    protected assertDirectionIsValid(axis : 'x' | 'y', direction : number) {
        const [currentAxis] = this.direction;
        if(currentAxis !== axis ) {
            return true;
        }
        return false;
    }
    protected getCoordinateObject(coordinate : string)  {
        const [x, y] = coordinate.split(',');
        return {
            x : Number(x),
            y : Number(y),
        }
    }
    protected getCoordinateString(coordinate : {x : number, y : number}) : string {
        return `${coordinate.x},${coordinate.y}`;
    }

    get head() : string {
        return this.position[0];
    }

    get tail() : string {
        return this.position[this.position.length - 1];
    }
}
export function useSnake() : Snake {
    const [snake, setSnake] = useState<SnakeConfig>({
        position : ['10,10', '10,9', '10,8', '10,7',],
        speed : 0.5,
        growSlot : '10,6',
        direction : ['y', 1]
    })


    return new Snake(snake, setSnake)
}