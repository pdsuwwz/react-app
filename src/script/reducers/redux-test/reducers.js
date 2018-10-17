/**
 * @desc 包含 n 个 reducer 函数的模块
 * 注意，reducer 的返回值必须是新的 state，不可以修改原有的 state，否则即使 state 发生改变，页面也不会重渲染
 */

import { INCREMENT, DECREMENT, ODD, ASYNC } from '../../constants/redux-test/action-types'
const initalState = {
  count: 0
}

export function reducerCounter(state = initalState, action) {
  let count = Number(action.data);
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        count: state.count + count
      })
    case DECREMENT:
      return Object.assign({}, state, {
        count: state.count - count
      })
    case ODD:
      return Object.assign({}, state, {
        count: state.count + count
      })
    case ASYNC:
      return Object.assign({}, state, {
        count: state.count + count
      })
    default:
      return state;
  }
}