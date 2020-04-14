import _ from 'lodash';
import { READ_EVENTS } from '../actions';

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // 配列型からオブジェクト型にローダッシュを用いて変換する
      return _.mapKeys(action.response.data, 'id');
    default:
      return events;
  }
};
