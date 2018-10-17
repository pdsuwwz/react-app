import { connect } from 'react-redux'
import actions from '../../actions/redux-test/actions'

import Counter from '../../components/redux-test/Counter' // 注入相关组件

export default connect(
  state => (
    { count: state.reducerCounter.count }
  ),
  { ...actions }
)(Counter)