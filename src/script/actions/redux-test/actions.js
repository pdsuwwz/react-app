/**
 * @desc 包含所有的 action creator
 */

import { INCREMENT, DECREMENT, ODD, ASYNC} from "../../constants/redux-test/action-types";

export const increment = (count) => ({
  type: INCREMENT,
  data: count
})
export const decrement = (count) => ({
  type: DECREMENT,
  data: count
})
export const incrementOdd = (count) => ({
  type: ODD,
  data: count
})
export const incrementAsync = (count) => {
  return dispatch => {
    setTimeout(() => {
      // dispatch({
      //   type: ASYNC,
      //   data: count
      // });
      // 或是
      dispatch(increment(count));
    }, 1000)
  }
}

export default {
  increment: increment,
  decrement: decrement,
  incrementOdd: incrementOdd,
  incrementAsync: incrementAsync
}