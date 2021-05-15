import {screen, render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Grid,{renderGrid} from '../Components/Grid';
import Cell from '../Components/Cell';


afterEach(cleanup);


test('Renders a grid of n cells', () => {
    render(<Grid snake={[]} />);
    
    expect(screen.getByTestId('grid').children.length).toBe(400);
    expect(screen.getByTestId('grid').children[0].className).toBe('Cell')
})