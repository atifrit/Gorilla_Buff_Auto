const GET_USER_BOOKINGS = '/user/bookings'

const setUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    payload: bookings
})

export const getUserBookings = () => async (dispatch) => {
    try {
        const response = await fetch('/api/bookings/');
        if(!response.ok) throw response;
        const data = await response.json();
        console.log('data: ', data);
        dispatch(setUserBookings(data));
    } catch (error) {
        console.error('Error fetching user bookings: ', error);
    }
}

const initialState = {
        user_id: null,
        user_bookings: []
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_USER_BOOKINGS:
            return {
                ...state,
                    user_id: action.payload.user_id,
                    user_bookings: [...action.payload.booking_details]
            }
        default:
            return state;
    }
}

export default bookingsReducer
