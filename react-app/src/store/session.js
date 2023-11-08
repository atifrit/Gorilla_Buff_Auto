import { bindActionCreators } from "redux";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const ADD_BALANCE = "/ADD_BALANCE";

const addBalance = (newBalance) => ({
	type: ADD_BALANCE,
	payload: newBalance,
  });

export const addBalanceToUser = (amount) => async (dispatch) => {
	try {
	  const response = await fetch("/api/users/add_balance", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ amount }),
	  });
	  if (!response.ok) throw response;
	  const data = await response.json();
	  dispatch(addBalance(data.new_balance));
	} catch (error) {
	  console.error("Error adding balance to portfolio:", error);
	}
  };
const REMOVE_BALANCE = "/REMOVE_BALANCE";

const removeBalance = (newBalance) => ({
	type: REMOVE_BALANCE,
	payload: newBalance,
  });

export const removeBalanceFromUser = (amount) => async (dispatch) => {
	try {
	  const response = await fetch("/api/users/remove_balance", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ amount }),
	  });
	  if (!response.ok) throw response;
	  const data = await response.json();
	  dispatch(removeBalance(data.new_balance));
	} catch (error) {
	  console.error("Error withdrawing funds:", error);
	}
  };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_BALANCE:
			return {
				user: {...state.session.user, balance: action.payload.new_balance}
			}
		case REMOVE_BALANCE:
			return {
				user: {...state.session.user, balance: action.payload.new_balance}
			}
		default:
			return state;
	}
}
