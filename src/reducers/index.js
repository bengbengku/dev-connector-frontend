import { combineReducers } from 'redux';
import { loginModalReducer } from './loginButtonReducer';
import { registerModalReducer } from './registerButtonReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loginModal: loginModalReducer,
  registerModal: registerModalReducer,
});

export default rootReducer;
