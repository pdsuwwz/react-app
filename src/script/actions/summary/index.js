import fetch from 'isomorphic-fetch';
import Config from '../../../common/config';
import { objectToQueryString } from '../../../common/utils';

// 获取 用户做题 信息
exports.fetchUserData = function (params, callback = function(){}) {
  return fetch(`${Config.api.promotion}/zt/user/yearly/summary/${params.site}?${objectToQueryString(params)}`,{
    method:'get'
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};


// 领取礼包
exports.getGift = function (params, callback = function(){}) {
  return fetch(`${Config.api.promotion}/zt/user/yearly/summary/${params.site}/courses?${objectToQueryString(params)}`,{
    method:'POST',
    mode: "no-cors",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};
//用户登录
exports.fetchSignin = function (params, callback = function(){}) {
  return fetch(`${Config.api.promotion}/zt/user/signin`,{
    method:'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `phone=${params.phone}&phoneCaptcha=${params.phoneCaptcha}`
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};
//发送短信验证码
exports.fetchCode = function (params, callback = function(){}) {
  return fetch(`${Config.api.promotion}/zt/phone/captcha`,{
    method:'post',
    // mode: "no-cors",
    credentials: 'include',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `phone=${params.phone}&imageCaptcha=${params.imageCaptcha}`
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};
