import {
  SET_USER,
} from './constants';

const initialState = {
  user: null
};

function appReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_USER:
      return {
          ...state,
          user: payload
      }
    default:
      return state;
  }
}

export default appReducer;
