import fetch from 'isomorphic-fetch';
import Config from '../../../common/config';
import { objectToQueryString } from '../../../common/utils';

exports.fetchUserData = function (params, callback = function(){}) {
  return fetch(``,{
    method:'get'
  }).then(res => res.json())
    .then(function (res){
      callback(res);
    });
};