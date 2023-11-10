const GET_USER_TRANSACTIONS = '/user/transactions'


const setUserTransactions = (transactions) => ({
    type: GET_USER_TRANSACTIONS,
    payload: transactions
})

export const getTransactions = () => async (dispatch) => {
    try {
        const response = await fetch('/api/transactions/');
        if(!response.ok) throw response
        const data = await response.json()
        dispatch(setUserTransactions(data))
    } catch (error) {
        console.error('Error fetching user transactions: ', error);
    }
}


const initialState = {hydrated: false, transactionObjs: []}

const transactionsReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_USER_TRANSACTIONS:
            return {
                ...state, hydrated: true, transactionObjs:[...action.payload]
            }




        default:
            return state
    }
}

export default transactionsReducer
