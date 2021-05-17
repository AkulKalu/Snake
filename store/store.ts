import {configureStore} from '@reduxjs/toolkit';
import gridReducer from './snakeReducer'

export  const store = configureStore({
    reducer : {
        grid : gridReducer
    }
})

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;