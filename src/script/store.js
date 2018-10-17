import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducerCounter } from './reducers/redux-test/reducers' // 引入纯函数对象
import thunk from 'redux-thunk' // 引入异步中间件
import 'redux-devtools-extension' // 配置 redux-devtools-extension 可视化工具


// 合并 reducer
const reducers = combineReducers({
  reducerCounter
})

// 创建 store 对象
const store = process.env.NODE_ENV === 'production' ? (
  createStore(reducers, applyMiddleware(thunk))
) : (
    window.__REDUX_DEVTOOLS_EXTENSION__ ? (
      createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
    ) : (
        createStore(reducers, applyMiddleware(thunk))
      )
  )

export default store