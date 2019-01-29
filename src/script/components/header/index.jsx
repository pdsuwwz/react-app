import React, {Component} from 'react'
import './style.scss'

export default class Header extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return <div styleName="top" className="clearfix">公共 Header 组件</div>
  }
}