import EventBus from '@/services/EventBus'

export const emitError = options => {
  return async function fn(m, next) {
    if (m.res) {
      const code = m.res.data ? m.res.data.code : m.res.code;
      const msg = m.res.data ? m.res.data.msg : m.res.message;
      if (code * 1 !== 100000) {
        console.log(EventBus);
        EventBus.emit('error', msg)
        throw new Error(msg);
      }
      next();
    }
  };
};

