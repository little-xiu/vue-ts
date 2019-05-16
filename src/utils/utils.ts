// 将2019-02-02格式转化为标准日期对象
function parserDate(date) {
  if (!date) {
    return new Date();
  }
  const dateList = date.split('-');
  return new Date(dateList[0], dateList[1] - 1, dateList[2]);
}

const utils = {
  parserDate,
};

export default utils;