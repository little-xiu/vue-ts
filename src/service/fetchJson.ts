import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import iView from 'iview';
import qs from 'qs';
import Config from './constants';

const baseURL = <string>Config.NEWAPI;

Vue.use(VueAxios, axios);

// axios默认配置
axios.defaults.method = 'post';
axios.defaults.timeout = 15000;
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
}; // headers是即将被发送的自定义请求头，值为XMLHttpRequest代表ajax请求，为null代表同步请求

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;// 表示跨域请求时是否需要使用凭证
axios.defaults.responseType = 'json'; // 表示服务器响应的数据类型，
axios.defaults.validateStatus = function validateStatus(status) {
  return status < 300; // 自定义http状态码错误范围，大于500才会reject
}

// 拦截器，返回状态判断
axios.interceptors.response.use((res) => {
  return res;
}, error => Promise.reject(error));

// 防止调用多个接口异常时，同时弹多个相同message
let showErr: string[] = [];
let time: number = 0;
const showMessage = (message: any) => {
  if (!showErr.includes(message)) {
    (<any>iView).Message.error(message);
    showErr.push(message);
  }
  if (!time) {// 每2s只触发一次
    time = setTimeout(() => {
      time = 0;
      showErr = [];
    }, 2000);
  }
};

const fetchJson = async (url:any, data?: any, options?: any, callback?:any) => {
  const newConfig = {
    ...options,
    url,
  };

  // 对url判断是否以.json结尾，如果是表示是模拟数据
  const isJson = /\.json$/.test(url);
  if (isJson) {
    newConfig.url = `${window.location.protocol}//${window.location.host + url}`;
    newConfig.method = 'get';
  }

  if (newConfig.method === 'get') {
    newConfig.params = data;
  } else {
    newConfig.data = data;
  }

  let response: any = {};
  try {
    if (options && options.loading === true) {
      window.store.commit('common/changeLoading', true);
    }
    response = await axios.request(newConfig);
  } catch (error) {
    window.store.commit('common/changeLoading', false);
    showMessage('服务异常');
    if (callback) {
      callback();
    }
    if (error.response) {
      if (error.response.status >= 300) {
        console.log('服务异常');
        return null;
      }
    } else {
      console.log('网络异常');
      return null;
    }
  }
  window.store.commit('common/changeLoading', false);
  if (callback) {
    callback();
  }

  const rs = response.data;
  if (!rs) {
    return null;
  }
  if (rs.responseCode === '10001') {
    return rs;
  }
  if (!rs.responseMsg) {
    rs.responseMsg = '系统未知错误';
  }
  showMessage(rs.responseMsg);
  switch (rs.responseCode) {
    case '10003':
      console.log('登陆超时', `${baseURL}`);
      window.sessionStorage.removeItem('loginData');
      window.store.commit('common/changeUserInfo', { login: false });
      break;
    case '10004':
      console.log('这里处理登陆错误');
      break;
    case '10005':
      console.log('用户未登陆');
      window.sessionStorage.removeItem('loginData');
      window.store.commit('common/changeUserInfo', { login: false });
      break;
    default:
  }
  return null;
};

export default {
  fetchJson,
};
