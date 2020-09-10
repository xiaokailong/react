import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import rt from 'dayjs/plugin/relativeTime'; // 按需加载
dayjs.locale('zh-cn');
dayjs.extend(rt); // 使用插件

export const relativeTime = (time) => {
  if (time) {
    const d = dayjs(time);
    return d.fromNow();
  } else {
    return time;
  }
};

export default dayjs;
