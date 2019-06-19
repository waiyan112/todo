import { createSelector } from "reselect";
import { isEmpty, immutableToJS } from '../../assets/utils';

const selectorState = state => state.user;

const userSelector = () =>
  createSelector(
    selectorState,
    user => immutableToJS(user.get("user"))
  );
const isUserLoadingSelector = () =>
  createSelector(
    selectorState,
    user => immutableToJS(user.get("isUserLoading"))
  );
const userErrorSelector = () =>
  createSelector(
    selectorState,
    user => immutableToJS(user.get("userError"))
  );

export { userSelector, isUserLoadingSelector, userErrorSelector };
