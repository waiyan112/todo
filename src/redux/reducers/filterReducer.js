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
      if (action.data.filter != "") {
        oldState.task = action.data.list;
        const searchText = action.data.filter.toLowerCase();
        let filteredData = oldState.task.filter(item => {
          let title = item.title.toLowerCase();
          return title.includes(searchText);
        });
        oldState.task = filteredData;
      } else {
        oldState.task = [];
      }
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
