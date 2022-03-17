export const initialState = {
  user: null,
}; 

export const actionTypes = {
  SET_USER: 'SET_USER',
}; 

const reducer = (state, action) => {
  console.log(action)
  
  switch(action.type) {
    case actionTypes.SET_USER:
    return {
      ...state,
      user: action.user,
    }
    default: 
    return state;
  }
};

export default reducer;


// Creating the reducer: is what will listen to any action which will be fired into the data layer
// This data layer will have the user, and can be accessed from anywhere in the appropriate
// This will remove the use for prop drilling