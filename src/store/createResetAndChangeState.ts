export default (defaultStatu: any): any => ({
  resetState(state: any): void {
    // 重置state
    for (const i in state) {
      if ({}.hasOwnProperty.call(defaultStatu, i)) {
        state[i] = defaultStatu[i]; // 递归赋值
      } else {
        delete state[i];
      }
    }
  },
  changeState(state:any, payload: any): void {
    // 修改state
    for (const i in payload) {
      if ({}.hasOwnProperty.call(payload, i)) {
        state[i] = payload[i];
      }
    }
  },
});