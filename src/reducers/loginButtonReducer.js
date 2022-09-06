export function loginModalReducer(state = false, action) {
  switch (action.type) {
    case 'LOGIN_SHOW':
      return action.payload;
    case 'LOGIN_HIDE':
      return false;
    default:
      return state;
  }
}
