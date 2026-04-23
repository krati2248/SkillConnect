import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: "job",
    initialState: {
        category: []
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
})
export const { setCategory } = jobSlice.actions;
export default jobSlice.reducer;