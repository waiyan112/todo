import { fromJS } from "immutable";
import {
  FILTER_FAILURE,
  FILTER_PROGRESS,
  FILTER_SUCCESS
} from "../actions/filterAction";

const intialState = {
  filter: "",
  task: [],
  isLoading: true,
  error: {}
};

export function filter(state = fromJS(intialState), action) {
  let oldState = {};
  switch (action.type) {
    case FILTER_SUCCESS:
      oldState = state.toJS();
      oldState.newsData = [...oldState.newsData, ...action.data];
      oldState.isLoading = false;
      return fromJS(oldState);
    case FILTER_PROGRESS:
      oldState = state.toJS();
      oldState.isLoading = true;
      return fromJS(oldState);
    case FILTER_FAILURE:
      oldState = state.toJS();
      oldState.error = action.data;
      oldState.isLoading = false;
      return fromJS(oldState);
    default:
      return state;
  }
}
