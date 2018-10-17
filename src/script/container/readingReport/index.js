import React from 'react';
import { fetchReadingReport } from '../../actions/report/index';
import AccuracyTable from './common/accuracyTable';
import CapacityTable from './common/capacityTable';
import { get, groupBy, filter } from 'lodash';
import { myTrim } from './../../../common/utils';
import './style.scss';

const arrowLeft = require('./assets/arrow_left1.png');
const iconShare = require('./assets/icon_share1.png');
const evaluateLow = require('./assets/evaluate_low@2x.png');
const evaluateMiddle = require('./assets/evaluate_middle@2x.png');
const evaluateHight = require('./assets/evaluate_hight@2x.png');

import { comment, analyze } from './common/comment';



const shareLog = false;
function bodyScroll(event){
  event.preventDefault();
}

export default class ReadingReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: 0,
      totalStage: 'stage1',
      accuracy: [],
      date: '2018.07.07',
      capacity: [],
      duration: 0,
      analyzeStage: 'stage1',
    };
  }
  componentWillMount () {
    var token,date,version,appType,exerciseId;
    var lo = this.props.location.search.split('&');
    lo.map((item,index) => {
      if(item.indexOf('token') > -1) {
        var items = item.split('=');
        token = items[1];
      } if(item.indexOf('exerciseId') > -1) {
        var items = item.split('=');
        exerciseId = items[1];
      }
    });

    //获取科目列表
    fetchReadingReport({
      token: token,
      exerciseId,
    } , (res) => {
      if (res.code == 0) {
        // 对返回的数据进行处理
        let totalScore = 0;
        let totalStage;
        let analyzeStage;
        let accuracy = [];
        let capacity = [];
        // 获取时间
        let regex = /(\d{4})-(\d{2})-(\d{2})/; 
        const date = get(res, 'data.createdAt').match(regex)[0].replace(regex, "$1.$2.$3");
        const questionsArr = get(res, 'data.practice.questions');
        const accuracyArr = groupBy(questionsArr, 'correct');
        const tagArr = groupBy(questionsArr, 'tagName');
        delete tagArr.undefined;
        const duration = get(res, 'data.duration');
        totalScore = Math.round(30 * ((accuracyArr.true !== undefined ? accuracyArr.true.length : 0) / questionsArr.length));
        // 分数等级
        if (totalScore >= 0 && totalScore <= 14) {
          totalStage = 'stage1';
        } else if (totalScore >= 15 && totalScore <= 21) {
          totalStage = 'stage2';
        } else {
          totalStage = 'stage3';
        }

        // 题型正确率
        for (let key of Object.keys(tagArr)){
          const correctNum = groupBy(tagArr[key], 'correct').true === undefined ? 0 : groupBy(tagArr[key], 'correct').true.length;
          const obj = {
            name: key,
            percent: correctNum / tagArr[key].length,
          };
          accuracy.push(obj);
        }

        // 能力分布
        const arr1 = filter(questionsArr, item => {
          return myTrim(item.tagName) === '词汇题' || myTrim(item.tagName) === '要点总结题' || myTrim(item.tagName) === '否定事实信息题' ;
        })
        const arr2 = filter(questionsArr, item => {
          return myTrim(item.tagName) === '表格题' || myTrim(item.tagName) === '要点总结题' || myTrim(item.tagName) === '否定事实信息题' ;
        })
        const arr3 = filter(questionsArr, item => {
          return myTrim(item.tagName) === '句子简化题' || myTrim(item.tagName) === '文本插入题'
           || myTrim(item.tagName) === '总结表格题' || myTrim(item.tagName) === '推断题' || myTrim(item.tagName) === '修辞目的题' ;
        })
        const arr4 = filter(questionsArr, item => {
          return myTrim(item.tagName) === '句子简化题' || myTrim(item.tagName) === '文本插入题' || myTrim(item.tagName) === '修辞目的题' ;
        })
        capacity.push(
          {
            name: '词汇量',
            grade: this.setGrade(arr1),
          },
          {
            name: '语法',
            grade: this.setGrade(arr2),
          },
          {
            name: '文章逻辑关系',
            grade: this.setGrade(arr3),
          },
          {
            name: '综合处理信息能力',
            grade: this.setGrade(arr4),
          },

        )

        // 阅读速度分析
        if (duration / 60 <= 15) {
          if (totalStage === 'stage3') {
            analyzeStage = 'stage1';
          } else if (totalStage === 'stage2') {
            analyzeStage = 'stage4';        
          } else if (totalStage === 'stage1') {
            analyzeStage = 'stage7';
          }
        } else if (duration / 60 >= 15 && duration / 60 <= 20){
          if (totalStage === 'stage3') {
            analyzeStage = 'stage2';
          } else if (totalStage === 'stage2') {
            analyzeStage = 'stage5';        
          } else if (totalStage === 'stage1') {
            analyzeStage = 'stage8';
          }
        } else if (duration / 60 >= 20){
          if (totalStage === 'stage3') {
            analyzeStage = 'stage3';
          } else if (totalStage === 'stage2') {
            analyzeStage = 'stage6';        
          } else if (totalStage === 'stage1') {
            analyzeStage = 'stage9';
          }
        }
         
        this.setState(
          { 
            totalScore,
            accuracy,
            totalStage,
            date,
            capacity,
            analyzeStage,
          }
        )
      } else {
      }
    })
  }
  componentDidMount () {


  }
  componentDidUpdate () {
  }

  setGrade(arr) {
    let accuracy = 0;
    if(arr.length !== 0) {
      accuracy = filter(arr, item => {
        return item.correct === 'true';
      }).length / arr.length;
    }
    let grade;
    if ( accuracy >= 0 && accuracy <50) {
      grade = 1;
    } else if (accuracy >= 50 && accuracy <70) {
      grade = 2;
    } else {
      grade = 3;
    }
    return grade;
  }
  render() {
    const { data, totalScore, degree, accuracy, totalStage, date, capacity, analyzeStage} = this.state;
    if (this.state.title) {
      document.title = '智课斩托福每日练习报告分享';
    }else {
      document.title = '阅读能力报告页';
    }

    return (
      <div className="report_container">
        <div className="report-top">
          <div className="top-content">
            <div className="top_text1">{totalScore}</div>
            <div className="top_text2">阅读预测得分</div>
            <div className="top_text2">评估时间：{date}</div>
          </div>
        </div>
        <div className="evaluate">
          <div className="evaluate_title">综合评价</div>
          <div className="evaluate_content">{comment[totalStage]}</div>
          <div className="evaluate_img">
            {
              totalStage  && 
              totalStage == "stage1" ? "低等（0-14)" : (totalStage == "stage2" ? "中等（15-21)" : "高等（22-30)")
            }
          </div>
          <div className="triangle"></div>
          <img src={
            totalStage  && 
            totalStage == "stage1" ? evaluateLow : (totalStage == "stage2" ? evaluateMiddle : evaluateHight)
          } 
          style={{width: "320px", marginLeft: "10px",}} />
        </div>
        <div className="accuracy">
          <div className="accuracy_title">题型正确率</div>
          <div className="accuracy_content">TOEFL阅读考试共包含10种题型，
          每种题型考察的都是某种阅读能力的综合应用，各种题型通过不同维度，
          更为客观地反映出学生各项基础能力的优劣。</div>
          <AccuracyTable 
            data={accuracy}
          />
        </div>
        <div className="capacity">
          <div className="capacity_title">能力分布</div>
          <div className="capacity_content">TOEFL阅读覆盖了4大能力，词汇量、语法能力、
          逻辑能力以及综合处理信息能力共同构成了TOEFL阅读的主要考核能力。每套试卷中各项能力比重会略有变化，
          但主体部分的总比例一般都会在8成以上。以下为你各能力的水平等级</div>
          <CapacityTable 
            data={capacity}
          />
        </div>
        <div className="speed">
          <div className="speed_title">阅读速度分析</div>
          <div className="speed_content">{analyze[analyzeStage]}</div>
        </div>
      </div>
    )
  }
}
