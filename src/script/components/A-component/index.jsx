import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../header'

export default class AComponent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return <div style={{border: '1px solid #000', width: '90%', margin: '0 auto', paddingTop: '2rem'}}>
      <Header/>
      <h5>组件 A</h5>
      <Link to="/Btest">跳转到组件 B</Link>
    </div>
  }
} 