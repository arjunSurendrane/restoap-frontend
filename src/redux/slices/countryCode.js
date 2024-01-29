import axios from "axios"

const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    countryCode: '',
    error: ''
}


const countrySlice = createSlice({
    name: 'countryCode',
    initialState,
    reducers: {
        setCurrentCountryCode(state, action) {
            state.countryCode = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})


export default countrySlice.reducer

export const getCurrentCountryCode = () => async (dispatch) => {
    try {
        console.log('here----------------------')
        const response = await axios.get('https://ipapi.co/json/');
        const clientCountryCode = response.data.country;
        console.log(response.data)
        dispatch(countrySlice.actions.setCurrentCountryCode(clientCountryCode))
    } catch (error) {
        dispatch(countrySlice.actions.setError(error))
    }

}
