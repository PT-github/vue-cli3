/* 工具类 */
export const km2 = (m) => {
  if (isNaN(m)) { m = 0; }
  return (m / 1000).fixed(2);
};
/**
 * 随机数，10位时间戳 连接4位随机整数 e.g. 1428910956 + "" +3482
 * @example $.zUtils.random14(newTime);
 * */
export const random14 = () => {
  return Math.round(new Date().getTime() / 1000) + '' + Math.floor(Math.random() * 9000 + 1000);
};
/* 获取REM的值 */
const getRem = () => {
  let iRem = 12, iWidth = window.innerWidth;
  if (iWidth > 1920 && iWidth <= 2200) {
    iRem = 13;
  } else if (iWidth > 2200 && iWidth <= 2500) {
    iRem = 14;
  } else if (iWidth > 2500 && iWidth <= 2700) {
    iRem = 15;
  } else if (iWidth > 2700 && iWidth <= 2900) {
    iRem = 16;
  } else if (iWidth > 2900 && iWidth <= 3100) {
    iRem = 17;
  } else if (iWidth > 3100 && iWidth <= 3300) {
    iRem = 18;
  } else if (iWidth > 3300 && iWidth <= 3500) {
    iRem = 19;
  } else if (iWidth > 3500 && iWidth <= 3700) {
    iRem = 20;
  } else if (iWidth > 3700 && iWidth <= 3900) {
    iRem = 21;
  } else if (iWidth > 3900 && iWidth <= 4100) {
    iRem = 22;
  } else if (iWidth > 4100 && iWidth <= 4300) {
    iRem = 23;
  } else if (iWidth > 4300) {
    iRem = 24;
  }
  return iRem;
};
export const intRem = getRem();

/**
 * @summary 根据时间及格式获取时间的字符串
 * @param {int} iDate 时间
 * @param {string} sFormat 格式，默认：yyyy-MM-dd HH:mm:ss
 * @return {string} 格式化后的日期字符串
 * @example
 *    formatDate(new Date(),'yyyy-MM-dd HH:mm:ss SSS');// 2017-6-6 11:11:11
 */
export const formatDate = (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') => {
  if (!iDate) { return ''; }
  let dDate = new Date(iDate);
  let year = dDate.getFullYear();// 年
  let month = dDate.getMonth() + 1;// 月
  if (month < 10) { month = '0' + month; }
  let date = dDate.getDate();// 日
  if (date < 10) { date = '0' + date; }
  let hour = dDate.getHours();// 时
  if (hour < 10) { hour = '0' + hour; }
  let minute = dDate.getMinutes();// 分
  if (minute < 10) { minute = '0' + minute; }
  let second = dDate.getSeconds();// 秒
  if (second < 10) { second = '0' + second; }
  let millisecond = dDate.getMilliseconds();// 毫秒
  if (sFormat.indexOf('yyyy') >= 0) { sFormat = sFormat.replace('yyyy', year + ''); }
  if (sFormat.indexOf('MM') >= 0) { sFormat = sFormat.replace('MM', month + ''); }
  if (sFormat.indexOf('dd') >= 0) { sFormat = sFormat.replace('dd', date + ''); }
  if (sFormat.indexOf('HH') >= 0) { sFormat = sFormat.replace('HH', hour + ''); }
  if (sFormat.indexOf('mm') >= 0) { sFormat = sFormat.replace('mm', minute + ''); }
  if (sFormat.indexOf('ss') >= 0) { sFormat = sFormat.replace('ss', second + ''); }
  if (sFormat.indexOf('SSS') >= 0) { sFormat = sFormat.replace('SSS', millisecond + ''); }
  return sFormat;
};
/**
 * 转化时间
 * @param {String} str
 * @returns {String} 转化后的时间
 */
export const transDate = (str) => {
  if (!str) return '';
  let date = new Date(str)
  // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  let time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return '';
  } else if ((time / 1000 < 30)) {
    return '刚刚';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};
