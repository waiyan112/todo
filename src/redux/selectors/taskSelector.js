import { createSelector } from "reselect";
import { isEmpty, immutableToJS } from '../../assets/utils';

const selectorState = state => state.task;


const taskSelector = () =>
  createSelector(
    selectorState,
    task => immutableToJS(task.get("task"))
  );
const isTaskLoadingSelector = () =>
  createSelector(
    selectorState,
    task => immutableToJS(task.get("isTaskLoading"))
  );
const taskErrorSelector = () =>
  createSelector(
    selectorState,
    task => immutableToJS(task.get("taskError"))
  );

export { taskSelector, isTaskLoadingSelector, taskErrorSelector };
