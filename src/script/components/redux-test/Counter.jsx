import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssObj from './style.scss'

export default class Counter extends Component {
  constructor(props) {
    super(props)
    console.log(this)
  }
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired
  }

  handleIncrement = () => {
    let count = this.select.value
    this.props.increment(count)
  }
  handleDecrement = () => {
    let count = this.select.value
    this.props.decrement(count)
  }

  handleIncrementOdd = () => {
    let count = this.select.value
    let currCount = this.props.count
    currCount % 2 == 1 ? this.props.incrementOdd(count) : null
  }

  handleIncrementAsync = () => {
    let count = this.select.value
    this.props.incrementAsync(count)
  }

  render() {
    const { count } = this.props
    return (
      <div>
        <p className={cssObj.title}>The num is {count}</p>
        <select className={cssObj.select} ref={e => this.select = e}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={() => this.handleIncrement()}>+</button>
        <button onClick={() => this.handleDecrement()}>-</button>
        <button onClick={() => this.handleIncrementOdd()}>Odd +</button>
        <button onClick={() => this.handleIncrementAsync()}>Async +</button>
      </div>
    )
  }
}
