import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class AccuracyTable extends React.Component {
  static propTypes = {
    data: PropTypes.any,
  };

  static defaultProps = {
    data: [ 
      {
        "name": "表格题",
        "percent": 0.8,
      },
      {
        "name": "要点总结题",
        "percent": 0.6,
      },
      {
        "name": "句子简化题",
        "percent": 0.2,
      },
      {
        "name": "指代题",
        "percent": 0.6,
      },
      {
        "name": "否定事实信息题",
        "percent": 0.2,
      },
      {
        "name": "修饰目的题",
        "percent": 0.5,
      },
      {
        "name": "推理题",
        "percent": 0.7,
      },
      {
        "name": "事实信息题 ",
        "percent": 0.35,
      },
      {
        "name": "要点总结题 ",
        "percent": 0.4,
      },
      {
        "name": "文本插入题 ",
        "percent": 0.4,
      },
    ]
  };
    
constructor(props) {
    super(props);
    this.state = {
    };
}  
  render () {
    const { data } = this.props;
    return (
      <div className="table_container">
        <div className="header_container">
          <div className="header_top">
            <div className="header_title">低</div>
            <div className="header_title">中</div>
            <div className="header_title">高</div>
          </div>
        </div>
        <div className="body">
            {
              data.map( (item, index) => 
                (
                  <div className="item" key={index}>
                    <div className="item_text">{item.name}</div>
                    <div className="box_container">
                      <div className="box"></div>
                      <div className="box"></div>
                      <div className="box"></div>
                      <div className="percent">
                        <div className="percent_blue" style={{width: `${230 * item.percent}px`}}></div>
                      </div>
                    </div>
                  </div>
                )
              )
            }
        </div>
      </div>
    )
  }
}