import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCoordinates} from "../Components/Grid";
import { AppStore } from './store';
function createEatable(exclude : string[]) {
    let coordinates = getCoordinates(20, 20).filter((val) => {
        return !exclude.includes(val)
    });
    return coordinates[Math.floor(Math.random() * coordinates.length)];
}
const gridSlice = createSlice({
    name : 'grid',
    initialState: {
        eatables: createEatable(['10,10', '10,9', '10,8', '10,7'])
    },
    reducers : {
        addEatable : (state, action : PayloadAction<string[]>) => {
            state.eatables = createEatable(action.payload)
        }
    }
})

export default gridSlice.reducer
export const { addEatable } = gridSlice.actions
export const eatableSelector = (state : AppStore) =>  state.grid.eatables;