/**
 * @summary 设置cookie
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {int} expires 保存时间(单位:小时)
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 */
export const setCookie = (name, value, expires, path, domain, secure) => {
  let str = name + '=' + encodeURIComponent(value);
  if (expires > 0) {
    let date = new Date();
    date.setTime(date.getTime() + expires * 3600 * 1000);
    str += ';expires=' + date.toGMTString();
  }
  if (path) { str += ';path=' + path; }
  if (domain) { str += ';domain=' + domain; }
  if (secure) { str += ';secure=' + secure; }
  document.cookie = str;
};
/**
 * @summary 读取cookie
 * @param {string} name cookie名称
 * @retrun {string} value cookie值
 * @example
 */
export const getCookie = (name) => {
  let start = document.cookie.indexOf(name + '=');
  if ((!start) && (name !== document.cookie.substring(0, name.length))) { return ''; }
  if (start === -1) { return ''; }
  let len = start + name.length + 1;
  let end = document.cookie.indexOf(';', len);
  if (end === -1) { end = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(len, end));
};
/**
 * 存储localStorage
 * @param {string} sName
 * @param {string} sCntent
 * @example setLocalStore('name', '测试');
 */
export const setLocalStore = (sName, sCntent) => {
  if (!sName) return;
  window.localStorage.setItem(sName, sCntent);
};

/**
 * 获取localStorage
 */
export const getLocalStore = name => {
  if (!name) return null;
  return window.localStorage.getItem(name);
};

/**
* 根据当前时间获取农历时间
*/
const lunar = {
  tg: '甲乙丙丁戊己庚辛壬癸',
  dz: '子丑寅卯辰巳午未申酉戌亥',
  number: '一二三四五六七八九十',
  year: '鼠牛虎兔龙蛇马羊猴鸡狗猪',
  month: '正二三四五六七八九十冬腊',
  monthadd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  calendar: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
}
export const getLunarDate = (date) => {
  let year, month, day;
  if (!date) {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
  } else {
    date = date.split('-');
    year = parseInt(date[0]);
    month = date[1] - 1;
    day = parseInt(date[2]);
  }
  if (year < 1921 || year > 2020) {
    return {}
  }
  let total, m, n, k, bit, lunarYear, lunarMonth, lunarDay;
  let isEnd = false;
  let tmp = year;
  if (tmp < 1900) {
    tmp += 1900;
  }
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + lunar.monthadd[month] + day - 38;
  if (year % 4 === 0 && month > 1) {
    total++;
  }
  for (m = 0; ; m++) {
    k = (lunar.calendar[m] < 0xfff) ? 11 : 12;
    for (n = k; n >= 0; n--) {
      bit = (lunar.calendar[m] >> n) & 1;
      if (total <= 29 + bit) {
        isEnd = true;
        break;
      }
      total = total - 29 - bit;
    }
    if (isEnd) break;
  }
  lunarYear = 1921 + m;
  lunarMonth = k - n + 1;
  lunarDay = total;
  if (k === 12) {
    if (lunarMonth === Math.floor(lunar.calendar[m] / 0x10000) + 1) {
      lunarMonth = 1 - lunarMonth;
    }
    if (lunarMonth > Math.floor(lunar.calendar[m] / 0x10000) + 1) {
      lunarMonth--;
    }
  }
  return {
    lunarYear: lunarYear,
    lunarMonth: lunarMonth,
    lunarDay: lunarDay
  };
}
export const getLunarDateString = (lunarDate) => {
  if (!lunarDate.lunarDay) return;
  let data = {},
    lunarYear = lunarDate.lunarYear,
    lunarMonth = lunarDate.lunarMonth,
    lunarDay = lunarDate.lunarDay;
  data.tg = lunar.tg.charAt((lunarYear - 4) % 10);
  data.dz = lunar.dz.charAt((lunarYear - 4) % 12);
  data.year = lunar.year.charAt((lunarYear - 4) % 12);
  data.month = lunarMonth < 1 ? '(闰)' + lunar.month.charAt(-lunarMonth - 1) : lunar.month.charAt(lunarMonth - 1);
  data.day = (lunarDay < 11) ? '初' : ((lunarDay < 20) ? '十' : ((lunarDay < 30) ? '廿' : '三十'));
  if (lunarDay % 10 !== 0 || lunarDay === 10) {
    data.day += lunar.number.charAt((lunarDay - 1) % 10);
  }
  return data;
}
