// TODO Import flow
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'HELLO':
      return {
        ...state,
        hello: 'hello',
      };
    default:
      return state;
  }
};

export default reducer;
