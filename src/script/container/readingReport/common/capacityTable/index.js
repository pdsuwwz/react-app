import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class CapacityTable extends React.Component {
  static propTypes = {
    data: PropTypes.any,
  };

  static defaultProps = {
    data: [ 
      {
        "name": "词汇量",
        "grade": 1,
      },
      {
        "name": "语法",
        "grade": 2,
      },
      {
        "name": "文章逻辑关系",
        "grade": 3,
      },
      {
        "name": "综合处理信息能力",
        "grade": 3,
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
      <div className="capacity_table">
        <div className="capacity_table_content">
        {
          data.map((item, index)=> (
            <div className="capacity_item" key={index}>
              <span className="capacity_text">{item.name}</span>
              <div className="box_container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div id = "grade" className={`grade${item.grade}`}>{item.grade === 1 ? '低' : (item.grade === 2 ? '中' : '高')}</div>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}