import React, { Component } from 'react'
import './style.scss'
import { DATA } from './constants'

// VIP会员特权说明页面
export default class VipPrivilege extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pTitle: "VIP会员特权说明"
    }
  }
  componentWillMount = () => {
    document.title = this.state.pTitle
  }
  render() {
    let { vips } = DATA
    return (
      <div className="pri-list">
        {
          vips.map((item, index) => <PriItem {...item} key={index} index={index + 1}/>)
        }
      </div>
    )
  }
}

const PriItem = (props) => (
  <div className="item">
    <i className="pri-img"></i>
    <h5 className="pri-title">{props.index}. {props.title}</h5>
    <p className="pri-desc">{props.desc}</p>
  </div>
)
