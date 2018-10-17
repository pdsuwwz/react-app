import url from 'url';


//随机字符串
export function uniqueString (len) {
  len = len || 32;
  let seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let ret = '';
  for(let i = 0; i < len; i++) {
    let idx = parseInt(Math.random() * seed.length);
    idx = idx === seed.length ? seed.length - 1 : idx;
    ret += seed[idx];
  }

  return ret;
}

//深层拷贝
export function deepCopy (param) {
  let ret = null;
  let objString = Object.prototype.toString.call(param);
  if(objString === '[object Object]') {
    ret = {};
    for(let k in param) {
      ret[k] = deepCopy(param[k]);
    }
  } else if(objString === '[object Array]') {
    ret = param.map(function (item) {
      return deepCopy(item);
    });
  } else {
    ret = param;
  }

  return ret;
}

/*
 * 对象转为查询字符串
 * private
 * @param    obj   object    要转换的对象
 * @return   string
 */
export function objectToQueryString (obj) {
  let r20 = /%20/g;
  let stringArr = [];

  for (let key in obj) {
    var value = obj[key] === null ? '' : obj[key];
    stringArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  return stringArr.join( '&' ).replace( r20, '+' );
}

//根据键值取对象数组里的对象
export function arrayGetObject (array,key,value) {
  for (var i=0; i < array.length; i++){
    if(array[i][key] == value){
      return array[i]
    }
  }
}

export function request(url, opts) {
  return fetch(__SERVER__ ? config.api + url : url, opts)
    .then(res => res.json())
    .then((json) => {
      if (json.code) {
        throw new Error(json.msg || `Api return with failure code: ${json.code}`);
      } else {
        return json.data;
      }
    });
}

// 判断终端系统
export function isAndroid_IOS(){
  let u = navigator.userAgent, app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid === true? 'android' : isIOS === true ? 'ios': '';
}

// 去掉开头结尾空格
export function myTrim(x) {
  if(!x){ return; }
  return x.replace(/^\s+|\s+$/gm,'');
}
