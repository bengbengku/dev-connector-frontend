export function postsReducer(state, action) {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'POSTS_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: '',
      };
    case 'POSTS_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function getUsersReducer(state, action) {
  switch (action.type) {
    case 'USERS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };
    case 'USERS_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
