/*
 * Will dynamically create reducers
 * enforcing a unique way to describe reducers
 */
export default function createReducer<S, A extends { type: string }>(
  initialState: S,
  handlers: Record<string, (state: S, action: A) => S>,
) {
  return function reducer(state: S = initialState, action: A): S {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
