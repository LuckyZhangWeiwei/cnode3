import queryString from 'query-string';
import localStore from 'store';


export const formatDate = (hisTime, nowTime = new Date()) => {
  let result = null;
  const diffValue = +new Date(nowTime) - +new Date(hisTime);
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // const halfamonth = day * 15
  const month = day * 30;
  const year = month * 12;

  const [_year, _month, _week, _day, _hour, _min] = [
    diffValue / year,
    diffValue / month,
    diffValue / (7 * day),
    diffValue / day,
    diffValue / hour,
    diffValue / minute,
  ];
  if (_year >= 1) result = `${parseInt(_year, 10)}年前`;
  else if (_month >= 1) result = `${parseInt(_month, 10)}个月前`;
  else if (_week >= 1) result = `${parseInt(_week, 10)}周前`;
  else if (_day >= 1) result = `${parseInt(_day, 10)}天前`;
  else if (_hour >= 1) result = `${parseInt(_hour, 10)}个小时前`;
  else if (_min >= 1) result = `${parseInt(_min, 10)}分钟前`;
  else result = '刚刚';
  return result;
};

export const qs = (search) => {
  return queryString.parse(search);
};

export const setStore = (key, value) => {
  localStore.set(key, value);
};

export const getStore = (key) => {
  return localStore.get(key);
};

export const removeStore = (key) => {
  return localStore.remove(key);
};

export const isLogin = () => {
  return getStore('loginUserInfo');
};

export const formatDateSimple = (time) => {
  const date = new Date(time);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  return `${year} / ${month} / ${day}`;
};
