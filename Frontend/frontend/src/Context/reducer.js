export const initialState = {
    city: "Delhi",
    user: null
}

const reducer = (state,action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user : action.payload
            }
        case "SET_CITY":
            return {
                ...state,
                city: action.payload
            }
        default :
            return state;
    }
}

export default reducer;