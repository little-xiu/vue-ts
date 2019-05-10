// import ajax from '';
const ajax = {};
import {
  stdStationListPayLoad,
} from './interfaces';

const stdStationListAsync = async (store: any, payload: stdStationListPayLoad) => {
  try {
    const resData = await ajax.fetchJson('/api/list.json', payload);
    store.commit('stdStationList', { ...resData });
  } catch (err) {
    console.log('[vuex action: stdStationList]: ', err);
  }
}

export default {
  stdStationListAsync,
};