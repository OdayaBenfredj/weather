import produce from 'immer';

const initialState = {
    weathers: [],
    loginUser: undefined
};
export default produce((state, action) => {
    console.log('reduser weather.js hear', action, state)
    switch (action.type) {
        case 'INIT_HISTORY': {
            state.weathers = action.payload;
            break;

        }
        case 'ADD_TO_HISTORY':
            state.weathers.unshift(action.payload)
            break;
        case 'LOGIN_USER':
            {
                state.loginUser = action.payload;
                console.log('loginUserAction', action.payload);

            }
            break;

    }
}, initialState);


