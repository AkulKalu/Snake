import { useState } from 'react';
interface SnakeConfig {
    position : Array<string>;
    speed : number;
    growSlot : string;
}
export class Snake {
    private position : string[];
    private speed : number;
    private growSlot : string;
    private snakeMap : globalThis.Set<string> = new Set();
    private direction : [string, number] = ['y', 1];
    private updateScreen : React.Dispatch<React.SetStateAction<SnakeConfig>>; 
    
    constructor(config : SnakeConfig, update : React.Dispatch<React.SetStateAction<SnakeConfig>>) {
        this.position = [...config.position];
        this.speed = config.speed;
        this.growSlot = config.growSlot;
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
        this.direction = [axis, direction];
    }

    move() {
        return setTimeout(() => {
            const head = this.getCoordinateObject(this.head);
            const [axis, step] = this.direction;
            head[axis as keyof typeof head] += step;
            this.growSlot = this.position.pop() || this.growSlot;
            this.position = [this.getCoordinateString(head), ...this.position];
            this.updateScreen({
                position : this.position,
                speed : this.speed,
                growSlot : this.growSlot,
            })
        }, 10)
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
        growSlot : '10,6'
    })


    return new Snake(snake, setSnake)
}