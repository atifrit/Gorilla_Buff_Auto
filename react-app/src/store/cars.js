const GET_USER_CARS = '/user/cars'

const setUserCars = (cars) => ({
    type: GET_USER_CARS,
    payload: cars
})


export const getUserCars = () => async (dispatch) => {
    try {
        const response = await fetch('/api/cars/');
        if(!response.ok) throw response;
        const data = await response.json();
        console.log(data);
        dispatch(setUserCars(data));
    } catch (error) {
        console.error('Error fetching user cars: ', error);
    }
}




const initialState = {
        user_cars: [],
        hydrated: false
};

const carsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_USER_CARS:
            return {
                ...state,
                user_cars: action.payload,
                hydrated: true
            }
        default:
            return state;
    }
}

export default carsReducer
