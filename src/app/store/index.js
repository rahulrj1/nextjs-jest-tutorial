import { configureStore, createSlice } from "@reduxjs/toolkit";


const mySlice = createSlice({
    name: 'mySlice',
    initialState: {mystate: "initial-state"},
    reducers: {
        setMyState(state, action) {
            state.mystate = action.payload
        }
    }
})

export const mySliceActions = mySlice.actions

const store = configureStore({
    reducer: {
        mySlice: mySlice.reducer
    }
})

export default store;