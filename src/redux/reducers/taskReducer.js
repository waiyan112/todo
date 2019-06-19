import { fromJS } from "immutable";
import {
  TASKDATA_UPDATE_FAILURE,
  TASKDATA_UPDATE_PROGRESS,
  TASKDATA_UPDATE_SUCCESS,
  TASKDATA_DELETE_FAILURE,
  TASKDATA_DELETE_PROGRESS,
  TASKDATA_DELETE_SUCCESS,
  TASKDATA_CREATE_FAILURE,
  TASKDATA_CREATE_PROGRESS,
  TASKDATA_CREATE_SUCCESS
} from "../actions/taskAction";
import list from "../../assets/DataList";

const intialState = {
  task: list,
  isTaskLoading: true,
  taskError: {}
};

export function task(state = fromJS(intialState), action) {
  let oldState = {};
  switch (action.type) {
    case TASKDATA_CREATE_SUCCESS:
      oldState = state.toJS();
      oldState.task = [...oldState.task, action.data];
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    case TASKDATA_CREATE_PROGRESS:
      oldState = state.toJS();
      oldState.isTaskLoading = true;
      return fromJS(oldState);
    case TASKDATA_CREATE_FAILURE:
      oldState = state.toJS();
      oldState.taskError = action.data;
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    case TASKDATA_DELETE_SUCCESS:
      oldState = state.toJS();
      let freshData = oldState.task.filter(item => item.id != action.data);
      oldState.task = freshData;
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    case TASKDATA_DELETE_PROGRESS:
      oldState = state.toJS();
      oldState.isTaskLoading = true;
      return fromJS(oldState);
    case TASKDATA_DELETE_FAILURE:
      oldState = state.toJS();
      oldState.taskError = action.data;
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    case TASKDATA_UPDATE_SUCCESS:
      oldState = state.toJS();
      let data = [...oldState.task];
      data.forEach(i => {
        if (i.id === action.data.id) {
          i.note = action.data.note;
          i.created = action.data.created;
        }
      });
      oldState.task = data;
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    case TASKDATA_UPDATE_PROGRESS:
      oldState = state.toJS();
      oldState.isTaskLoading = true;
      return fromJS(oldState);
    case TASKDATA_UPDATE_FAILURE:
      oldState = state.toJS();
      oldState.taskError = action.data;
      oldState.isTaskLoading = false;
      return fromJS(oldState);
    default:
      return state;
  }
}
