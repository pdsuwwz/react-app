import fetch from 'isomorphic-fetch';
import Config from '../../../common/config';
import { objectToQueryString } from '../../../common/utils';

// 获取toefl report 信息
exports.fetchToeflReport = function (params, callback = function(){}) {
  return fetch(`${Config.api.toefl}/mobile/common/exerciseReport?${objectToQueryString(params)}`,{
    method:'get'
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};

// 获取机器批改报告信息
exports.fetchMachinePigai = function (subject, params, callback = function(){}) {
  return fetch(`${Config.api.ti}/machine-pigai/${subject}/result?${objectToQueryString(params)}`,{
    method:'get'
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};

// 获取 toefl readingReport 信息
exports.fetchReadingReport = function (params, callback = function(){}) {
  return fetch(`${Config.api.ti}/report/read?${objectToQueryString(params)}`,{
    method:'get'
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};
