// 全局过滤器
import Vue from 'vue';
import {formatDate} from '../utils';
/*
 * 时间戳处理
 * */
Vue.filter('fmTimestamp', function (timestamp, fm) {
  return formatDate(timestamp, fm);
});
/*
 * 数量处理
 * */
Vue.filter('fmTenThousand', function (numer, currency) {
  if (isNaN(numer)) { return 0; }
  if (numer < 10000) { return numer; }
  if (!currency) { currency = '万'; }
  numer = Math.round((numer / 10000) * 100) / 100;
  numer = numer + currency;
  return numer;
});
/*
 * 截取字符串
 * @param {string} str 字符串
 * @param {int} len 需要截取的长度
 * @param {int} clen 中文所占字节，默认为2
 * @param {string} siff 结尾，默认为"..."
 * */
Vue.filter('strCutWithLen', function (str, len, clen, siff) {
  if (!clen) { clen = 2; }
  if (!siff) { siff = '...'; }
  let ilt = 0, idx = 0, srtn = '';
  if (str && str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        ilt += clen;
      } else {
        ilt += 1;
      }
      if (ilt >= len) {
        idx = i - 1;
        break;
      }
    }
    if (idx > 0) {
      srtn = str.substring(0, idx) + siff;
    } else {
      srtn = str;
    }
  }
  return srtn;
});
