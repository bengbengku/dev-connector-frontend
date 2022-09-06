export function registerModalReducer(state = false, action) {
  switch (action.type) {
    case 'REGISTER_SHOW':
      return action.payload;
    case 'REGISTER_HIDE':
      return false;
    default:
      return state;
  }
}
