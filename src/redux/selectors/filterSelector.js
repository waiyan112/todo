import { createSelector } from "reselect";
import { isEmpty, immutableToJS } from '../../assets/utils';

const selectorState = state => state.filter;

const filteredTaskaskSelector = () =>
  createSelector(
    selectorState,
    filter => immutableToJS(filter.get("task"))
  );
const isLoadingSelector = () =>
  createSelector(
    selectorState,
    filter => immutableToJS(filter.get("isLoading"))
  );
const errorSelector = () =>
  createSelector(
    selectorState,
    filter => immutableToJS(filter.get("error"))
  );

export { filteredTaskaskSelector, isLoadingSelector, errorSelector };
