const GET_USER_BOOKINGS = '/user/bookings'
const GET_ALL_DATES = '/alldates'

const setUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    payload: bookings
})

const setAllDates = (dates) => ({
    type: GET_ALL_DATES,
    payload: dates
})

export const getUserBookings = () => async (dispatch) => {
    try {
        const response = await fetch('/api/bookings/');
        if(!response.ok) throw response;
        const data = await response.json();
        dispatch(setUserBookings(data));
    } catch (error) {
        console.error('Error fetching user bookings: ', error);
    }
}

export const getAllDates = () => async (dispatch) => {
    try {
        const response = await fetch('/api/bookings/dates');
        if(!response.ok) throw response;
        const data = await response.json();
        dispatch(setAllDates(data));
    } catch (error) {
        console.error('Error fetching dates: ', error);
    }
}




const initialState = {
        user_id: null,
        user_bookings: [],
        occupiedDates: []
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_USER_BOOKINGS:
            return {
                ...state,
                    user_id: action.payload.user_id,
                    user_bookings: [...action.payload.booking_details]
            }
        case GET_ALL_DATES:
            return {
                ...state,
                occupiedDates: [...action.payload]
            }
        default:
            return state;
    }
}

export default bookingsReducer
